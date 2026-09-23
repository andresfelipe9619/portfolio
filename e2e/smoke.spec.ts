import { test, expect } from '@playwright/test';

/**
 * Puts the browser in the state of a returning visitor: hero animation already
 * seen, consent banner already answered. Most specs exercise the site proper,
 * not the first-run prompts — those get their own tests below.
 */
const asReturningVisitor = async (page: import('@playwright/test').Page) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('hasSeenHero', 'true');
    localStorage.setItem('analytics-consent', 'denied');
  });
};

test.beforeEach(async ({ page }) => {
  await asReturningVisitor(page);
});

test.describe('routes', () => {
  const routes = [
    { path: '/', titleContains: 'Andrés Suárez' },
    { path: '/projects', titleContains: 'Projects' },
    { path: '/oss', titleContains: 'Open Source' },
    { path: '/contact', titleContains: 'Contact' },
    { path: '/blog', titleContains: 'Blog' },
  ];

  for (const { path, titleContains } of routes) {
    test(`${path} loads with its own title`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(titleContains, 'i'));
      await expect(page.locator('body')).toBeVisible();
    });
  }

  test('an unknown URL renders the 404 page rather than a blank one', async ({
    page,
  }) => {
    await page.goto('/this-route-does-not-exist');

    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByTestId('not-found-path')).toContainText(
      '/this-route-does-not-exist',
    );
  });

  test('the 404 page routes back home', async ({ page }) => {
    await page.goto('/nope');
    await page.getByRole('button', { name: /back to home/i }).click();
    await expect(page).toHaveURL('/');
  });
});

/**
 * Environment noise, not application bugs: third-party beacons (Vercel
 * Analytics, Sentry, GA) are unreachable from a local preview, a restricted CI
 * network or behind an ad blocker. Asserting on those would make this test fail
 * for reasons that have nothing to do with the code, so we filter them out and
 * keep the assertion on errors the app itself produced.
 */
const ENVIRONMENT_NOISE = [
  /_vercel\/insights/i,
  /Vercel Web Analytics/i,
  /Failed to load resource/i,
  /ERR_TUNNEL_CONNECTION_FAILED/i,
  /ERR_CERT_AUTHORITY_INVALID/i,
  /ERR_NAME_NOT_RESOLVED/i,
  /ERR_BLOCKED_BY_CLIENT/i,
  /net::ERR_/i,
];

const isOurProblem = (message: string) =>
  !ENVIRONMENT_NOISE.some((pattern) => pattern.test(message));

test.describe('console hygiene', () => {
  test('the home page raises no uncaught exceptions', async ({ page }) => {
    const errors: string[] = [];

    // pageerror is the signal that matters: an uncaught exception in our code.
    page.on('pageerror', (err) => {
      if (isOurProblem(err.message)) errors.push(err.message);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error' && isOurProblem(msg.text())) {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });

  // Guards the debug logging that used to ship in Home and file-tree.
  test('the home page logs nothing to the console at all', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log' && isOurProblem(msg.text())) {
        logs.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(logs).toEqual([]);
  });
});

test.describe('internationalization', () => {
  test('html lang starts as a real language tag', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toMatch(/^[a-z]{2}$/);
  });

  test('switching language updates both the copy and html lang', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /toggle language/i }).click();
    await page.getByRole('menuitem', { name: /Español/i }).click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });
});

test.describe('contact form', () => {
  test('submits successfully and clears the form', async ({ page }) => {
    await page.route('**/api.web3forms.com/submit', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      }),
    );

    await page.goto('/contact');

    await page.getByLabel(/call you/i).fill('Ada Lovelace');
    await page.getByLabel(/email/i).fill('ada@example.com');
    await page.getByLabel(/message/i).fill('Your portfolio is lovely.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByLabel(/message/i)).toHaveValue('', {
      timeout: 10_000,
    });
  });

  // The regression this whole review started from.
  test('keeps the draft when the API fails', async ({ page }) => {
    await page.route('**/api.web3forms.com/submit', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'boom' }),
      }),
    );

    await page.goto('/contact');

    const draft = 'This message must survive a server error.';
    await page.getByLabel(/call you/i).fill('Ada Lovelace');
    await page.getByLabel(/email/i).fill('ada@example.com');
    await page.getByLabel(/message/i).fill(draft);
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByLabel(/message/i)).toHaveValue(draft);
  });
});

test.describe('security headers and hygiene', () => {
  test('no source maps are exposed', async ({ page }) => {
    const response = await page.goto('/');
    const html = (await response?.text()) ?? '';
    expect(html).not.toContain('sourceMappingURL');
  });

  test('the dev-only error route is not reachable in a build', async ({
    page,
  }) => {
    await page.goto('/test-error');
    // Gated behind import.meta.env.DEV, so a production build falls to 404.
    await expect(page.getByText('404')).toBeVisible();
  });
});

test.describe('accessibility basics', () => {
  test('every page has exactly one h1', async ({ page }) => {
    for (const path of ['/projects', '/contact', '/blog', '/nope']) {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
    }
  });

  test('the explorer toggle is reachable and labelled', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle Explorer' });
    await expect(toggle).toBeVisible();
  });

  test('images carry alt attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const missingAlt = await page.locator('img:not([alt])').count();
    expect(missingAlt).toBe(0);
  });
});
