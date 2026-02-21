# Marketing & SEO Strategy

This document outlines the marketing, targeting, and SEO strategies employed in this portfolio. The goal is to maximize visibility to top-tier global companies, creative agencies, and open-source communities.

## 1. Value Proposition & Positioning

**Tagline:** "Global companies trust me to build what others can’t. Creative Developer · Systems Thinker · Open Source Builder."

**Target Audience:**
- **Engineering Managers & CTOs:** Looking for someone who understands systems engineering and is not just a UI developer.
- **Creative Agencies:** Seeking highly interactive, polished, and dynamic interfaces (Creative Developers).
- **Recruiters from Top-Tier Companies:** Searching for unique profiles that blend backend logic with frontend magic.

## 2. SEO (Search Engine Optimization)

To rank globally and reach the desired audience, the portfolio implements several technical SEO strategies:

- **Meta Tags:** Defined in `index.html` to clearly articulate the value proposition.
  - *Keywords:* Creative Developer, Open Source, Portfolio, React, TypeScript, Software Engineer, Web Development, Frontend Developer, Backend Developer, Systems Engineering.
- **Open Graph (OG) & Twitter Cards:** Ensures that when the portfolio is shared on LinkedIn, Twitter, or Discord, it displays a highly professional preview image (`preview.jpg`), title, and description.
- **JSON-LD Structured Data:** Provides search engines (Google, Bing) with structured context that the entity is a "Person" (Andrés Suárez), linking directly to GitHub and LinkedIn profiles to consolidate domain authority.
- **Canonical URLs:** Prevents duplicate content issues by pointing back to `https://andressuarez.dev/`.
- **Sitemap & Robots.txt:** Provides a clear indexing path for search engine bots.

## 3. Analytics & Conversion Tracking

The portfolio uses **Google Analytics 4 (GA4)** to monitor traffic, user engagement, and conversion metrics. This data is critical for understanding which projects and skills resonate most with the audience.

### Tracked Events (KPIs)

To view these in Google Analytics, look under *Reports > Engagement > Events*.

| Category | Action | Context (Label/Target) | Purpose |
| :--- | :--- | :--- | :--- |
| **Pageview** | `pageview` | Any Path | General traffic monitoring. |
| **Projects** | `View Detail` | Project Title | Identify which portfolio pieces generate the most interest. |
| **Projects** | `External Link Click` | External URL | Track intent to view live project sites. |
| **Timeline** | `Link Click` | Career Title | Track exploration of professional history. |
| **Navigation** | `Toggle File Explorer` | N/A | Understand how technical stakeholders explore the site. |
| **Contact** | `Intent` | 'Let's Talk Button' | Track lead generation and interest. |
| **OSS Card** | `Open Modal` | OSS Project Title | Track engagement with Open Source highlights. |
| **OSS Card** | `Open on GitHub` | OSS Project Title | Conversion metric: Users navigating to GitHub repositories. |
| **Language** | `Change` | Language Code (en, es, etc.) | Understand geographic and linguistic preferences of the audience. |
| **Footer** | `[Social] Click` | LinkedIn, GitHub, etc. | Track external profile visits. |

### Microsoft Clarity
In addition to GA4, **Microsoft Clarity** is configured. This provides:
- **Heatmaps:** See where users click and how far they scroll on the landing page.
- **Session Recordings:** Watch how visitors navigate the timeline and projects.

## 4. Continuous Improvement

- **Review GA4 Monthly:** Check which languages are used most and ensure translations for those are perfect.
- **Monitor Bounce Rate:** If users are leaving quickly, reconsider the hero section's time-to-interactivity.
- **Update Metadata:** Keep the `description` and `keywords` in `index.html` updated as your tech stack or target roles evolve.
