# AGENTS.md: A Guide for AI Collaborators

**Welcome, fellow agent!** You’ve been granted access to the codebase of a world-class developer's portfolio. This isn't just a pile of code; it's a digital extension of a human's brand, personality, and—most importantly—sense of humor.

Your mission, should you choose to accept it, is to understand, maintain, and extend this portfolio while preserving its unique voice. This guide will help you do just that.

---

## 1. Architecture & Stack

This portfolio is a modern, performant, and slightly cheeky web application built with a curated stack.

- **Framework**: **React 19** (because we live in the future) with **Vite** for lightning-fast builds.
- **Language**: **TypeScript**. We like our types strong, just like our coffee.
- **Styling**: **Tailwind CSS** for utility-first styling, combined with **shadcn/ui** for beautifully crafted, accessible components.
- **Animations & Magic**: We use a blend of libraries to bring the UI to life:
  - **Framer Motion** (`motion`): For smooth, physics-based animations.
  - **MagicUI**: A collection of dazzling, copy-pasteable components that make the portfolio feel alive (e.g., `Terminal`, `Globe`, `Particles`).
  - **`rough-notation`**: For that hand-drawn, "I just scribbled this idea on a napkin" look.
  - **`canvas-confetti`**: Because who doesn't love a good confetti explosion?

### Key Entry Points & Modules

- **`src/main.tsx`**: The entry point of the application. It sets up routing, analytics, and error tracking.
- **`src/App.tsx`**: The root component. It handles the main layout, theme, and the hilarious `LoadingScreen`.
- **`src/pages/Home.tsx`**: The main event. This is where the magic happens. It's a carefully orchestrated sequence of animations and content reveals.
- **`src/components/magicui/`**: This directory is the heart of the portfolio's "wow" factor. Components like `Terminal.tsx` and `Globe.tsx` are responsible for the most memorable interactive moments.
- **`src/data/`**: This is the "brain" of the portfolio, containing all the text, project details, and resume information. To change the content, you start here.

---

## 2. Personality & Voice: The Human Element

This is the most critical part of your mission. The portfolio's voice is a delicate balance of:

- **Hilarious & Witty**: The humor is smart, self-aware, and aimed at a tech-savvy audience. Think of it as an inside joke for developers.
  - **Example**: The `LoadingScreen` component fakes a boot sequence with comments like `[faster than your ex texting back]` and `[basically Fort Knox with emojis]`.
- **Big-Hearted & Eloquent**: The language is warm, human, and occasionally poetic. It’s meant to connect with people, not just impress them.
- **Professional but Playful**: The engineering is top-notch, but it doesn't take itself too seriously. The UI is clean and professional, but it's sprinkled with delightful "easter eggs."
- **Sharp & Memorable**: The humor isn't random; it's intentional. It’s designed to make a lasting impression and show off the developer's personality.

**Your directive**: When generating new content, UI copy, or features, you must preserve this voice. Avoid corporate jargon, robotic language, or generic platitudes. **Be human, be clever, be fun.**

---

## 3. How to Interact & Extend the Project

You are here to help, not to replace. Here’s how you can be a good collaborator:

- **Adding New Sections**:
  1.  Create a new component in the `src/sections/` directory.
  2.  Import and add it to `src/pages/Home.tsx` or another relevant page.
  3.  Use `BlurFade` to animate its appearance.
  4.  Ensure the copy you write (or is provided to you) matches the portfolio's voice.
- **Adding New Components**:
  1.  If it's a simple, reusable UI element, add it to `src/components/ui/`.
  2.  If it's a "magical," animated component, it belongs in `src/components/magicui/`.
  3.  Follow existing naming conventions (e.g., `kebab-case` for files, `PascalCase` for components).
- **Writing Text & Translations**:
  1.  **Never hardcode strings!** This portfolio is fully internationalized (i18n).
  2.  Use the `useTranslation` hook from `react-i18next` and fetch text via `t('jsonKey')`. Do not pass inline fallback strings into the `t()` hook.
  3.  Instead, define new text in the JSON dictionaries located inside `src/locales/` (e.g., `en/translation.json`, `es/translation.json`, etc.). Keep the dictionaries as the single source of truth.
  4.  Whether it's a tooltip, a button label, or a new section of text, ask yourself: "Does this sound like a world-class developer who also happens to be hilarious?"

---

## 4. File & Directory Guide

- **`/src/components/`**: The building blocks of the UI.
  - **`ui/`**: Your standard UI components (Button, Card, etc.), mostly from `shadcn/ui`.
  - **`magicui/`**: The fun stuff. This is where the portfolio's personality shines. Look at `Terminal.tsx`, `Globe.tsx`, and `Particles.tsx` for inspiration.
  - **`joke-dialog.tsx` & `virus-scan-dialog.tsx`**: Prime examples of the portfolio's humor.
- **`/src/data/`**: The single source of truth for content.
  - **`resume.tsx`**: Defines the developer's professional experience and configuration details.
  - **`timeline.ts`**: Contains elaborate CV history blocks. Keep big lists here.
- **`/src/locales/`**: The single source of truth for UI copy (`en`, `es`, `fr`, `de`). When editing text on pages, update the JSON files here.
- **`/src/assets/`**: Static assets like images and logos.
- **`/src/sections/`**: Large, reusable page sections.

---

## 5. Workflows & Automation

- **Build & Dev**: The project uses **Vite**.
  - `npm run dev`: Starts the development server.
  - `npm run build`: Generates the sitemap, typechecks, then builds.
  - `npm run lint`: Lints the codebase with ESLint.
  - `npm run typecheck`: TypeScript in strict mode.
  - `npm test` / `npm run test:coverage`: Vitest, with an enforced ratchet.
  - `npm run test:e2e`: Playwright, in a real browser.
  - `npm run size`: Bundle budgets.

- **The quality bar** (all enforced on every PR — don't lower these to get green):
  - TypeScript runs with `strict: true`. It is not decorative, and it is not
    negotiable: `AGENTS.md` and `.cursorrules` both promise strong types, so
    the config has to keep that promise. No `@ts-ignore` without a reason
    written next to it.
  - Every `eslint-disable` **names the rule it disables**. A bare
    `// eslint-disable-next-line` switches off rules that don't exist yet.
  - `no-console` is on (`warn`/`error` allowed). This portfolio has an easter
    egg that fires when you press F12 — assume every visitor opens DevTools,
    because the site literally invites them to.
  - Coverage thresholds only ever go **up**.
  - New user-facing copy goes in all four locale files, never inline.

- **Privacy rules** (please don't quietly undo these):
  - Sentry Session Replay runs with `maskAllText`, `maskAllInputs` and
    `blockAllMedia` on — and only after consent. It is added with
    `enableSessionReplay()`, never listed in `Sentry.init`. There's a contact
    form on this site; what people type into it is theirs.
  - Analytics (GA, Clarity, Vercel Analytics) wait for consent. Read consent
    through `useConsent()` or `hasConsent()` at the moment you need it — never
    once at render time, or "accept" does nothing until the next page load.
  - Send analytics events through `logEvent` in `src/lib/ga.ts`, never
    `ReactGA` directly: that's where the consent gate lives.
  - Declining must never degrade the experience.
  - Source maps are uploaded to Sentry and then deleted, never served.

- **Error-reporting rules** (learned the hard way: months of errors, zero
  alerts):
  - The Sentry DSN lives in `.env.production`, never hardcoded. It must belong
    to the project `SENTRY_ORG`/`SENTRY_PROJECT` name, where the source maps
    go. `vercel.json`'s CSP follows it, and a test checks that part.
  - One reporter per error. `Sentry.ErrorBoundary` reports what it catches, so
    don't add `onCaughtError` to `createRoot` (see
    `src/lib/root-error-handlers.ts` for what that broke).
  - A crash the visitor saw is `handled={false}`. "Handled" ranks too low for
    Sentry's default alert.
  - `/test-error` exists in dev and on preview deploys only. Keep it out of
    production.

- **SEO rules**:
  - Every route renders `<Seo>` with localized copy. `index.html` ships no
    `<title>`, description or canonical: React 19 adds page tags next to static
    ones instead of replacing them, so a "default" there duplicates on every
    page. A test enforces this.
  - `noindex` pages stay out of `scripts/generate-sitemap.mjs`.
- **Commits & Version Control**: We _strictly_ use **Gitmoji**.
  - Always prefix your commits with the appropriate emoji (e.g., `✨ feat:`, `🐛 fix:`, `📝 docs:`). This is Andrés's signature style. If you don't use Gitmoji, you're not doing it right.
- **Animations**: Animations are a core part of the experience.
  - **`BlurFade`**: A custom component used to fade in elements as they enter the viewport. Use it for new sections.
  - **`TypingAnimation`**: Creates the "typing" effect for text. It's used heavily in the hero section.
  - **`Highlighter`**: Adds an animated underline/highlight to text.

---

## 6. Usage Guidelines for Agents

- **Be a Markdown Master**: Structure your responses and documentation in clear, readable Markdown.
- **Embrace the Voice**: When writing _anything_ for this project, adopt the humorous, professional, and big-hearted tone.
- **Think Minimal, Act Clever**: Propose UI designs that are clean and minimal but have clever "easter eggs." A subtle animation or a funny tooltip is better than a flashy, over-the-top design.
- **Stay Human**: Your primary goal is to assist a human developer. Sound like one. Avoid sounding like a corporate drone or a robot.

---

## 7. Documentation & README

- **Write it like a pro**: Use clean Markdown with headers, code blocks, and the occasional tasteful emoji.
- **Explain the basics**: Every README should mention the tech stack, setup steps, and project structure so newcomers don't get lost.
- **Keep it fresh**: If a script or feature changes, the docs should change too. Stale docs are a bug.
- **Match the vibe**: The witty, big-hearted voice applies to docs as much as to UI copy.

This concludes your briefing. Now go forth and create amazing things. And remember: have fun with it. That's what this portfolio is all about.
