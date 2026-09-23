import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end smoke coverage.
 *
 * The jsdom suite can't run canvas, WebGL or real navigation, which is exactly
 * where this portfolio keeps its personality — the globe, the particles, the
 * terminal boot sequence. These specs drive a real browser so those parts have
 * someone watching them too.
 */
/**
 * Some environments (CI images, sandboxes) ship a Chromium build that doesn't
 * match the one @playwright/test would download. Set PLAYWRIGHT_CHROMIUM_PATH
 * to reuse it; everywhere else Playwright resolves its own browser as usual.
 */
const CHROMIUM_PATH = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html']] : [['list']],

  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { executablePath: CHROMIUM_PATH },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 7'],
        launchOptions: { executablePath: CHROMIUM_PATH },
      },
    },
  ],

  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
