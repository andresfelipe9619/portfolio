# CI workflows — pending activation

These five files are the CI configuration from Phase 1 and Phase 4 of
[the review plan](../PORTFOLIO_REVIEW_AND_PLAN.md). They are sitting here
rather than in `.github/workflows/` for one boring reason: the token used to
push this branch has no `workflow` scope, so GitHub rejects any push that
creates or edits a file under `.github/workflows/`.

Nothing is wrong with the files. They just need a human with normal push rights
to move them.

## Activate

```bash
cp docs/ci/*.yml .github/workflows/
rm -r docs/ci
git add -A
git commit -m "👷 ci: activate strengthened workflows"
git push
```

## What each one does

| File             | Trigger                  | Purpose                                                                                                                                                                                             |
| ---------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pr-checks.yml`  | every PR                 | **Replaces** the existing one. Adds `format:check`, `typecheck`, coverage, `build` and `size` to a job that previously ran only lint and test, plus a separate job gating on production advisories. |
| `size-limit.yml` | PRs into `master`        | **Replaces** the existing one. It was gated on `main` while the default branch is `master`, so it had never run on a single PR.                                                                     |
| `e2e.yml`        | PRs + pushes to `master` | Playwright across desktop and mobile, uploading the HTML report as an artifact.                                                                                                                     |
| `codeql.yml`     | PRs + weekly cron        | GitHub's SAST with the `security-and-quality` query pack.                                                                                                                                           |
| `lighthouse.yml` | every PR                 | Performance, accessibility, best-practices and SEO budgets (see `lighthouserc.json`).                                                                                                               |

## Things worth knowing

- **`pr-checks.yml` and `size-limit.yml` overwrite files that already exist.**
  That is intentional — the diff is the point. Read it before committing if
  you'd rather merge the changes by hand.
- **`lighthouse.yml` reads an optional secret**, `LHCI_GITHUB_APP_TOKEN`. Without
  it the job still runs and still enforces the budgets; it just can't post a
  status check back to the PR.
- **The Lighthouse thresholds are measured, not guessed.** Nine local runs
  (three per page) scored:

  | Page        | Performance | Accessibility | Best practices | SEO |
  | ----------- | ----------- | ------------- | -------------- | --- |
  | `/`         | 54–56       | 100           | 96             | 100 |
  | `/projects` | 98–99       | 100           | 96             | 100 |
  | `/contact`  | 99          | 100           | 96             | 100 |

  `lighthouserc.json` holds inner pages to performance ≥ 90 and every page to
  accessibility and SEO ≥ 95. Home is held to performance ≥ 40: CI runners have
  no GPU, so the WebGL globe and particle canvases render in software and
  block the main thread for tens of seconds. That floor catches regressions;
  it isn't a pass mark, and making Home faster is its own piece of work.
  (JSON can't carry comments, which is why this lives here.)

- **The E2E suite blocks every tracker and Sentry request.** Production builds
  carry real analytics IDs, so without that block each CI run that accepts
  the consent banner would send genuine hits to the live dashboards. Blocked
  requests are still recorded, which is how the consent tests assert that
  nothing was attempted.
