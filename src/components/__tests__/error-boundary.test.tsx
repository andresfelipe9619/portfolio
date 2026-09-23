import { render, screen, fireEvent } from '@/test/utils';
import { vi } from 'vitest';
import ErrorBoundary from '../error-boundary';

const showReportDialogMock = vi.fn();

vi.mock('@sentry/react', async () => {
  const React = await import('react');

  /**
   * A miniature stand-in for Sentry.ErrorBoundary: catches whatever the child
   * throws and hands it to the fallback with the same shape Sentry uses
   * (error typed as unknown, because JS lets you throw literally anything).
   */
  class MockErrorBoundary extends React.Component<
    {
      children: React.ReactNode;
      fallback: (props: {
        error: unknown;
        componentStack: string;
        eventId: string;
        resetError: () => void;
      }) => React.ReactNode;
    },
    { error: unknown }
  > {
    constructor(props: never) {
      super(props);
      this.state = { error: null };
    }

    static getDerivedStateFromError(error: unknown) {
      return { error };
    }

    render() {
      if (this.state.error != null) {
        return this.props.fallback({
          error: this.state.error,
          componentStack: 'at Boom',
          eventId: 'evt_123',
          resetError: () => this.setState({ error: null }),
        });
      }
      return this.props.children;
    }
  }

  return {
    ErrorBoundary: MockErrorBoundary,
    showReportDialog: (...args: unknown[]) => showReportDialogMock(...args),
  };
});

/** Throws on first render, behaves on every render after a reset. */
const Boom = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('kaboom');
  return <div>recovered content</div>;
};

describe('ErrorBoundary', () => {
  const consoleError = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  it('renders children when nothing explodes', () => {
    render(
      <ErrorBoundary>
        <Boom shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('recovered content')).toBeInTheDocument();
  });

  it('renders the fallback when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText('errorBoundary.title')).toBeInTheDocument();
    expect(screen.getByText('errorBoundary.description')).toBeInTheDocument();
  });

  it('offers a reboot action and a report action', () => {
    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole('button', { name: /errorBoundary.reboot/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /errorBoundary.submit/i }),
    ).toBeInTheDocument();
  });

  it('opens the Sentry report dialog with the event id', () => {
    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /errorBoundary.submit/i }),
    );

    expect(showReportDialogMock).toHaveBeenCalledWith({ eventId: 'evt_123' });
  });

  it('recovers when the user hits reboot', () => {
    // The test drives whether the child is still broken, so "reboot" can be
    // exercised the way a real recovery works: fix the cause, then retry.
    let stillBroken = true;
    const Flaky = () => {
      if (stillBroken) throw new Error('kaboom');
      return <div>recovered content</div>;
    };

    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    );

    expect(screen.getByText('errorBoundary.title')).toBeInTheDocument();

    stillBroken = false;
    fireEvent.click(
      screen.getByRole('button', { name: /errorBoundary.reboot/i }),
    );

    expect(screen.getByText('recovered content')).toBeInTheDocument();
  });

  it('survives a non-Error being thrown', () => {
    const ThrowsAString = (): never => {
      // JavaScript lets you throw anything, and people do. The boundary has to
      // cope with a bare string just as gracefully as with a real Error.
      // eslint-disable-next-line no-throw-literal
      throw 'just a string, rude but legal';
    };

    render(
      <ErrorBoundary>
        <ThrowsAString />
      </ErrorBoundary>,
    );

    expect(screen.getByText('errorBoundary.title')).toBeInTheDocument();
  });
});
