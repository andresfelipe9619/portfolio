import { lazy, Suspense } from 'react';
import { useConsent } from '@/hooks/use-consent';

// Downloaded only once a visitor says yes: someone who declines never
// receives the analytics code at all, let alone runs it.
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
);

/**
 * Vercel Analytics, mounted the moment a visitor accepts rather than on their
 * next page load. Most people visit a portfolio once, so "next load" meant
 * nearly every consenting visitor went uncounted.
 */
export function ConsentedAnalytics() {
  return useConsent() === 'granted' ? (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  ) : null;
}
