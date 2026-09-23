import { vi, beforeEach, afterEach } from 'vitest';

const initializeMock = vi.fn();
const sendMock = vi.fn();
const eventMock = vi.fn();

vi.mock('react-ga4', () => ({
  default: {
    initialize: (...args: unknown[]) => initializeMock(...args),
    send: (...args: unknown[]) => sendMock(...args),
    event: (...args: unknown[]) => eventMock(...args),
  },
}));

/**
 * ga.ts reads the tracking ID once at module load, so each test stubs the env
 * and then re-imports the module with a fresh registry.
 */
const loadGa = async (trackingId?: string) => {
  vi.resetModules();
  vi.stubEnv('VITE_GA_TRACKING_ID', trackingId ?? '');
  return import('../ga');
};

describe('ga', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('when VITE_GA_TRACKING_ID is set', () => {
    it('initialises with the configured id', async () => {
      const { initGA } = await loadGa('G-TEST123');
      initGA();
      expect(initializeMock).toHaveBeenCalledWith('G-TEST123');
    });

    it('sends a pageview for the current path', async () => {
      const { logPageView } = await loadGa('G-TEST123');
      window.history.pushState({}, '', '/projects');
      logPageView();
      expect(sendMock).toHaveBeenCalledWith({
        hitType: 'pageview',
        page: '/projects',
      });
    });

    it('forwards events with all four fields', async () => {
      const { logEvent } = await loadGa('G-TEST123');
      logEvent('Contact Form', 'Submit', 'Success', 1);
      expect(eventMock).toHaveBeenCalledWith({
        category: 'Contact Form',
        action: 'Submit',
        label: 'Success',
        value: 1,
      });
    });

    it('allows label and value to be omitted', async () => {
      const { logEvent } = await loadGa('G-TEST123');
      logEvent('Resume', 'Downloaded');
      expect(eventMock).toHaveBeenCalledWith({
        category: 'Resume',
        action: 'Downloaded',
        label: undefined,
        value: undefined,
      });
    });
  });

  describe('when VITE_GA_TRACKING_ID is unset', () => {
    // This is the regression guard for the REACT_APP_ prefix bug: with no ID
    // configured, analytics must stay entirely silent rather than falling back
    // to somebody else's property.
    it('does not initialise', async () => {
      const { initGA } = await loadGa();
      initGA();
      expect(initializeMock).not.toHaveBeenCalled();
    });

    it('does not send pageviews', async () => {
      const { logPageView } = await loadGa();
      logPageView();
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('does not send events', async () => {
      const { logEvent } = await loadGa();
      logEvent('Contact Form', 'Submit');
      expect(eventMock).not.toHaveBeenCalled();
    });
  });
});
