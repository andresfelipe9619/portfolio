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
- **Language auto-detection + persistence**: Detects language from querystring/cookies/localStorage/browser and caches selection in cookie + localStorage.
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

- **Rich base metadata** in `index.html`: title, description, keywords, author, canonical, Open Graph, and Twitter card tags.
- **Structured data (JSON-LD)** using `schema.org/Person`.
- **Sitemap + robots** in `public/sitemap.xml` and `public/robots.txt`.
- **Per-page metadata** via a shared `<Seo>` component — every route has its own
  title, description, canonical and social card rather than inheriting one.
- **Generated sitemap**: `npm run sitemap` runs as part of the build, so `lastmod`
  is always true and a new route can't be forgotten.
- **Custom 404** on a catch-all route, so unknown URLs stop returning a blank
  page behind an HTTP 200.
- **`<html lang>` follows the active language**, which matters when four of them ship.
- **PWA-style manifest wiring** through `public/manifest.json`.

### Analytics, observability, and error handling

- **Consent-gated by default**: GA4, Vercel Analytics and Microsoft Clarity all
  wait for an explicit yes. Decline and the site behaves identically.
- **Google Analytics 4** pageview/event helpers, inert unless `VITE_GA_TRACKING_ID` is set.
- **Microsoft Clarity** loaded from a module (not an inline script), inert unless `VITE_CLARITY_PROJECT_ID` is set.
- **Sentry instrumentation** with router tracing and session replay — replay
  runs fully masked, so an error report never carries what someone typed.
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
bar as it actually stands — every number below is enforced in CI, not aspirational:

| Gate                 | Enforced by                     | Current             |
| -------------------- | ------------------------------- | ------------------- |
| TypeScript `strict`  | `npm run typecheck`             | ✅ zero errors      |
| ESLint               | `npm run lint`                  | ✅ zero warnings    |
| Prettier             | `npm run format:check`          | ✅ clean            |
| Unit tests           | `npm run test:coverage`         | 136 tests           |
| Coverage ratchet     | vitest `thresholds`             | 33% (51% own code)  |
| End-to-end           | `npm run test:e2e` (Playwright) | 36 across 2 devices |
| Critical JS bundle   | `npm run size`                  | 146 kB / 160 kB     |
| Prod vulnerabilities | `npm audit --omit=dev`          | ✅ zero             |
| SAST                 | CodeQL (`security-and-quality`) | every PR + weekly   |
| Page quality         | Lighthouse CI budgets           | every PR            |

Two notes on honesty. The coverage headline is dragged down by
`src/components/magicui/` — vendored canvas/WebGL components that jsdom cannot
meaningfully execute; they're covered by Playwright instead, where a real
browser runs them. And the coverage threshold is a **ratchet**: it's set to
what the suite genuinely achieves and only ever goes up.

- **Security headers** (HSTS, nosniff, frame-deny, Referrer-Policy,
  Permissions-Policy) plus a Report-Only CSP, served from `vercel.json`.
- **Source maps stay private** — uploaded to Sentry for symbolication, then
  deleted rather than served.
- **Analytics require consent.** Nothing that measures a visitor runs until
  they say yes, and declining costs them no functionality.

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
