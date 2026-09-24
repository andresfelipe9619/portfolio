import { reactErrorHandler } from '@sentry/react';
import type { RootOptions } from 'react-dom/client';

/**
 * How the React root reports errors to Sentry.
 *
 * There is deliberately no `onCaughtError`. Everything React catches is caught
 * by our `Sentry.ErrorBoundary`, which reports it already, and hands that
 * event's ID to the "Submit Diagnostic Report" button. With `onCaughtError`
 * wired up as well, every crash was captured twice: Sentry's Dedupe kept the
 * first copy, and visitor feedback got filed against the copy it threw away.
 */
export const rootErrorHandlers = {
  onUncaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
} satisfies RootOptions;
