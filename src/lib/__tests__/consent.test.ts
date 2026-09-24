import { vi, beforeEach, afterEach } from 'vitest';

const KEY = 'analytics-consent';

/**
 * consent.ts keeps a per-visit fallback in module state, so each test gets a
 * fresh copy rather than inheriting the previous test's answer.
 */
const loadConsent = async () => {
  vi.resetModules();
  return import('../consent');
};

describe('consent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts unset for a first-time visitor', async () => {
    const { getConsent, hasConsent } = await loadConsent();

    expect(getConsent()).toBe('unset');
    expect(hasConsent()).toBe(false);
  });

  it('records and reports a granted answer', async () => {
    const { getConsent, hasConsent, setConsent } = await loadConsent();

    setConsent('granted');

    expect(getConsent()).toBe('granted');
    expect(hasConsent()).toBe(true);
    expect(localStorage.getItem(KEY)).toBe('granted');
  });

  it('records and reports a denied answer', async () => {
    const { getConsent, hasConsent, setConsent } = await loadConsent();

    setConsent('denied');

    expect(getConsent()).toBe('denied');
    expect(hasConsent()).toBe(false);
  });

  it('treats a junk stored value as no answer at all', async () => {
    const { getConsent } = await loadConsent();
    localStorage.setItem(KEY, 'maybe-later');

    expect(getConsent()).toBe('unset');
  });

  it('notifies listeners when the answer changes', async () => {
    const { onConsentChange, setConsent } = await loadConsent();
    const handler = vi.fn();
    const unsubscribe = onConsentChange(handler);

    setConsent('granted');

    expect(handler).toHaveBeenCalledWith('granted');
    unsubscribe();
  });

  it('stops notifying after unsubscribe', async () => {
    const { onConsentChange, setConsent } = await loadConsent();
    const handler = vi.fn();
    const unsubscribe = onConsentChange(handler);
    unsubscribe();

    setConsent('granted');

    expect(handler).not.toHaveBeenCalled();
  });

  // Private browsing and blocked storage must fail closed, not crash.
  it('reports unset when localStorage throws on read', async () => {
    const { getConsent, hasConsent } = await loadConsent();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(getConsent()).toBe('unset');
    expect(hasConsent()).toBe(false);
  });

  // ...but a visitor who answers must not be ignored just because storage is.
  it('remembers the answer for this visit when storage refuses to write', async () => {
    const { getConsent, setConsent } = await loadConsent();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(() => setConsent('granted')).not.toThrow();
    expect(getConsent()).toBe('granted');
  });

  describe('subscribeToConsent', () => {
    it('fires when this tab answers', async () => {
      const { subscribeToConsent, setConsent } = await loadConsent();
      const onChange = vi.fn();
      const unsubscribe = subscribeToConsent(onChange);

      setConsent('denied');

      expect(onChange).toHaveBeenCalledTimes(1);
      unsubscribe();
    });

    it('fires when another tab answers', async () => {
      const { subscribeToConsent } = await loadConsent();
      const onChange = vi.fn();
      const unsubscribe = subscribeToConsent(onChange);

      window.dispatchEvent(new StorageEvent('storage', { key: KEY }));

      expect(onChange).toHaveBeenCalledTimes(1);
      unsubscribe();
    });

    it('ignores storage changes to unrelated keys', async () => {
      const { subscribeToConsent } = await loadConsent();
      const onChange = vi.fn();
      const unsubscribe = subscribeToConsent(onChange);

      window.dispatchEvent(new StorageEvent('storage', { key: 'theme' }));

      expect(onChange).not.toHaveBeenCalled();
      unsubscribe();
    });

    it('stops firing after unsubscribe', async () => {
      const { subscribeToConsent, setConsent } = await loadConsent();
      const onChange = vi.fn();
      subscribeToConsent(onChange)();

      setConsent('granted');

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
