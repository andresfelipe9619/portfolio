
import ReactGA from 'react-ga4';

const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-1K72061LE9';

export const initGA = () => {
    if (GA_TRACKING_ID) {
        ReactGA.initialize(GA_TRACKING_ID);
    }
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label: string) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};
