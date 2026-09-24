# 🚀 Developer Portfolio

> Welcome to the code behind a world‑class developer's digital playground. It's fast, minimal, and just cheeky enough to be memorable.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT No Resale](https://img.shields.io/badge/License-MIT_No_Resale-yellow.svg)](./LICENSE)

<!-- Repository Stats -->

[![GitHub stars](https://img.shields.io/github/stars/andresfelipe9619/portfolio?style=flat&color=yellow)](https://github.com/andresfelipe9619/portfolio/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/andresfelipe9619/portfolio?style=flat&color=orange)](https://github.com/andresfelipe9619/portfolio/network/members)
[![Views](https://komarev.com/ghpvc/?username=andresfelipe9619-portfolio&label=views&color=blue&style=flat)](https://github.com/andresfelipe9619/portfolio)

A modern, performant, and highly interactive web application built with a curated stack. This portfolio balances professional engineering with a playful, big-hearted personality.

---

## ✨ Feature Inventory (What the app can actually do)

### Core experience

- **Hero with smart intro behavior**: Plays the animated hero sequence once, then skips it on future visits in the same session using `sessionStorage`.
- **Optional cinematic loading terminal**: Shows a fake-but-delightful boot sequence (network, TLS, i18n, render metrics, geo lookup) with a skip button, controlled by `VITE_LOADING_SCREEN_ENABLED`.
- **Fast route transitions**: Page-level code splitting with React `lazy` + `Suspense` for better initial load and smoother route hops.
- **Draggable “file explorer” overlay**: A movable and resizable mini explorer panel that can be toggled from the header.
- **Keyboard shortcut support**: `Cmd/Ctrl + E` opens/closes the explorer.

### Internationalization & localization

- **Fully localized UI** via `react-i18next` + `i18next`.
- **4 languages out of the box**: English, Spanish, French, German.
- **Language auto-detection + persistence**: Detects language from `?lng=` links, cookies, localStorage and the browser (a `de-DE` browser gets German), and caches the choice in cookie + localStorage.
- **Lazy dictionaries**: only English ships in the main bundle; the others arrive as small chunks the first time they're needed, and the page waits for them rather than flashing the wrong language.
- **Animated language selector with audio cues** per language.

### Easter eggs & playful interactions

- **Time-based easter eggs**: Shows toasts when users “linger” on pages like `/projects` and `/oss`.
- **Suspicious-path easter egg**: Visiting paths like `/admin`, `/.env`, `/wp-admin`, etc. triggers a funny security toast.
- **DevTools-shortcut easter egg**: Detects F12 and common inspect shortcuts and responds with a playful toast.
- **Completion easter egg for language nerds**: Selecting all supported languages in one session unlocks a hidden toast.
- **Joke modal trigger** from the hero “Explore Universe” CTA.
- **“Virus scan” resume flow**: Fake scan dialog before download, with progress + comic “threat names.”
- **Confetti-powered navigation**: “Let’s Talk” interaction fires confetti and then redirects to contact.

### AI & MCP compatibility

- **WebMCP support** when `navigator.modelContext` is available.
- **Registered MCP tools in-browser**:
  - `navigate_to_page(path)`
  - `get_contact_info()`
- **LLM discoverability document** at `public/llms.txt` describing routes and available model tools.

### SEO, discoverability, and social metadata

- **Site-wide social card** in `index.html`: Open Graph and Twitter tags, plus keywords and author. Social crawlers don't run JavaScript, so this is the card every shared link shows.
- **Structured data (JSON-LD)** using `schema.org/Person`.
- **Sitemap + robots** in `public/sitemap.xml` and `public/robots.txt`.
- **Per-page metadata** via a shared `<Seo>` component — every route renders its
  own localized title, description and canonical (or `noindex`). `index.html`
  deliberately ships none of these: under React 19 a static default sits next
  to the page's own tag instead of being replaced by it.
- **Generated sitemap**: `npm run sitemap` runs as part of the build from one list
  of indexable routes. `noindex` pages like `/blog` are left out on purpose, and
  the output is deterministic, so a build never dirties the working tree.
- **Custom 404** on a catch-all route, so unknown URLs stop returning a blank
  page behind an HTTP 200.
- **`<html lang>` follows the language the text is actually in** — including
  staying on English if a dictionary download fails.
- **PWA-style manifest wiring** through `public/manifest.json`.

### Analytics, observability, and error handling

- **Consent-gated by default**: GA4, Vercel Analytics, Microsoft Clarity and Sentry
  Session Replay all wait for an explicit yes, and start the moment it's given —
  no reload needed. Decline and the site behaves identically.
- **Google Analytics 4** and **Microsoft Clarity**, both loaded from modules (no
  inline scripts). Their production IDs live in the committed `.env.production`,
  which only `vite build` reads — so local development never pollutes
  production dashboards.
- **Sentry instrumentation** with router tracing for everyone (no PII, no
  cookies), and session replay — fully masked — only after consent.
- **Global React error hooks** wired into root `createRoot` (`onUncaughtError`, `onCaughtError`, `onRecoverableError`).
- **Custom Sentry Error Boundary UI** with user-triggered report dialog fallback.
- **Sentry test route** (`/test-error`) available in development only.

### Content & interaction modules

- **Timeline-driven project/case-study system** using structured data + flattening logic.
- **Project detail modal** opened from testimonial interactions.
- **Open Source section** grouped by category with animated cards.
- **Contact form flow** with async submit, status feedback, and analytics events.
- **Reusable “magic” visual system** (particles, globe, blur fades, typing animation, highlights, dock UI, etc.).
- **Theme system** with persisted preference (`light` / `dark` / `system`).

### Quality and performance guardrails

This is the part that's easy to claim and harder to keep true, so here's the
bar as it actually stands. Every number below was measured, and every gate has
been checked in both directions — it passes today, and it fails when broken.

| Gate                 | Enforced by                            | Current                        |
| -------------------- | -------------------------------------- | ------------------------------ |
| TypeScript `strict`  | `npm run typecheck`                    | ✅ zero errors                 |
| ESLint               | `npm run lint`                         | ✅ zero warnings               |
| Named suppressions   | `eslint-comments/no-unlimited-disable` | ✅ bare disables rejected      |
| Prettier             | `npm run format:check`                 | ✅ clean                       |
| Unit tests           | `npm run test:coverage`                | 174 tests                      |
| Coverage ratchet     | vitest `thresholds`                    | 34% overall, 58% first-party   |
| End-to-end           | `npm run test:e2e` (Playwright)        | 56 (28 each, desktop + mobile) |
| Critical-path JS     | `npm run size`                         | 266 kB / 280 kB (brotli)       |
| Prod vulnerabilities | `npm audit --omit=dev`                 | ✅ zero                        |
| SAST                 | CodeQL (`security-and-quality`)        | every PR + weekly              |
| Page quality         | Lighthouse CI                          | SEO & a11y 100 on all pages    |

> ⚠️ **The CI half of this isn't switched on yet.** Every command above runs
> locally today. The GitHub workflows that run them on each PR are parked in
> [`docs/ci/`](docs/ci/) until someone with `workflow` push rights moves them
> into `.github/workflows/` — it's a three-line job, see
> [`docs/ci/README.md`](docs/ci/README.md).

A few notes on honesty:

- **Coverage.** The headline is dragged down by `src/components/magicui/` —
  vendored canvas/WebGL components that jsdom can't meaningfully execute.
  Those are covered by Playwright, where a real browser runs them. The
  threshold is a **ratchet**: set to what the suite achieves, and it only
  goes up.
- **Critical path.** 266 kB is every script `index.html` loads before first
  render — measured straight from the built HTML, not guessed from chunk
  names. It's heavy (Sentry and motion are most of it). The budget exists so
  it can't quietly get heavier; slimming it is a project of its own.
- **Home page performance.** The inner pages score 98–99 on Lighthouse. Home
  scores around 55 on CI runners, because they have no GPU and the WebGL
  globe and particle canvases render in software. Its budget is a floor to
  catch regressions, not a pass mark.

- **Security headers** (HSTS, nosniff, frame-deny, Referrer-Policy,
  Permissions-Policy) plus a Report-Only CSP with no `'unsafe-inline'` for
  scripts, all served from `vercel.json`. Violations are reported to Sentry.
- **Source maps stay private** — uploaded to Sentry for symbolication, then
  deleted rather than served.
- **Measurement waits for consent.** Google Analytics, Clarity, Vercel
  Analytics and Sentry Session Replay start only after a visitor says yes, and
  declining costs them nothing. Sentry error reports run for everyone: no
  PII, no cookies, and they're how we find out something broke.

For a deep dive into the underlying systems, check out [ARCHITECTURE.md](ARCHITECTURE.md).

## 🤖 For AI Agents

This project embraces AI collaboration! If you are an AI assistant (Cursor, Windsurf, Copilot, etc.), please read:

- [AGENTS.md](AGENTS.md) - For our tone of voice, personality guidelines, and how to contribute without sounding like a robot.
- [ARCHITECTURE.md](ARCHITECTURE.md) - For the technical layout, routing, and data flow.

## 🚀 Getting Started

Clone the repository and jump right in:

```bash
# Node version is pinned in .nvmrc
nvm use

# Install dependencies
npm install

# Copy the env template — everything in it is optional
cp .env.example .env

# Start the development server
npm run dev

# Check code quality & formatting
npm run lint
npm run format:check

# Typecheck (strict mode, no escape hatches)
npm run typecheck

# Run tests (keep the jokes bug-free)
npm test

# Run tests with coverage report
npm run test:coverage

# Drive a real browser through the whole thing
npm run test:e2e

# Create a production build
npm run build

# Preview the build locally
npm run preview

# Check the bundle against its budget
npm run size
```

> **Heads up:** none of the env vars are required. Leave them blank and the
> site runs identically, just without analytics — which is also what every
> visitor gets until they accept the consent banner.

## 📝 Committing Code (The Andrés Way)

This project strictly enforces **[Gitmoji](https://gitmoji.dev/)** for all commit messages. This is a signature style choice.

- Always prefix commits with the appropriate emoji + type.
- Example: `✨ feat: Add new magical component` or `🐛 fix: Resolve responsive layout issue`.
- If a commit lacks a Gitmoji, it lacks soul.

## 📁 Project Structure

```text
src/
├─ assets/          # Static assets, images, and logos
├─ components/      # UI building blocks
│  ├─ magicui/      # The "wow" factor (animations, interactive parts)
│  └─ ui/           # Standard, accessible shadcn/ui components
├─ data/            # The "brain": resume info, large project details, configs
├─ hooks/           # Reusable custom React hooks
├─ lib/             # Utility functions and library wrappers
├─ locales/         # i18n JSON translation dictionaries (en, es, fr, de)
├─ pages/           # Route-level components (Home, etc.)
└─ sections/        # Large, reusable page sections (Hero, About, etc.)
```

## 📝 License

MIT No Resale License. Hack away, deploy for clients, just don't hawk this code or its carbon-copy parts for direct resale. See [LICENSE](LICENSE) for the fine print.
