/**
 * Visitor consent for measurement.
 *
 * Gated behind a yes: Google Analytics, Microsoft Clarity, Vercel Analytics and
 * Sentry Session Replay. None of them start until a visitor accepts, and
 * declining costs nothing — the site works identically either way.
 *
 * Not gated: Sentry error reports and anonymous performance traces. They carry
 * no PII (sendDefaultPii is off), set no cookies, and are how we find out the
 * site is broken for someone.
 */

export const CONSENT_STORAGE_KEY = 'analytics-consent';

export type ConsentState = 'granted' | 'denied' | 'unset';

/** Fires whenever consent changes, so listeners can boot or stay quiet. */
export const CONSENT_EVENT = 'analytics-consent-changed';

/**
 * Where the answer lives when localStorage refuses to store it (private mode,
 * strict privacy settings). Without this, a visitor in that situation would
 * press a button and watch the banner ignore them.
 */
let answerThisSession: ConsentState = 'unset';

export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unset';
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    // Unreadable storage: fall through to whatever we remember from this visit.
  }
  return answerThisSession;
}

export function setConsent(state: Exclude<ConsentState, 'unset'>) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    // Can't persist it, so remember it for this visit and ask again next time.
    answerThisSession = state;
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

/**
 * Subscription in the shape useSyncExternalStore wants. Also listens for the
 * `storage` event, so answering in one tab updates the others.
 */
export function subscribeToConsent(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}
