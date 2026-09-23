import './instrument';

import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { initGA } from './lib/ga';
import { initClarity } from './lib/clarity';
import { reactErrorHandler } from '@sentry/react';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import { hasConsent, onConsentChange } from './lib/consent';
import './lib/i18n';

/**
 * Analytics boot only for visitors who said yes — on first load if they already
 * agreed, or the moment they press accept on the banner.
 */
const bootAnalytics = () => {
  if (!hasConsent()) return;
  initGA();
  initClarity();
};

bootAnalytics();
onConsentChange(bootAnalytics);

createRoot(document.getElementById('root')!, {
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
}).render(
  <StrictMode>
    <HelmetProvider>
      {/* Vercel Analytics is cookieless, but it still counts as measurement,
          so it waits for the same yes as everything else. */}
      {hasConsent() && <Analytics />}
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  </StrictMode>,
);
