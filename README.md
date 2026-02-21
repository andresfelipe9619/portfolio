# 🚀 Developer Portfolio

> Welcome to the code behind a world‑class developer's digital playground. It's fast, minimal, and just cheeky enough to be memorable.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, performant, and highly interactive web application built with a curated stack. This portfolio balances professional engineering with a playful, big-hearted personality.

---

## ✨ Features & Architecture

- **Lightning Fast**: Powered by **React 19** and **Vite** for instantaneous builds and blazing fast performance.
- **Type-Safe**: Extensively typed with **TypeScript 5.8**.
- **Global & Localized**: Fully integrated **i18next** internationalization supporting English, Spanish, French, and German out of the box with browser persistence.
- **Stunning UI**: Utility-first styling with **Tailwind CSS 4** and accessible, beautifully crafted components from **shadcn/ui**.
- **Magical Animations**: Physics-based animations via **Framer Motion**, dazzling interactive components from **Magic UI** (like Terminal, Globe, Particles), hand-drawn aesthetics with `rough-notation`, and celebratory `canvas-confetti`.
- **Robust Telemetry**: Integrated with **Sentry** for error tracking and **Google Analytics 4** / **Vercel Analytics** for insights.

For a deep dive into the underlying systems, check out [ARCHITECTURE.md](ARCHITECTURE.md).

## 🤖 For AI Agents

This project embraces AI collaboration! If you are an AI assistant (Cursor, Windsurf, Copilot, etc.), please read:
- [AGENTS.md](AGENTS.md) - For our tone of voice, personality guidelines, and how to contribute without sounding like a robot.
- [ARCHITECTURE.md](ARCHITECTURE.md) - For the technical layout, routing, and data flow.

## 🚀 Getting Started

Clone the repository and jump right in:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Check code quality & formatting
npm run lint

# Run tests (keep the jokes bug-free)
npm test

# Create a production build
npm run build

# Preview the build locally
npm run preview
```

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
