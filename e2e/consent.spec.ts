import { test, expect } from './fixtures';

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

test.describe('what actually gets measured', () => {
  // The positive control. Without it, the "declining" test below could pass
  // for the wrong reason — no IDs in the build, or a pattern that matches
  // nothing — which is exactly how it passed before, in CI, proving nothing.
  test('accepting starts the trackers', async ({ page, trackerRequests }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sure, go ahead/i }).click();

    await expect.poll(() => trackerRequests.length).toBeGreaterThan(0);
  });

  test('declining means no tracker is ever contacted', async ({
    page,
    trackerRequests,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /no thanks/i }).click();
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    expect(trackerRequests).toEqual([]);
  });

  test('not answering at all means no tracker is contacted either', async ({
    page,
    trackerRequests,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(trackerRequests).toEqual([]);
  });
});
