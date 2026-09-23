import { vi, beforeEach, afterEach } from 'vitest';
import {
  CONSENT_STORAGE_KEY,
  getConsent,
  hasConsent,
  onConsentChange,
  setConsent,
} from '../consent';

describe('consent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts unset for a first-time visitor', () => {
    expect(getConsent()).toBe('unset');
    expect(hasConsent()).toBe(false);
  });

  it('records and reports a granted answer', () => {
    setConsent('granted');

    expect(getConsent()).toBe('granted');
    expect(hasConsent()).toBe(true);
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted');
  });

  it('records and reports a denied answer', () => {
    setConsent('denied');

    expect(getConsent()).toBe('denied');
    expect(hasConsent()).toBe(false);
  });

  it('treats a junk stored value as no answer at all', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'maybe-later');
    expect(getConsent()).toBe('unset');
  });

  it('notifies listeners when the answer changes', () => {
    const handler = vi.fn();
    const unsubscribe = onConsentChange(handler);

    setConsent('granted');

    expect(handler).toHaveBeenCalledWith('granted');
    unsubscribe();
  });

  it('stops notifying after unsubscribe', () => {
    const handler = vi.fn();
    const unsubscribe = onConsentChange(handler);
    unsubscribe();

    setConsent('granted');

    expect(handler).not.toHaveBeenCalled();
  });

  // Private browsing and blocked storage must fail closed, not crash.
  it('reports unset when localStorage throws on read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(getConsent()).toBe('unset');
    expect(hasConsent()).toBe(false);
  });

  it('does not throw when localStorage refuses to write', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(() => setConsent('granted')).not.toThrow();
  });
});
