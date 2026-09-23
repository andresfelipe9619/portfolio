import ReactGA from 'react-ga4';
import { hasConsent } from './consent';

// Vite only exposes variables prefixed with VITE_. The old REACT_APP_ prefix was
// a Create React App leftover that silently resolved to undefined forever, which
// meant the hardcoded fallback was the only ID this app ever used.
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

let initialized = false;

/** Two gates: an ID has to be configured, and the visitor has to have agreed. */
const enabled = () => Boolean(GA_TRACKING_ID) && hasConsent();

export const initGA = () => {
  if (!enabled() || initialized) return;
  ReactGA.initialize(GA_TRACKING_ID as string);
  initialized = true;
};

export const logPageView = () => {
  if (!enabled()) return;
  initGA();
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
) => {
  if (!enabled()) return;
  initGA();
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
