/**
 * Microsoft Clarity loader.
 *
 * This used to live as an inline <script> in index.html with the project ID
 * baked in and a comment claiming it "loads only if set" — which it cheerfully
 * ignored. Now it genuinely only loads when VITE_CLARITY_PROJECT_ID is set, and
 * moving it out of the HTML means a strict Content-Security-Policy no longer
 * needs an 'unsafe-inline' exemption carved out just for it.
 */

import { hasConsent } from './consent';

type ClarityQueue = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityQueue;
  }
}

const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

export const initClarity = () => {
  if (!CLARITY_PROJECT_ID || typeof document === 'undefined') return;
  if (!hasConsent()) return;
  if (document.getElementById('clarity-script')) return;

  const queue: ClarityQueue = (...args: unknown[]) => {
    (queue.q = queue.q || []).push(args);
  };
  window.clarity = window.clarity || queue;

  const script = document.createElement('script');
  script.id = 'clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
};
