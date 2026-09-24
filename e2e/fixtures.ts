import { test as base, expect } from '@playwright/test';

/**
 * Third-party measurement endpoints. Production builds carry real GA and
 * Clarity IDs (see .env.production), so without this every CI run that
 * accepts the consent banner would send genuine hits into the live
 * dashboards.
 */
const TRACKERS =
  /google-analytics\.com|googletagmanager\.com|clarity\.ms|\/_vercel\/insights\//;
const SENTRY = /ingest\.(?:[a-z]+\.)?sentry\.io/;

type Fixtures = {
  /**
   * Every tracker request the page *tried* to make. Each one is aborted
   * before it leaves the browser, but still recorded, so a test can assert
   * that nothing was attempted — which is the claim that matters.
   */
  trackerRequests: string[];
};

export const test = base.extend<Fixtures>({
  trackerRequests: [
    async ({ page }, use) => {
      const attempted: string[] = [];

      await page.route(
        (url) => TRACKERS.test(url.href),
        (route) => {
          attempted.push(route.request().url());
          return route.abort();
        },
      );
      // Error reports and traces from CI aren't worth anyone's Sentry quota.
      await page.route(
        (url) => SENTRY.test(url.href),
        (route) => route.abort(),
      );

      await use(attempted);
    },
    { auto: true },
  ],
});

export { expect };
