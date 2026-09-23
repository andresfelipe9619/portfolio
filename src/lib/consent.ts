/**
 * Analytics consent.
 *
 * Four trackers (Clarity, GA, Vercel Analytics, Sentry replay) used to boot on
 * first paint with no way to say no — on a site that ships German and French
 * translations and therefore addresses visitors who are entitled to be asked.
 * Nothing that identifies a visitor now runs until they say yes.
 */

export const CONSENT_STORAGE_KEY = 'analytics-consent';

export type ConsentState = 'granted' | 'denied' | 'unset';

/** Fires whenever consent changes, so listeners can boot or stay quiet. */
export const CONSENT_EVENT = 'analytics-consent-changed';

export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unset';
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : 'unset';
  } catch {
    // Private mode, blocked storage — treat an unreadable answer as no answer.
    return 'unset';
  }
}

export function setConsent(state: Exclude<ConsentState, 'unset'>) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    // If we can't remember the answer we'll ask again; that's the safe failure.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function hasConsent(): boolean {
  return getConsent() === 'granted';
}

export function onConsentChange(handler: (state: ConsentState) => void) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<ConsentState>).detail);
  };
  window.addEventListener(CONSENT_EVENT, listener);
  return () => window.removeEventListener(CONSENT_EVENT, listener);
}
