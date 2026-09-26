import { hasConsent } from './consent';

// Vite only exposes variables prefixed with VITE_. The old REACT_APP_ prefix was
// a Create React App leftover that silently resolved to undefined forever, which
// meant the hardcoded fallback was the only ID this app ever used.
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

type ReactGA = typeof import('react-ga4').default;

let ga: Promise<ReactGA> | undefined;

/** Two gates: an ID has to be configured, and the visitor has to have agreed. */
const enabled = () => Boolean(GA_TRACKING_ID) && hasConsent();

/**
 * react-ga4 downloads the first time it's needed, which for anyone who
 * declines is never, and it's initialised on the way in, so nothing is ever
 * sent before GA knows which property it belongs to.
 */
const ready = (): Promise<ReactGA> =>
  (ga ??= import('react-ga4')
    .then(({ default: ReactGA }) => {
      ReactGA.initialize(GA_TRACKING_ID as string);
      return ReactGA;
    })
    .catch((error: unknown) => {
      ga = undefined; // A dropped connection shouldn't switch GA off for good.
      throw error;
    }));

/** Analytics must never break the page, so a failed load is simply skipped. */
const ignore = () => undefined;

export const initGA = (): Promise<void> | undefined => {
  if (!enabled()) return;
  return ready().then(ignore, ignore);
};

export const logPageView = () => {
  if (!enabled()) return;
  // Read now: by the time the library arrives, the visitor may have moved on.
  const page = window.location.pathname;
  void ready().then(
    (ReactGA) => ReactGA.send({ hitType: 'pageview', page }),
    ignore,
  );
};

export const logEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
) => {
  if (!enabled()) return;
  void ready().then(
    (ReactGA) => ReactGA.event({ category, action, label, value }),
    ignore,
  );
};
