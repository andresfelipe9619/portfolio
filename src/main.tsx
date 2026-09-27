import { enableSessionReplay } from './instrument';

import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { initGA } from './lib/ga';
import { initClarity } from './lib/clarity';
import { rootErrorHandlers } from './lib/root-error-handlers';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'motion/react';
import { hasConsent, onConsentChange } from './lib/consent';
import { ConsentedAnalytics } from './components/consented-analytics';
import './lib/i18n';

/**
 * Measurement boots only for visitors who said yes — on first load if they
 * already agreed, or the moment they press accept on the banner.
 */
const bootMeasurement = () => {
  if (!hasConsent()) return;
  initGA();
  initClarity();
  void enableSessionReplay();
};

bootMeasurement();
onConsentChange(bootMeasurement);

createRoot(document.getElementById('root')!, rootErrorHandlers).render(
  <StrictMode>
    {/* Transforms and layout animations stand down for reduced-motion visitors. */}
    <MotionConfig reducedMotion="user">
      <HelmetProvider>
        <ConsentedAnalytics />
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </HelmetProvider>
    </MotionConfig>
  </StrictMode>,
);
