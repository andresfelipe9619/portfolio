import * as Sentry from '@sentry/react';
import React from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

Sentry.init({
  dsn: 'https://869f2b57b98cbe1f86a16043a6f3fd51@o267366.ingest.us.sentry.io/4509940389707776',
  environment: import.meta.env.MODE,

  // Visitors type their name, email and life story into /contact. None of that is
  // ours to keep, so we don't collect it: no IP addresses, no cookies, no headers.
  sendDefaultPii: false,

  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    // Session Replay with the blinds firmly closed. Text is masked, media is
    // blocked, inputs are ignored. We get to see *that* something broke and
    // roughly where, never *what* someone was writing when it did.
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
    }),
  ],

  // A portfolio is not a trading floor. 20% of traces is plenty of signal
  // without burning the quota by lunchtime.
  tracesSampleRate: 0.2,
  tracePropagationTargets: ['localhost', 'https://andressuarez.dev/'],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  enableLogs: true,
});
