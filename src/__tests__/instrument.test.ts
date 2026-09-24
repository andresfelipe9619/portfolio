import { vi, beforeEach } from 'vitest';

const init = vi.fn();
const addIntegration = vi.fn();
const replayIntegration = vi.fn((options: unknown) => ({
  name: 'Replay',
  options,
}));

vi.mock('@sentry/react', () => ({
  init: (...args: unknown[]) => init(...args),
  addIntegration: (...args: unknown[]) => addIntegration(...args),
  replayIntegration: (options: unknown) => replayIntegration(options),
  reactRouterV7BrowserTracingIntegration: () => ({ name: 'BrowserTracing' }),
}));

/** instrument.ts calls Sentry.init on import, so each test loads it fresh. */
const loadInstrument = async () => {
  vi.resetModules();
  return import('../instrument');
};

type InitOptions = {
  sendDefaultPii: boolean;
  integrations: Array<{ name: string }>;
};

describe('instrument', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initialises Sentry without collecting default PII', async () => {
    await loadInstrument();

    expect(init).toHaveBeenCalledTimes(1);
    const options = init.mock.calls[0][0] as InitOptions;
    expect(options.sendDefaultPii).toBe(false);
  });

  // The review finding: Replay used to be in this list, so it recorded
  // visitors who had pressed "No thanks".
  it('does not start Session Replay before consent', async () => {
    await loadInstrument();

    const options = init.mock.calls[0][0] as InitOptions;
    expect(options.integrations.map((i) => i.name)).not.toContain('Replay');
    expect(replayIntegration).not.toHaveBeenCalled();
    expect(addIntegration).not.toHaveBeenCalled();
  });

  it('adds Session Replay, fully masked, once consent arrives', async () => {
    const { enableSessionReplay } = await loadInstrument();

    enableSessionReplay();

    expect(addIntegration).toHaveBeenCalledTimes(1);
    expect(replayIntegration).toHaveBeenCalledWith({
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
    });
  });

  it('adds Session Replay only once, however often consent fires', async () => {
    const { enableSessionReplay } = await loadInstrument();

    enableSessionReplay();
    enableSessionReplay();
    enableSessionReplay();

    expect(addIntegration).toHaveBeenCalledTimes(1);
  });
});
