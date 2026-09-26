import * as Sentry from '@sentry/react';
import React from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

Sentry.init({
  // Lives in .env.production, public by design like the GA ID. Unset (as in
  // `npm run dev` and the tests) means the SDK records and sends nothing.
  // It used to be hardcoded here, pointing at a project outside the Sentry
  // org that receives the source maps and sends the alerts. The errors went
  // out; the alerts were never going to come.
  dsn: import.meta.env.VITE_SENTRY_DSN,

  // Vercel says 'production' or 'preview'. Anything built elsewhere (a laptop,
  // CI, a Lighthouse run) is 'local', so it can't pass for the live site.
  environment:
    import.meta.env.VITE_VERCEL_ENV ??
    (import.meta.env.DEV ? 'development' : 'local'),

  // Visitors type their name, email and life story into /contact. None of that is
  // ours to keep, so we don't collect it: no IP addresses, no cookies, no headers.
  sendDefaultPii: false,

  // Error reports and anonymous performance traces run for everyone: they carry
  // no PII, set no cookies, and are how we find out the site is broken. Session
  // Replay is different — it records what a visit looked like — so it is *not*
  // listed here. It only joins once a visitor says yes (see enableSessionReplay).
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],

  // A portfolio is not a trading floor. 20% of traces is plenty of signal
  // without burning the quota by lunchtime.
  tracesSampleRate: 0.2,
  tracePropagationTargets: ['localhost', 'https://andressuarez.dev/'],

  // Read by the replay integration when it's added after consent.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  enableLogs: true,
});

let replay: Promise<void> | undefined;

/**
 * Starts Session Replay. Called only once the visitor has consented, and safe
 * to call more than once.
 *
 * Replay with the blinds firmly closed: text is masked, media is blocked,
 * inputs are ignored. We get to see *that* something broke and roughly where,
 * never *what* someone was writing when it did.
 *
 * It's also the heaviest part of the SDK, about 120 kB before compression, so
 * it downloads when someone says yes rather than with everyone's first page.
 * It's imported from @sentry-internal/replay, pinned to the same version as
 * @sentry/react (a test checks), because @sentry/react is already in the first
 * download and a dynamic import of it would split nothing.
 */
export function enableSessionReplay(): Promise<void> {
  replay ??= import('@sentry-internal/replay')
    .then(({ replayIntegration }) => {
      Sentry.addIntegration(
        replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
          maskAllInputs: true,
        }),
      );
    })
    .catch(() => {
      // A dropped connection shouldn't cost the next consent its replay.
      replay = undefined;
    });
  return replay;
}
