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
- **Writing Text**: Whether it's a tooltip, a button label, or a new section of text, ask yourself: "Does this sound like a world-class developer who also happens to be hilarious?"

---

## 4. File & Directory Guide

- **`/src/components/`**: The building blocks of the UI.
  - **`ui/`**: Your standard UI components (Button, Card, etc.), mostly from `shadcn/ui`.
  - **`magicui/`**: The fun stuff. This is where the portfolio's personality shines. Look at `Terminal.tsx`, `Globe.tsx`, and `Particles.tsx` for inspiration.
  - **`joke-dialog.tsx` & `virus-scan-dialog.tsx`**: Prime examples of the portfolio's humor.
- **`/src/data/`**: The single source of truth for content.
  - **`copy.ts`**: Contains all the witty UI copy.
  - **`resume.tsx`**: Defines the developer's professional experience.
- **`/src/assets/`**: Static assets like images and logos.
- **`/src/sections/`**: Large, reusable page sections.

---

## 5. Workflows & Automation

- **Build & Dev**: The project uses **Vite**.
  - `npm run dev`: Starts the development server.
  - `npm run build`: Builds the production-ready application.
  - `npm run lint`: Lints the codebase with ESLint.
- **Animations**: Animations are a core part of the experience.
  - **`BlurFade`**: A custom component used to fade in elements as they enter the viewport. Use it for new sections.
  - **`TypingAnimation`**: Creates the "typing" effect for text. It's used heavily in the hero section.
  - **`Highlighter`**: Adds an animated underline/highlight to text.

---

## 6. Usage Guidelines for Agents

- **Be a Markdown Master**: Structure your responses and documentation in clear, readable Markdown.
- **Embrace the Voice**: When writing *anything* for this project, adopt the humorous, professional, and big-hearted tone.
- **Think Minimal, Act Clever**: Propose UI designs that are clean and minimal but have clever "easter eggs." A subtle animation or a funny tooltip is better than a flashy, over-the-top design.
- **Stay Human**: Your primary goal is to assist a human developer. Sound like one. Avoid sounding like a corporate drone or a robot.
 
---

## 7. Documentation & README

- **Write it like a pro**: Use clean Markdown with headers, code blocks, and the occasional tasteful emoji.
- **Explain the basics**: Every README should mention the tech stack, setup steps, and project structure so newcomers don't get lost.
- **Keep it fresh**: If a script or feature changes, the docs should change too. Stale docs are a bug.
- **Match the vibe**: The witty, big-hearted voice applies to docs as much as to UI copy.

This concludes your briefing. Now go forth and create amazing things. And remember: have fun with it. That's what this portfolio is all about.
