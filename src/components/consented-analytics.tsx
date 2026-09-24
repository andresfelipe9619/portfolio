import { Analytics } from '@vercel/analytics/react';
import { useConsent } from '@/hooks/use-consent';

/**
 * Vercel Analytics, mounted the moment a visitor accepts rather than on their
 * next page load. Most people visit a portfolio once, so "next load" meant
 * nearly every consenting visitor went uncounted.
 */
export function ConsentedAnalytics() {
  return useConsent() === 'granted' ? <Analytics /> : null;
}
