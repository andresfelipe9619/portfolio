import ReactGA from 'react-ga4';

// Vite only exposes variables prefixed with VITE_. The old REACT_APP_ prefix was
// a Create React App leftover that silently resolved to undefined forever, which
// meant the hardcoded fallback was the only ID this app ever used.
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const initGA = () => {
  if (!GA_TRACKING_ID) return;
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = () => {
  if (!GA_TRACKING_ID) return;
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
) => {
  if (!GA_TRACKING_ID) return;
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
