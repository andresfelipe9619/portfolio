import { test, expect } from '@playwright/test';

/**
 * First-run consent flow.
 *
 * These live in their own file because every other spec runs as a returning
 * visitor who has already answered. An init script that cleared the answer
 * would re-run on each navigation and make "stays dismissed" untestable.
 */
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem('hasSeenHero', 'true');
  });
});

test('greets a first-time visitor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('accepting dismisses the banner', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /sure, go ahead/i }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('declining dismisses it and leaves the site fully usable', async ({
  page,
}) => {
  await page.goto('/contact');

  await page.getByRole('button', { name: /no thanks/i }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  // The real check: once answered, nothing is left covering the primary
  // action. A fixed bottom banner over a submit button is a genuine mobile
  // bug, and this is what catches it.
  await page.getByLabel(/message/i).fill('Still reachable.');
  const submit = page.getByRole('button', { name: /send message/i });
  await expect(submit).toBeEnabled();
  await submit.click();
});

test('the answer survives navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /no thanks/i }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.goto('/projects');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('declining means no analytics requests go out', async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on('request', (request) => {
    const url = request.url();
    if (/clarity\.ms|google-analytics|googletagmanager/i.test(url)) {
      analyticsRequests.push(url);
    }
  });

  await page.goto('/');
  await page.getByRole('button', { name: /no thanks/i }).click();
  await page.goto('/projects');
  await page.waitForLoadState('networkidle');

  expect(analyticsRequests).toEqual([]);
});
