import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { fireEvent, screen } from '@testing-library/react';
import * as Sentry from '@sentry/react';
import type { ErrorEvent } from '@sentry/react';
import { vi } from 'vitest';
import ErrorBoundary from '@/components/error-boundary';
import { rootErrorHandlers } from '@/lib/root-error-handlers';

const showReportDialog = vi.fn();

// The real SDK, so Dedupe and the boundary behave exactly as they do in the
// browser. Only the feedback dialog is stubbed: it injects a script from Sentry.
vi.mock('@sentry/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@sentry/react')>()),
  showReportDialog: (...args: unknown[]) => showReportDialog(...args),
}));

/** Everything that would have gone over the wire. beforeSend runs after Dedupe. */
const sent: ErrorEvent[] = [];

const Bomb = ({ message }: { message: string }): never => {
  throw new Error(message);
};

let root: Root;
let container: HTMLDivElement;

/**
 * Crashes a component the way the site would: same root handlers as main.tsx,
 * same boundary as App.tsx. Each test needs its own message, or Dedupe would
 * (correctly) drop the repeat.
 */
const crash = async (message: string) => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container, rootErrorHandlers);
  await act(async () => {
    root.render(
      <ErrorBoundary>
        <Bomb message={message} />
      </ErrorBoundary>,
    );
  });
  await Sentry.flush(1000);
};

describe('crash reporting', () => {
  // React logs every error a boundary catches. We know; we threw it.
  const consoleError = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  beforeAll(() => {
    Sentry.init({
      dsn: 'https://public@o1.ingest.us.sentry.io/1',
      transport: () => ({
        send: () => Promise.resolve({}),
        flush: () => Promise.resolve(true),
      }),
      beforeSend: (event) => {
        sent.push(event);
        return null;
      },
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    sent.length = 0;
    showReportDialog.mockClear();
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  it('reports a crash exactly once', async () => {
    await crash('kaboom: once');

    expect(sent).toHaveLength(1);
  });

  // Sentry's default alert rule fires on high-priority issues, and a "handled"
  // error doesn't make the cut. A crash the visitor saw has to be unhandled.
  it('reports it as unhandled, from the boundary', async () => {
    await crash('kaboom: unhandled');

    const mechanisms = sent[0].exception?.values?.map((v) => v.mechanism);
    expect(mechanisms).toContainEqual(
      expect.objectContaining({
        handled: false,
        type: 'auto.function.react.error_boundary',
      }),
    );
  });

  // The bug: with onCaughtError also reporting, Dedupe kept that copy and the
  // dialog was handed the ID of the one it dropped.
  it('files visitor feedback against the event that was sent', async () => {
    await crash('kaboom: feedback');

    fireEvent.click(
      screen.getByRole('button', { name: /errorBoundary.submit/i }),
    );

    expect(sent).toHaveLength(1);
    expect(showReportDialog).toHaveBeenCalledWith({
      eventId: sent[0].event_id,
    });
  });
});
