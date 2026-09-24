import { test, expect } from './fixtures';

/**
 * Puts the browser in the state of a returning visitor: hero animation already
 * seen, consent banner already answered. Most specs exercise the site proper,
 * not the first-run prompts — those live in consent.spec.ts.
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
      // Home takes several seconds to render in headless Chromium, which has
      // no GPU to hand the globe and particles to. It always did — a static
      // <title> in index.html used to hide that from this test. The title
      // arrives with the page, so give the page time to arrive.
      await expect(page).toHaveTitle(new RegExp(titleContains, 'i'), {
        timeout: 20_000,
      });
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

  test('switching language updates the copy and html lang together', async ({
    page,
  }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toContainText("Let's Build Something");

    await page.getByRole('button', { name: /toggle language/i }).click();
    await page.getByRole('menuitem', { name: /Español/i }).click();

    await expect(page.locator('h1')).toContainText('Construyamos Algo');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('a ?lng= link opens the site in that language', async ({ page }) => {
    await page.goto('/contact?lng=fr');

    await expect(page.locator('h1')).toContainText(
      'Construisons Quelque Chose',
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test.describe('a first visit from a German browser', () => {
    // Just 'de-DE', the way Safari reports it. index.html's static lang="en"
    // used to outrank it, so these visitors got English.
    test.use({ locale: 'de-DE' });

    test('arrives in German, text and html lang alike', async ({ page }) => {
      await page.goto('/contact');

      await expect(page.locator('h1')).toContainText('Lasst uns etwas');
      await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    });

    // Slow the dictionary right down: the page may wait, but it must never
    // show English under lang="de" — the mismatch the review caught.
    test('never shows English text under a German tag while loading', async ({
      page,
    }) => {
      await page.route(/translation-[^/]*\.js$/, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await route.continue();
      });

      const mismatches: string[] = [];
      await page.exposeFunction('reportMismatch', (text: string) =>
        mismatches.push(text),
      );
      await page.addInitScript(() => {
        new MutationObserver(() => {
          const h1 = document.querySelector('h1')?.textContent ?? '';
          if (
            document.documentElement.lang === 'de' &&
            /Let's Build/.test(h1)
          ) {
            (
              window as unknown as { reportMismatch: (t: string) => void }
            ).reportMismatch(h1);
          }
        }).observe(document, {
          subtree: true,
          childList: true,
          attributes: true,
        });
      });

      await page.goto('/contact');
      await expect(page.locator('h1')).toContainText('Lasst uns etwas');

      expect(mismatches).toEqual([]);
    });
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
  // The old version of this test read index.html, which never contains a
  // sourceMappingURL even when maps ship — so it could not fail. This one
  // reads every script the page loads eagerly, and asks for each one's map.
  test('no source maps are linked or served', async ({ page, request }) => {
    await page.goto('/');

    const scripts = await page
      .locator('script[type="module"][src], link[rel="modulepreload"][href]')
      .evaluateAll((elements) =>
        elements.map(
          (el) => el.getAttribute('src') ?? el.getAttribute('href') ?? '',
        ),
      );
    expect(scripts.length).toBeGreaterThan(0);

    for (const src of scripts) {
      const js = await (await request.get(src)).text();
      expect(js, `${src} links a source map`).not.toContain('sourceMappingURL');

      // Vercel's SPA rewrite answers any unknown path with index.html and a
      // 200, so check the body, not the status.
      const map = await (await request.get(`${src}.map`)).text();
      expect(map, `${src}.map is served`).not.toContain('"mappings"');
    }
  });

  test('the Sentry test route is not reachable in a production build', async ({
    page,
  }) => {
    await page.goto('/test-error');
    // Only dev servers and Vercel preview deploys get it (see App.tsx). This
    // build is neither, so it falls through to the 404 page.
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
