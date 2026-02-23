import { StrictMode, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';
import { initGA } from './lib/ga';
import * as Sentry from '@sentry/react';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import './lib/i18n';

Sentry.init({
  dsn: 'https://869f2b57b98cbe1f86a16043a6f3fd51@o267366.ingest.us.sentry.io/4509940389707776',
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', 'https://andressuarez.dev/'],

  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

initGA();

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
