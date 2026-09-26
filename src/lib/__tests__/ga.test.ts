import { vi, beforeEach, afterEach } from 'vitest';

const initializeMock = vi.fn();
const sendMock = vi.fn();
const eventMock = vi.fn();

/** Flips to true the moment anything actually loads react-ga4. */
const downloaded = { ga: false };

/**
 * ga.ts reads the tracking ID once at module load, so each test stubs the env
 * and then re-imports the module with a fresh registry.
 */
const loadGa = async (trackingId?: string, consent = true) => {
  vi.resetModules();
  downloaded.ga = false;
  // doMock, not a hoisted vi.mock: its factory runs again for every fresh
  // module registry, which is what lets a test see whether it loaded at all.
  vi.doMock('react-ga4', () => {
    downloaded.ga = true;
    return {
      default: {
        initialize: (...args: unknown[]) => initializeMock(...args),
        send: (...args: unknown[]) => sendMock(...args),
        event: (...args: unknown[]) => eventMock(...args),
      },
    };
  });
  vi.stubEnv('VITE_GA_TRACKING_ID', trackingId ?? '');
  localStorage.setItem('analytics-consent', consent ? 'granted' : 'denied');
  return import('../ga');
};

/** react-ga4 is imported on demand, so let that import and its callbacks land. */
const settle = async () => {
  await vi.dynamicImportSettled();
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('ga', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    localStorage.clear();
  });

  describe('when VITE_GA_TRACKING_ID is set', () => {
    it('initialises with the configured id', async () => {
      const { initGA } = await loadGa('G-TEST123');
      await initGA();
      expect(initializeMock).toHaveBeenCalledWith('G-TEST123');
    });

    it('initialises only once, however often it is asked', async () => {
      const { initGA, logEvent } = await loadGa('G-TEST123');
      await Promise.all([initGA(), initGA()]);
      logEvent('Resume', 'Downloaded');
      await settle();
      expect(initializeMock).toHaveBeenCalledTimes(1);
    });

    it('sends a pageview for the current path', async () => {
      const { logPageView } = await loadGa('G-TEST123');
      window.history.pushState({}, '', '/projects');
      logPageView();
      await settle();
      expect(sendMock).toHaveBeenCalledWith({
        hitType: 'pageview',
        page: '/projects',
      });
    });

    // The library arrives after the call, and the visitor may have clicked on
    // by then: the pageview belongs to where they were when it was logged.
    it('records the path at the moment of the pageview', async () => {
      const { logPageView } = await loadGa('G-TEST123');
      window.history.pushState({}, '', '/projects');
      logPageView();
      window.history.pushState({}, '', '/contact');
      await settle();
      expect(sendMock).toHaveBeenCalledWith({
        hitType: 'pageview',
        page: '/projects',
      });
    });

    it('initialises before sending anything', async () => {
      const { logEvent } = await loadGa('G-TEST123');
      logEvent('Resume', 'Downloaded');
      await settle();
      expect(initializeMock.mock.invocationCallOrder[0]).toBeLessThan(
        eventMock.mock.invocationCallOrder[0],
      );
    });

    it('forwards events with all four fields', async () => {
      const { logEvent } = await loadGa('G-TEST123');
      logEvent('Contact Form', 'Submit', 'Success', 1);
      await settle();
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
      await settle();
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
      await initGA();
      expect(initializeMock).not.toHaveBeenCalled();
    });

    it('does not send pageviews', async () => {
      const { logPageView } = await loadGa();
      logPageView();
      await settle();
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('does not send events', async () => {
      const { logEvent } = await loadGa();
      logEvent('Contact Form', 'Submit');
      await settle();
      expect(eventMock).not.toHaveBeenCalled();
    });
  });

  describe('when the visitor has not consented', () => {
    it('does not initialise even with an ID configured', async () => {
      const { initGA } = await loadGa('G-TEST123', false);
      await initGA();
      expect(initializeMock).not.toHaveBeenCalled();
    });

    it('does not send pageviews', async () => {
      const { logPageView } = await loadGa('G-TEST123', false);
      logPageView();
      await settle();
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('does not send events', async () => {
      const { logEvent } = await loadGa('G-TEST123', false);
      logEvent('Contact Form', 'Submit');
      await settle();
      expect(eventMock).not.toHaveBeenCalled();
    });

    // Declining means the code never even arrives, not just that it stays idle.
    it('never downloads the analytics library at all', async () => {
      const { initGA, logPageView, logEvent } = await loadGa(
        'G-TEST123',
        false,
      );
      await initGA();
      logPageView();
      logEvent('Contact Form', 'Submit');
      await settle();
      expect(downloaded.ga).toBe(false);
    });
  });
});
