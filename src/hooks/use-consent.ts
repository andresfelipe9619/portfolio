import { useSyncExternalStore } from 'react';
import {
  getConsent,
  subscribeToConsent,
  type ConsentState,
} from '@/lib/consent';

/**
 * The visitor's current consent answer, kept live.
 *
 * Anything that reads consent once at render time goes stale the moment the
 * visitor presses a button — which is exactly how Vercel Analytics used to
 * stay off after "accept" until the next page load.
 */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribeToConsent, getConsent, () => 'unset');
}
