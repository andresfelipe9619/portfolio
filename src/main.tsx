import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { initGA } from './lib/ga';
import * as Sentry from '@sentry/react';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import './lib/i18n';

Sentry.init({
  dsn: 'https://869f2b57b98cbe1f86a16043a6f3fd51@o267366.ingest.us.sentry.io/4509940389707776',
  integrations: [Sentry.browserTracingIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', 'https://andressuarez.dev/'],
});

initGA();

import { Suspense } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Analytics />
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  </StrictMode>,
);
