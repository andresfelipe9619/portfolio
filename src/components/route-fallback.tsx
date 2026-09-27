/**
 * What a route shows while its code downloads: an empty stretch of page under
 * the header, marked busy for assistive tech.
 *
 * This used to be the animated loading terminal, and that cost seconds. Its
 * typing timer re-rendered the Suspense boundary every 25 ms. React renders a
 * suspended page as low-priority work that is never escalated, so each tick
 * interrupted the incoming page and it started over. Home couldn't finish
 * rendering until the terminal ran out of lines: 5.5 s on a fast laptop and
 * 18 s in dev. A Suspense fallback must never have a heartbeat.
 */
export function RouteFallback() {
  return <div aria-busy="true" className="min-h-[100dvh]" />;
}
