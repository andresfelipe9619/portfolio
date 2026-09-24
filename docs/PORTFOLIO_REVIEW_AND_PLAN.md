# Portfolio Review & Level-Up Plan

> **Status: all four phases implemented, then reviewed and corrected.** This
> document is kept as the record of what was found and why it mattered. Every
> finding below has been fixed on this branch unless explicitly marked
> otherwise — see [What changed](#9-what-changed) for the before/after, and
> [§10](#10-second-review-round) for what an independent code review of the
> first pass caught.

**Date:** 2026-09-22
**Commit reviewed:** `6250cbd` (master)
**Scope:** professionalism, security & privacy, testing, and the engineering signals a
technical reviewer reads off this repo.

---

## 0. TL;DR

The portfolio is genuinely impressive on the surface — React 19, Vite 7, Tailwind 4,
i18n in four languages, Sentry, WebMCP, nice CI scaffolding, Dependabot, Husky. The
foundations are real and the toolchain is green: `lint`, `tsc -b`, `format:check`,
`test`, and `build` all pass from a clean `npm ci`.

The problem is that **several of those signals are decorative rather than load-bearing**.
TypeScript runs with `strict: false`. The bundle-size gate never executes. Coverage is
21% and the one meaningful test asserts a bug as correct behaviour. Session Replay
records every keystroke of the contact form unmasked. There are zero security headers.

None of this is hard to fix. This document is the audit and the plan to fix it.

| Area                   | Grade | One-line verdict                                                       |
| ---------------------- | :---: | ---------------------------------------------------------------------- |
| Security & Privacy     |  D+   | No headers, unmasked session replay + PII on, public source maps       |
| Testing & Verification |   D   | 8 tests, 21% coverage, no thresholds, a test that locks in a bug       |
| Engineering Rigour     |  C−   | `strict: false` while the docs claim "strictly typed"; dead size gate  |
| Correctness            |   C   | Unchecked `fetch`, no 404 route, `lang` never updates, debug `console` |
| Performance            |  B−   | 952 kB main chunk (314 kB gzip); all 4 locales eager-loaded            |
| SEO & Accessibility    |  C+   | Good base meta; no per-page meta, soft 404s, stale `lang` attribute    |
| Docs & Presentation    |   B   | Excellent READMEs; license badge contradicts the actual LICENSE        |

---

## 1. Measured baseline

Everything below was executed against this commit, not estimated.

```
npm ci                 → clean install, exit 0
npm run lint           → exit 0, no warnings
npx tsc -b --force     → exit 0
npm run format:check   → exit 0, all files match Prettier
npm test               → exit 0 — 6 files, 8 tests
npm run test:coverage  → 21.15% stmts · 20.85% branch · 24.73% funcs · 21.33% lines
npm run build          → exit 0 in 10.1s — dist = 8.4 MB
npm run size           → 326.34 kB brotli vs 500 kB budget (PASS)
npm audit              → 18 vulns: 1 critical, 12 high, 3 moderate, 2 low
npm audit --omit=dev   → 2 high (react-router, react-router-dom) — fix available
```

Two numbers deserve emphasis:

- **`dist/assets/index-*.js` is 952.78 kB raw / 313.60 kB gzipped.** Vite prints its own
  "chunks are larger than 500 kB" warning on every build. Pages are lazily loaded, but
  the shared vendor chunk is not split further.
- **Coverage is measured on a deliberately narrow denominator.** `vite.config.ts:33`
  limits coverage `include` to `src/pages/**/*.tsx` and `src/components/**/*.tsx`, so
  `src/hooks/`, `src/lib/` (including `ga.ts`, `i18n.ts`, `utils.ts`) and `src/data/` are
  invisible to the report. True coverage of the codebase is meaningfully below 21%.

---

## 2. Analyst reports

Four passes over the same codebase, each with a different question in mind.

---

### 2.1 Security & Privacy Analyst

> _Question: if a stranger loads this site, what do I take from them, and what could
> someone take from me?_

#### S1 — Session Replay records the contact form in clear text · **HIGH**

`src/instrument.ts:14-28`

```ts
sendDefaultPii: true,
integrations: [
  Sentry.replayIntegration({
    maskAllText: false,
    blockAllMedia: false,
  }),
],
```

Sentry Session Replay is enabled with **all text masking turned off** and
`sendDefaultPii: true`, at `replaysOnErrorSampleRate: 1.0`. The site has a contact form
(`src/pages/Contact.tsx`) collecting name, email, subject and free-text message. Any
error during or after a form interaction ships a pixel-accurate recording of everything
the visitor typed, plus their IP, to a third-party processor.

The site ships German and French locales and is therefore squarely addressing EU
visitors. This is a GDPR exposure, not just a style problem.

**Fix:** `maskAllText: true`, `blockAllMedia: true`, `sendDefaultPii: false`. If you want
replay fidelity on non-sensitive UI, opt specific elements in with `data-sentry-unmask`
rather than opting the whole document out of masking.

#### S2 — No security headers at all · **HIGH**

`vercel.json` contains only a rewrite rule. The deployed site sends no
`Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options`, or `Strict-Transport-Security`.

For a portfolio whose loading screen jokes that security is _"basically Fort Knox with
emojis"_, a reviewer running `curl -I` sees nothing. This is the single cheapest
credibility win available — it is a config block, not code.

There is a wrinkle worth planning for: `index.html:74-88` inlines the Microsoft Clarity
bootstrap script, so a strict CSP needs either a hash/nonce for that block or the script
moved into a module. Plan for the latter.

#### S3 — Full source maps published to production · **HIGH (disclosure)**

`vite.config.ts:8-10` sets `sourcemap: true`, and `dist/` confirms the maps ship:
`dist/assets/index-*.js.map` alone is **4.70 MB**. The entire original TypeScript source,
comments included, is downloadable from the live site. `dist` is 8.4 MB, the majority of
which is maps.

Because `@sentry/vite-plugin` is already wired up, the correct configuration is
`sourcemap: 'hidden'` plus `sourcemaps.filesToDeleteAfterUpload` — Sentry keeps full
symbolication, the public site stops serving the source.

#### S4 — Web3Forms access key hardcoded in the client bundle · **MEDIUM**

`src/pages/Contact.tsx:56`

```ts
fd.append('access_key', 'ce6a6db2-b865-4b4b-8f6c-c11ccb4481bf');
```

Web3Forms access keys are public by design, so this is not a credential leak — but it is
an **unauthenticated, unthrottled path into your inbox**, committed to a public repo. Any
scraper can `curl` that key in a loop.

**Fix:** move it to `VITE_WEB3FORMS_KEY`, add the honeypot field Web3Forms supports
(`botcheck`), and enable their captcha. Low effort, removes the abuse vector.

#### S5 — Analytics fire before any consent · **MEDIUM**

Four trackers initialise unconditionally on first paint: Microsoft Clarity
(`index.html:74`), Google Analytics (`src/main.tsx:13`), Vercel Analytics
(`src/main.tsx:22`), and Sentry with replay + PII. No consent gate, no cookie notice, no
opt-out — while explicitly serving `de` and `fr` locales.

#### S6 — `REACT_APP_` prefix means the GA override never works · **MEDIUM**

`src/lib/ga.ts:3-4`

```ts
const GA_TRACKING_ID =
  import.meta.env.REACT_APP_GA_TRACKING_ID || 'G-1K72061LE9';
```

Vite only exposes variables prefixed `VITE_` (the default `envPrefix`, unchanged in
`vite.config.ts`). `REACT_APP_GA_TRACKING_ID` is **always `undefined`** — a leftover from
Create React App. The hardcoded fallback is the only ID that has ever been used, and the
env override is silently dead. Anyone forking this repo ships analytics to your property.

The same class of bug is one line from biting again: `index.html:74` comments the Clarity
block _"Loads only if set"_, but the ID `vkvf3nb96r` is hardcoded inline and always loads.

#### S7 — `/test-error` is routed in production · **LOW**

`src/App.tsx:78` registers `/test-error`, rendering a "Break the world" button
(`src/pages/TestError.tsx`). Harmless, but it is a public debug surface that burns Sentry
quota whenever someone finds it. Gate it behind `import.meta.env.DEV`.

#### S8 — Dependency vulnerabilities · **MEDIUM (prod) / LOW (dev)**

18 advisories total. The honest split:

- **Production (2, both high):** `react-router` / `react-router-dom` 7.13.1. Most of the
  advisories are SSR/RSC-specific and don't apply to this SPA, but the **open redirect
  via backslash in `<Link>` / `useNavigate`** does apply to client-side routing.
  `fixAvailable: true` — this is a version bump.
- **Dev-only (16, incl. 1 critical):** `vitest`, `vite`, `esbuild`, `postcss`, `rollup`,
  `undici`, `js-yaml`, `brace-expansion` and friends. These do not ship to users, but
  they do execute on your machine and in CI, and "critical" in a screenshot reads badly.

There is **no `npm audit` step in CI**, so this count drifts upward unobserved.

---

### 2.2 Testing & Verification Analyst

> _Question: if I break something, what catches it?_

#### T1 — The suite is 8 tests and cannot catch a regression · **HIGH**

Six files, eight tests, 21.15% statements. Coverage is zero on everything that would
actually hurt if it broke:

| Module                               |   Coverage   |
| ------------------------------------ | :----------: |
| `src/components/error-boundary.tsx`  |      0%      |
| `src/components/theme-provider.tsx`  |      0%      |
| `src/components/loading-screen.tsx`  |      0%      |
| `src/components/ui/navbar/*` (all 5) |      0%      |
| `src/hooks/**`, `src/lib/**`         | not measured |

The error boundary — the component whose entire job is to run when everything else
fails — has never been executed by a test.

#### T2 — `Contact.test.tsx` asserts a bug as correct behaviour · **HIGH**

This is the most important finding in this section, because it shows the suite actively
working against you.

`src/pages/Contact.tsx:58-71`:

```ts
const response = await fetch('https://api.web3forms.com/submit', { ... });
const data = await response.json();
console.log(data);

toast(t('contact.successTitle'), { ... });   // ← always fires
logEvent('Contact Form', 'Submit', 'Success');
setFormData({ name: '', email: '', subject: '', message: '' });
```

`response.ok` is never checked. `fetch` only rejects on network failure, so a 400, 429 or
500 from Web3Forms takes the happy path: the visitor is told "message sent", the form is
cleared, their message is gone, and GA logs a success. **You would never learn that
someone tried to reach you.** For a portfolio, the contact form is the conversion event —
this is the highest-value correctness bug in the repo.

Now the test, `src/pages/__tests__/Contact.test.tsx:62-65`:

```ts
const fetchMock = vi.fn().mockResolvedValue({
  json: vi.fn().mockResolvedValue({ success: true }),
});
```

The mock has **no `ok` property**. The test passes precisely because the code ignores it.
Fixing `Contact.tsx` correctly would not be caught by this test, and the test as written
will keep vouching for the broken version. It needs a sibling test asserting that
`{ ok: false, status: 500 }` surfaces the error toast and **preserves the user's draft**.

#### T3 — No coverage thresholds · **MEDIUM**

`vite.config.ts:29-35` configures reporters but no `thresholds`. Coverage can fall to 0%
and CI stays green. A ratchet is worth more than a number: set the floor at today's
value, raise it as tests land.

#### T4 — CI runs lint and test only · **HIGH**

`.github/workflows/pr-checks.yml` runs `npm run lint` and `npm test`. It does **not** run:

- `tsc -b` — type errors reach `master` and only surface at deploy time
- `npm run build` — a broken build is not caught by PR checks
- `npm run format:check` — enforced by the Husky hook, which `--no-verify` skips
- `npm audit` — no visibility on the 18 advisories above

#### T5 — The bundle-size gate has never run · **MEDIUM**

`.github/workflows/size-limit.yml:3-6`:

```yaml
on:
  pull_request:
    branches:
      - main
```

`branches:` filters on the **base** branch. This repository's default branch is `master`,
and all five currently-open PRs (#59–#63) target `master`. **This workflow has never
executed on a single pull request.** One word.

Worth fixing the budget shape at the same time: `size-limit` currently globs
`dist/assets/*.js` into one entry, so it sums the main chunk with every lazy chunk and
reports a single 326 kB figure against a 500 kB budget. A doubling of the critical-path
bundle could hide inside that headroom. Split the budget: one entry for `index-*.js`, one
for the rest.

#### T6 — No end-to-end or visual coverage · **MEDIUM**

Everything here is jsdom. Nothing exercises a real browser, which means the parts this
portfolio is actually _about_ — the globe, particles, the terminal boot sequence, the
draggable explorer, route transitions — are verified by nobody. The repo already has
Playwright-friendly infrastructure available; a handful of smoke tests across the six
routes would catch the class of bug that embarrasses you in front of a recruiter.

---

### 2.3 Engineering Rigour Analyst

> _Question: what does this repo say about how its author works?_

#### E1 — `strict: false`, while the docs advertise strict typing · **HIGH**

`tsconfig.app.json:22-23`:

```jsonc
"strict": false,
"noImplicitAny": false,
```

And in `eslint.config.js:39`:

```js
'@typescript-eslint/no-explicit-any': 'off',
```

Against `.cursorrules`, which instructs collaborators to keep the code _"strictly typed
(TypeScript 5.8)"_, and `AGENTS.md`, which says _"We like our types strong, just like our
coffee."_

TypeScript is running in its weakest configuration. No `strictNullChecks`, so every
`.map()`, every optional field, every `useRef` is unguarded at the type level. The
consequences are already visible — `src/components/joke-dialog.tsx:9` and
`src/components/virus-scan-dialog.tsx:14` both destructure props with **no type
annotation at all**, which `noImplicitAny: false` waves through:

```tsx
const FunnyVirusScanDialog = ({ open, onOpenChange }) => {
```

This matters more than the average finding because of the audience. A senior reviewer
opening `tsconfig.json` on a portfolio that markets itself on type discipline will read
this as the whole story. Turning strict on is the single highest-signal change in this
document.

Expect real work: enabling `strict` will surface errors across a 104-file codebase. The
plan below sequences it file-by-file rather than as one heroic commit.

#### E2 — Blanket `eslint-disable-next-line` comments · **MEDIUM**

Roughly 15 occurrences of bare `// eslint-disable-next-line` with **no rule name**
(`particles.tsx:129,134,139`, `file-tree.tsx:137,361,366,374`, `terminal.tsx:177`,
`dot-pattern.tsx:66,68`, `timeline-roulette.tsx:40`, `scratch-to-reveal.tsx:91`, …). Each
one disables _every_ rule on that line, including rules that don't exist yet. Most are
suppressing `react-hooks/exhaustive-deps`; they should say so.

Related: `eslint.config.js:40-45` globally disables five `react-hooks` rules
(`immutability`, `purity`, `preserve-manual-memoization`, `set-state-in-effect`, `refs`).
That is a lot of React correctness checking switched off at the config level.

#### E3 — Debug logging shipped to production · **MEDIUM**

`src/pages/Home.tsx:80-90`:

```ts
useEffect(() => {
  console.log(
    'Flattened items available to ProjectDialog trigger (Home):',
    items.filter(
      (i) =>
        i.title.toLowerCase().includes('benekiva') ||
        i.client?.toLowerCase().includes('benekiva'),
    ),
  );
}, [items]);
```

Left-over debugging that runs on every Home render in production, hunting for one
specific client name. Also `Contact.tsx:64` (`console.log(data)` — the raw form response)
and `file-tree.tsx:370`.

The audience problem is specific: this portfolio _invites_ developers to open DevTools —
it has an easter egg that fires on F12 (`src/hooks/use-easter-egg.ts:66-72`). The first
thing they see in the console is forgotten debug output. Add `no-console` to ESLint with
an allowlist for `warn`/`error`.

#### E4 — Two contradictory `manifest.json` files · **MEDIUM**

- `public/manifest.json` — served at `/manifest.json`, uses `favicon.svg`,
  `theme_color: #000000`
- `manifest.json` (repo root) — **not served by Vite**, references
  `/icons/icon-192x192.png`, `/icons/icon-512x512.png`, `/icons/maskable-icon.png`, and
  `theme_color: #0ea5e9`

`public/icons/` does not exist. The root file is dead config whose icons 404 if anyone
ever wires it up, and the two disagree on name, description and theme colour. Delete the
root copy; if you want a real PWA install experience, generate the PNG icon set.

#### E5 — License badge contradicts the license · **MEDIUM**

`README.md:9` renders a **"License: MIT"** badge linking to `opensource.org/licenses/MIT`.
`LICENSE` is titled **"MIT No Resale License"** — MIT with an added restriction.
`package.json:5` says `"SEE LICENSE IN LICENSE"`.

Three sources, two stories. Someone could reasonably fork this believing it is MIT. Fix
the badge to say "Custom" or "MIT No Resale" and point it at the actual file.

#### E6 — No environment or runtime documentation · **LOW**

The build reads `VITE_LOADING_SCREEN_ENABLED`, `VITE_UNDER_CONSTRUCTION_ENABLED`,
`SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` (and should read a GA ID and a
Web3Forms key). There is **no `.env.example`**, so a fresh clone cannot discover any of
this. There is also no `.nvmrc` and no `engines` field, while CI pins Node 20 — and
`eslint@10` requires `^20.19 || ^22.13 || >=24`. Silent local/CI drift waiting to happen.

#### E7 — `coverage/` is not gitignored, and it breaks your own commit hook · **MEDIUM**

Reproducible in two commands:

```
npm run test:coverage   # writes the v8 HTML report into ./coverage
git commit              # husky runs format:check → fails on 78 generated files
```

`.gitignore` lists `dist` but not `coverage`, so the HTML report lands as untracked
working-tree noise. Prettier then walks it and reports **78 style violations in vendored
report assets** (`coverage/prettify.js`, `coverage/sorter.js`, …). Because
`.husky/pre-commit` runs `npm run format:check`, the developer who measures coverage is
immediately blocked from committing — and the obvious escape hatch is `--no-verify`,
which skips lint too.

This is a small thing with an outsized effect: it quietly trains you away from running
the coverage command, which is exactly the command this codebase needs run more often.

_Fixed in this branch_ — `coverage` added to `.gitignore`. Worth also scoping
`format:check` to source directories so generated output can never gate a commit again.

---

### 2.4 Performance, SEO & Accessibility Analyst

> _Question: what does a first-time visitor — human or crawler — actually get?_

#### P1 — 952 kB main chunk · **MEDIUM**

`dist/assets/index-*.js` — 952.78 kB raw, 313.60 kB gzipped, with Vite's own size warning
on every build. Route-level code splitting is already in place and working (the lazy page
chunks are all 1–20 kB), so the weight is entirely in the shared vendor chunk: Sentry
(replay is ~80 kB of it alone), `motion`, `cobe`, i18next, Radix.

Cheapest real win: `src/lib/i18n.ts:5-8` imports **all four locale JSON files eagerly**,
so every visitor downloads English, Spanish, French _and_ German. Lazy-load the three they
aren't using. After that, `manualChunks` to split vendor, and consider
`Sentry.lazyLoadIntegration` for replay.

#### P2 — No catch-all route: every unknown URL is a soft 404 · **MEDIUM**

`src/App.tsx:71-79` declares seven routes and **no `path="*"`**. Combined with the SPA
rewrite in `vercel.json`, `/anything-else` returns **HTTP 200** with a header and an empty
page. Crawlers index the blanks; visitors get nothing and no way back.

This one has a bit of bite: `src/hooks/use-easter-egg.ts:44` watches for `/admin`,
`/wp-admin`, `/.env` and fires a witty "nice try" toast — but it fires it onto a blank
page, because no route matches. The joke currently doesn't land.

#### P3 — `<html lang>` never changes · **MEDIUM (a11y + SEO)**

`index.html:2` hardcodes `<html lang="en">`. `document.documentElement` is touched exactly
once in the codebase — `theme-provider.tsx:34`, for the theme class. Nothing subscribes to
`i18n.on('languageChanged')`.

So when a visitor switches to German, the DOM still claims English. Screen readers
pronounce German text with an English voice — the kind of failure that is invisible to
you and immediately disqualifying to anyone auditing accessibility. Search engines read
the same wrong signal.

#### P4 — Per-page metadata missing on four of six routes · **MEDIUM**

`react-helmet-async` is installed and wired up in `main.tsx`, but only
`src/pages/Blog.tsx:13` and `src/pages/CaseStudy.tsx:35` use it. Home, Projects, Contact
and OpenSource all inherit the static `<title>` and description from `index.html`, so four
URLs share one title and one description in search results.

`public/sitemap.xml` also carries hardcoded `lastmod` dates of `2026-02-27`.

> _Correction:_ an earlier version of this paragraph also called the missing
> `/blog` entry "drift". It wasn't — `/blog` renders `noindex`, so leaving it
> out was right, and adding it was a mistake the second review caught (§10).

#### P5 — Thin accessibility instrumentation · **MEDIUM**

Across 104 source files there are **19** total `aria-*` / `role=` attributes and 5
`sr-only` labels, against 39 `onClick` handlers. No automated a11y check runs anywhere.
The repo already ships an `accessibility` skill under `.agents/skills/` — it has simply
never been pointed at the code.

`src/hooks/use-easter-egg.ts:19` is also worth a second look: it raises toasts with
`duration: Number.POSITIVE_INFINITY`, dismissible only by clicking "Close" — a permanent
focus-trap-adjacent element for keyboard users.

---

## 3. Consolidated findings

Ranked by (impact on a technical reviewer's judgment) × (impact on real users) ÷ effort.

| #   | Finding                                              | Sev  | Effort | Where                                      |
| --- | ---------------------------------------------------- | :--: | :----: | ------------------------------------------ |
| S1  | Session Replay unmasked + PII on                     | High |   S    | `src/instrument.ts:14-28`                  |
| S2  | Zero security headers                                | High |   S    | `vercel.json`                              |
| S3  | Source maps public (4.7 MB)                          | High |   S    | `vite.config.ts:8-10`                      |
| T2  | Contact form ignores `response.ok`; test locks it in | High |   S    | `Contact.tsx:58-71`, `Contact.test.tsx:62` |
| T4  | CI missing typecheck / build / format / audit        | High |   S    | `.github/workflows/pr-checks.yml`          |
| E1  | `strict: false` vs "strictly typed" docs             | High |   L    | `tsconfig.app.json:22-23`                  |
| T1  | 21% coverage; error boundary at 0%                   | High |   L    | suite-wide                                 |
| T5  | size-limit gated on `main`, repo uses `master`       | Med  |   XS   | `size-limit.yml:6`                         |
| S6  | `REACT_APP_` prefix — GA override dead               | Med  |   XS   | `src/lib/ga.ts:3-4`                        |
| E3  | Debug `console.log` in production                    | Med  |   XS   | `Home.tsx:80`, `Contact.tsx:64`            |
| E5  | License badge contradicts LICENSE                    | Med  |   XS   | `README.md:9`                              |
| E7  | `coverage/` unignored → pre-commit hook fails        | Med  |   XS   | `.gitignore` _(fixed here)_                |
| P2  | No catch-all route → soft 404s                       | Med  |   S    | `src/App.tsx:71-79`                        |
| P3  | `<html lang>` never updates                          | Med  |   S    | `index.html:2`, i18n                       |
| S4  | Web3Forms key in bundle, no bot protection           | Med  |   S    | `Contact.tsx:56`                           |
| S5  | Four trackers, no consent gate                       | Med  |   M    | `index.html`, `main.tsx`                   |
| S8  | 2 prod / 16 dev advisories, no CI audit              | Med  |   S    | `package.json`                             |
| E4  | Two conflicting manifests; icons 404                 | Med  |   S    | `manifest.json` ×2                         |
| T3  | No coverage thresholds                               | Med  |   XS   | `vite.config.ts:29-35`                     |
| P4  | No per-page meta on 4 routes                         | Med  |   S    | `src/pages/*`                              |
| P1  | 952 kB main chunk; 4 locales eager                   | Med  |   M    | `vite.config.ts`, `i18n.ts`                |
| T6  | No E2E / visual coverage                             | Med  |   M    | —                                          |
| P5  | Thin a11y instrumentation, no automated check        | Med  |   M    | suite-wide                                 |
| E2  | ~15 blanket eslint-disables; 5 hooks rules off       | Med  |   M    | various                                    |
| E6  | No `.env.example`, `.nvmrc`, `engines`               | Low  |   XS   | repo root                                  |
| S7  | `/test-error` live in production                     | Low  |   XS   | `src/App.tsx:78`                           |

_Effort: XS < 15 min · S ≈ 1 h · M ≈ half a day · L ≈ multi-day_

---

## 4. The plan

Four phases. Each is independently shippable and leaves `master` green. Phases 1 and 2
together are roughly a weekend and move the needle furthest.

---

### Phase 1 — Stop the bleeding (½ day)

_Everything here is small, mechanical, and individually high-value. One PR._

1. **Harden Sentry** — `maskAllText: true`, `blockAllMedia: true`,
   `sendDefaultPii: false`; drop `tracesSampleRate` to `0.2` for a portfolio's volume.
2. **Add security headers** to `vercel.json`: `Strict-Transport-Security`,
   `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`,
   `Permissions-Policy`, `X-Frame-Options: DENY`. Start CSP in `Report-Only`.
3. **Hide source maps** — `sourcemap: 'hidden'` + `sourcemaps.filesToDeleteAfterUpload`
   in the Sentry plugin config. Verify no `.map` files remain in `dist/`.
4. **Fix the contact form** — check `response.ok`, keep the user's draft on failure, show
   the error toast, and log a GA failure event.
5. **Fix the test that certifies the bug** — add `ok: true` to the success mock, then add
   a failure case (`{ ok: false, status: 500 }`) asserting the error toast fires and the
   form is _not_ cleared.
6. **Un-break CI** — `size-limit.yml`: `main` → `master`, and split the budget so
   `index-*.js` has its own entry.
7. **Strengthen `pr-checks.yml`** — add `tsc -b`, `npm run build`, `npm run format:check`,
   and `npm audit --audit-level=high --omit=dev`.
8. **Delete the debug logs** — `Home.tsx:80-90`, `Contact.tsx:64`, `file-tree.tsx:370` —
   and add `no-console` (allow `warn`, `error`) to ESLint so they can't come back.
9. **Fix the GA env var** — `REACT_APP_GA_TRACKING_ID` → `VITE_GA_TRACKING_ID`; move the
   Clarity ID out of the inline script too.
10. **Fix the license badge** in `README.md`.
11. **Gate `/test-error`** behind `import.meta.env.DEV`.
12. **Bump `react-router-dom`** to clear both production advisories.
13. **Scope `format:check`** to source paths (or add a `.prettierignore`) so generated
    output can never block a commit — `coverage/` is already ignored on this branch.

_Acceptance:_ `curl -I` shows every header · no `.map` in `dist` · size-limit posts a
comment on the next PR · a Web3Forms 500 shows an error and keeps the draft ·
`npm audit --omit=dev` is clean.

---

### Phase 2 — Make the quality signals real (2–3 days)

1. **Turn on `strict`.** Not in one commit. Set `"strict": true` and
   `"noImplicitAny": true`, capture the full error list, then work through it in
   themed batches (`src/lib` → `src/hooks` → `src/data` → `src/components/ui` →
   `src/components` → `src/pages`), each its own commit. Type
   `joke-dialog.tsx` and `virus-scan-dialog.tsx` properly on the way through. Re-enable
   `@typescript-eslint/no-explicit-any` as `warn` once it's green.

   _This is the change that makes `.cursorrules` and `AGENTS.md` true. Do it before the
   testing work, so new tests are written against strict types._

2. **Widen coverage measurement** — extend `include` to `src/hooks/**` and `src/lib/**`.
   Expect the reported number to drop; that is the point.

3. **Set a coverage ratchet** — add `thresholds` at the new honest baseline. Raise it
   with each PR that adds tests. Never lower it.

4. **Write the tests that matter**, in this order:
   - `error-boundary.tsx` — currently 0%, and it is the safety net
   - `Contact.tsx` failure paths (from Phase 1) plus validation
   - `src/lib/ga.ts`, `src/lib/i18n.ts`, `src/lib/utils.ts`
   - `src/hooks/use-easter-egg.ts`, `useKeyListener`, `use-web-mcp`
   - `theme-provider.tsx` and the five navbar components

   _Target: 60% on the widened denominator._

5. **Clean up the suppressions** — give every bare `eslint-disable-next-line` an explicit
   rule name, then re-enable the `react-hooks` rules one at a time and fix what they find.

---

### Phase 3 — Polish what visitors and crawlers see (2 days)

1. **Add a real 404 route** — `<Route path="*" element={<NotFound />} />`, on-brand, with
   a route home. The `/admin` easter egg will finally land on a page.
2. **Sync `<html lang>`** — subscribe to `i18n.on('languageChanged')` and set
   `document.documentElement.lang`. Add a test.
3. **Per-page `<Helmet>`** on Home, Projects, Contact, OpenSource — unique title,
   description, canonical, OG image. Generate `sitemap.xml` at build time so `lastmod`
   stops lying, and add `/blog`.
4. **Split the bundle** — lazy-load the three unused locales; add `manualChunks` for
   vendor; evaluate `Sentry.lazyLoadIntegration` for replay. _Target: main chunk under
   250 kB gzipped._ Tighten the size budget to lock the win in.
5. **Accessibility pass** — run the repo's own `.agents/skills/accessibility` skill
   against the code. Focus on the 39 `onClick` handlers, icon-only buttons, focus order in
   the draggable explorer and dialogs, and the infinite-duration toasts.
6. **Resolve the manifest conflict** — delete the root `manifest.json`, generate real PNG
   icons into `public/icons/`, and reconcile `theme_color`.

---

### Phase 4 — Keep it there (1–2 days)

1. **Playwright smoke suite** — all six routes load, contact form submits (mocked),
   language switch works and updates `lang`, theme toggle persists, 404 renders. Add to
   CI.
2. **Lighthouse CI** on every PR, with budgets. The repo already has `core-web-vitals`
   and `web-quality-audit` skills that encode what to check.
3. **CodeQL** — GitHub's SAST, free for public repos, and a visible security tab is
   exactly the signal a reviewer looks for.
4. **Consent gate** for the four trackers — a small banner, analytics deferred until
   accepted. Closes S5 and pairs with the German and French locales.
5. **Dependabot grouping** — group minor/patch bumps into one weekly PR instead of five
   separate ones (#59–#63 are open right now), and enable auto-merge for patch-level
   updates once CI is trustworthy enough to gate on.
6. **`.env.example`, `.nvmrc`, `engines`** — document the contract; align CI's Node 20
   with what your dependencies actually require.
7. **Update the docs** — `README.md`, `AGENTS.md` and `ARCHITECTURE.md` are good, but
   they describe intent rather than state. Once Phase 2 lands they become true; add a
   short "Quality bar" section stating strict TS, the coverage floor, the size budget and
   the required checks.

---

## 5. Definition of done

A PR is mergeable when all of the following are green in CI:

- [ ] `npm run lint` — zero warnings, no unexplained suppressions
- [ ] `npx tsc -b` — strict mode, zero errors
- [ ] `npm run format:check`
- [ ] `npm run test:coverage` — at or above the current threshold
- [ ] `npm run build`
- [ ] `npm run size` — within budget, per-chunk
- [ ] `npm audit --audit-level=high --omit=dev` — clean
- [ ] Playwright smoke suite _(from Phase 4)_
- [ ] Lighthouse budgets _(from Phase 4)_

---

## 6. If you only do three things

1. **Turn on `strict: true`** (E1). It is the claim your own documentation makes, and the
   first file a senior reviewer opens.
2. **Fix the contact form and the test that protects the bug** (T2). It is the one path on
   this site with a business outcome attached, and right now it fails silently.
3. **Phase 1's security block** — headers, replay masking, source maps (S1–S3). Half a
   day, and it changes the answer to "is this person careful?"

---

_Findings verified against `6250cbd` by running the project's own toolchain. Every file
and line reference above was read, and every measurement executed, at review time._

---

## 9. What changed

Measured on the same commands as the baseline in §1, after all four phases.

| Metric                          | Before                  | After                                                  |
| ------------------------------- | ----------------------- | ------------------------------------------------------ |
| TypeScript `strict`             | `false`                 | `true`, zero errors                                    |
| `noImplicitAny`                 | `false`                 | `true`                                                 |
| ESLint warnings                 | 0 errors, `any` allowed | 0 errors, 0 warnings; bare disables rejected           |
| Unit tests                      | 8                       | 174                                                    |
| End-to-end tests                | 0                       | 56 (28 each, desktop + mobile)                         |
| Coverage (all)                  | 21.15%                  | 33.6%, threshold-enforced                              |
| Coverage (first-party)          | not measured            | 57.7%                                                  |
| Coverage denominator            | pages + components      | + hooks + lib                                          |
| Main JS chunk                   | 952.78 kB               | 468 kB                                                 |
| Main JS chunk (gzip)            | 313.60 kB               | 153 kB                                                 |
| Critical-path JS (brotli)       | not measured            | 266 kB, budgeted at 280, measured from `index.html`    |
| Source maps served              | 4.7 MB, public          | none                                                   |
| Security headers                | 0                       | 6 + Report-Only CSP, reporting to Sentry               |
| Production vulnerabilities      | 2 high                  | 0                                                      |
| CI gates on a PR                | lint, test              | format, lint, typecheck, coverage, build, size, audit, |
|                                 |                         | E2E, CodeQL, Lighthouse — _pending activation, below_  |
| Lighthouse SEO / a11y           | not measured            | 100 / 100 on `/`, `/projects`, `/contact`              |
| Routes with own `<title>`       | 2 of 6                  | all, plus 404, localized                               |
| Canonicals per page             | 1 (always home)         | exactly 1, correct — or none on `noindex` pages        |
| Trackers running before consent | 4                       | 0 (Sentry error reports still run: no PII, no cookies) |

### Findings resolved

All 25 findings in §3 are fixed. Highlights, with the reasoning that made them
matter rather than just the change:

- **S1** Session Replay now masks all text, inputs and media, and
  `sendDefaultPii` is off. Error reports no longer carry what a visitor typed
  into the contact form.
- **S2** HSTS, nosniff, frame-deny, Referrer-Policy, Permissions-Policy and COOP,
  plus a Report-Only CSP. Left in Report-Only
  deliberately: a strict CSP on a site with four third-party beacons is easy to
  get wrong, and this could not be verified against the live deployment from
  here. Violations are reported to Sentry's security endpoint — watch those
  for a week, then flip the header to enforcing. (The first version of this
  paragraph said the same, but the policy had no `report-uri`, so there was
  nothing to watch. §10 has the details.)
- **S3** `sourcemap: 'hidden'` plus delete-after-upload. Verified: no `.map`
  files in `dist`, no `sourceMappingURL` in any bundle, and an E2E test that
  keeps it that way.
- **T2** The contact form checks `response.ok` and preserves the draft on
  failure. Covered by four unit tests and two Playwright tests. The original
  mock that certified the bug is fixed.
- **T5** `size-limit` now runs — one word, and the budget is split so a
  regression in the critical path can't hide behind lazy chunks.
- **E1** `strict: true`. Surfaced 11 real errors, including a `useState([])`
  inferred as `never[]` that could never have held the value it was given, and
  two props passed to a component that never accepted them.
- **E7** `coverage/` ignored, plus a `.prettierignore`, so generated output can
  never block a commit again.

### One step left for a human

The five CI workflow files could not be pushed from this session: the token has
no `workflow` scope, so GitHub rejects any push touching `.github/workflows/`.
They are committed to [`docs/ci/`](./ci/) instead, with a three-line activation
command in [`docs/ci/README.md`](./ci/README.md). Until they are moved, the
"CI gates on a PR" row in the table above describes `docs/ci/`, not what is
actually running.

### Deliberately not done

- **60% coverage.** The plan targeted it; the suite reaches 33.6% overall and
  57.7% on first-party code. Closing that gap means writing jsdom tests for
  vendored canvas and WebGL components, which would raise the number without
  raising confidence. Those are covered by Playwright instead. The threshold is
  set to the real figure and ratchets upward.
- **Enforcing CSP.** Shipped in Report-Only for the reason above.
- **PWA icons.** The conflicting root `manifest.json` is deleted and
  `public/manifest.json` is the single source of truth, but the 192/512/maskable
  PNG set still needs generating from the brand mark before install prompts work
  properly. Left alone rather than inventing artwork.
- **A faster Home page.** Lighthouse scores it around 55 on GPU-less machines,
  where the WebGL globe and particle canvases render in software. Its budget
  is a floor that stops it getting worse. The biggest cheap win is the
  portrait: `public/me.jpeg` is 977 KB and 3000 px wide, displayed at 110 px.
  A small avatar export would help every visitor (keep the big one for the
  social card).

---

## 10. Second review round

An independent code review of the first implementation found 15 issues, and
several made claims in this document untrue. All are fixed. Grouped by what
went wrong:

**Claims the branch made but didn't deliver**

| #   | Finding                                                                                 | Fix                                                                                                                             |
| --- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Lazy dictionaries never re-rendered: German visitors got English text under `lang="de"` | Dictionaries load through an i18next backend, so components suspend until they arrive; `<html lang>` follows `resolvedLanguage` |
| 2   | Static canonical in `index.html` plus React 19 hoisting gave every page two canonicals  | `index.html` ships no title/description/canonical; a test keeps it that way                                                     |
| 3   | Session Replay started without consent                                                  | Replay added via `addIntegration` only after a yes                                                                              |
| 4   | Vercel Analytics read consent once, so "accept" did nothing until reload                | `useSyncExternalStore`-backed `useConsent()`                                                                                    |
| 5   | "Every suppression names its rule" wasn't enforced                                      | `eslint-comments/no-unlimited-disable`, verified to reject a bare disable                                                       |
| 6   | Two privacy E2E tests couldn't fail                                                     | Tests read the real JS and record every tracker request; mutation-tested in both directions                                     |

**Functional bugs**

| #   | Finding                                                                      | Fix                                                            |
| --- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 7   | `cp .env.example .env` gave an empty Web3Forms key; `??` kept it             | `\|\|`                                                         |
| 8   | Honeypot sent a constant empty `botcheck`                                    | `FormData` read from the form itself                           |
| 9   | Fast language switches could land out of order; failed downloads were silent | i18next's own ordering guard, plus revert-and-toast on failure |
| 10  | Lighthouse audited the 404 page three times                                  | Real paths; category thresholds measured from 9 runs           |
| 11  | Playwright could miss the preview server on IPv6-first runners               | `--host 127.0.0.1`                                             |
| 12  | Contact rendered every toast twice (predates the branch)                     | Removed the page-level `<Toaster />`                           |

**Conventions and accuracy**

| #   | Finding                                                        | Fix                                            |
| --- | -------------------------------------------------------------- | ---------------------------------------------- |
| 13  | SEO copy was inline English, against AGENTS.md                 | Moved into all four locale files               |
| 14  | `/blog` added to the sitemap despite rendering `noindex`       | Removed; the sitemap is also deterministic now |
| 15  | Critical-path budget measured 146 kB of a 266 kB critical path | Eager set derived from `dist/index.html`       |

Also fixed from the review's notes: the Report-Only CSP had nowhere to report
to; direct `ReactGA` calls bypassed the consent gate; Dependabot's group order
starved the named groups of anything but majors; production analytics IDs had
been removed with no replacement (now in a committed `.env.production`); and
missing hashed assets returned `index.html` with a one-year cache header.

**Found while verifying the fixes.** Proving finding 1 in a real browser
surfaced two language-detection bugs that were already on `master`: the
detector read back `index.html`'s static `lang="en"` and ranked it above a
`de-DE`-only browser (so Safari users in Germany got English), and the query
lookup was spelled `queryString` where the detector expects `querystring`, so
`?lng=` links never worked. Running Lighthouse for real surfaced a heading
that skipped a level on `/contact` and a squashed portrait on Home. All fixed.

## 11. Sentry: a year without an alert

The report: _"It's been like a year and I haven't received any alert."_ Alert
emails from other Sentry projects were arriving fine, so the mail was never the
problem. The errors were going somewhere else.

| #   | Finding                                                                                                                                                                                     | Evidence                                                                                                                                                                                                                                                                                                            | Fix                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | The hardcoded DSN sent every error to project `4509940389707776` on org `o267366`. Source maps, weekly reports and alerts all belong to `andres-suarez-dev/portfolio` (`4510980472438784`). | The Vercel build log uploads maps to `Organization: andres-suarez-dev, Projects: portfolio`. The weekly report lists that org's three projects, and the DSN's isn't one of them. The project IDs decode to creation dates: 31 Aug 2025 for the DSN's, 3 Mar 2026 for `portfolio`, the day Sentry was re-integrated. | DSN moved to `.env.production`. **The value itself still has to be swapped.** See below. |
| 2   | Every crash was reported twice, by the boundary and by `onCaughtError`. Dedupe kept the `onCaughtError` copy, so "Submit Diagnostic Report" filed feedback against the copy it dropped.     | A real browser on `/test-error` sent event `c31e…` and opened the dialog for `63fb…`.                                                                                                                                                                                                                               | `onCaughtError` removed. A test with the real SDK pins it.                               |
| 3   | Boundary crashes defaulted to `handled: true`, which ranks below the "high priority issues" bar of Sentry's default alert. #2's duplicate hid this; fixing #2 alone would have exposed it.  | SDK source: `handled = props.handled ?? !!props.fallback`.                                                                                                                                                                                                                                                          | `handled={false}`.                                                                       |
| 4   | CSP `script-src` blocked the feedback dialog, which loads its script from the DSN's host. Enforcing the CSP would have broken it.                                                           | `showReportDialog` injects `https://<dsn host>/api/embed/error-page/`.                                                                                                                                                                                                                                              | Host allowed. A test keeps `vercel.json` in step with the DSN.                           |
| 5   | Every build reported itself as `production`: previews, laptops, CI and Lighthouse runs alike.                                                                                               | `environment: import.meta.env.MODE`.                                                                                                                                                                                                                                                                                | `production` / `preview` from Vercel, `local` everywhere else.                           |
| 6   | There was no way to test the pipeline end to end without shipping a crash button to production.                                                                                             | `/test-error` was dev-only (S7).                                                                                                                                                                                                                                                                                    | Also available on Vercel preview deploys.                                                |

Verified on a production build configured like a preview deploy: one event per
crash, `handled: false`, `environment: preview`, release set to the commit, and
the dialog opened for the event that was sent.

### Still for a human

Three things only the Sentry dashboard can do:

1. **Swap the DSN.** Copy it from Sentry → Settings → Projects → `portfolio` →
   Client Keys (DSN). Put it in `.env.production`, then update the Sentry host
   and report endpoint in `vercel.json`. If they disagree,
   `src/__tests__/sentry-config.test.ts` fails and prints the expected values.
2. **Check there's an alert rule.** Alerts → Alert Rules, filtered to
   `portfolio`. A site this quiet can afford "A new issue is created → email
   me", which is also the rule that makes the next step prove something.
3. **Break something on purpose.** Open `/test-error` on the PR's preview
   deploy and press the button. Within a minute or two you should see an issue
   in `portfolio` tagged `environment:preview`, and an email about it.
