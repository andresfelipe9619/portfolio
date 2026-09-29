# Marketing & SEO Strategy

This document outlines the marketing, targeting, and SEO strategies employed in this portfolio. The goal is to maximize visibility to top-tier global companies, creative agencies, and open-source communities.

## 1. Value Proposition & Positioning

**Title (everywhere):** Senior Software & Solutions Engineer.

**Tagline:** "Global companies trust me to build what others can’t." It is backed straight away by the numbers under the hero: 9+ years in production, 30+ projects shipped, 12 countries, ~30% off the AWS bill.

**Voice:** funny where it's free (toasts, tooltips, the 404, the loading terminal), never on the path to something a visitor came for. Every claim has a receipt: a number, a client quote or a line in the résumé.

**Target Audience:**

- **Engineering Managers & CTOs:** Looking for someone who understands systems engineering and is not just a UI developer.
- **Founders & product teams:** Who need one person who speaks both business and code.
- **Recruiters from Top-Tier Companies:** Searching for unique profiles that blend backend logic with frontend craft.

## 2. SEO (Search Engine Optimization)

- **Per-page metadata:** every route renders its own localized `<title>`, description and canonical through `<Seo>`. `index.html` deliberately ships none of them (React 19 would duplicate them).
- **Open Graph (OG) & Twitter Cards:** defined in `index.html`, the only version social crawlers see. The image is `public/og-card.jpg`, a designed 1200×630 card with name, title and numbers.
- **JSON-LD Structured Data:** a `schema.org/Person` (Andrés Suárez) with `jobTitle` and `sameAs` links to GitHub and LinkedIn to consolidate authority.
- **Sitemap & Robots.txt:** generated at build time by `scripts/generate-sitemap.mjs`; `noindex` pages stay out.
- **`llms.txt`:** the same positioning, for AI agents.

## 3. Analytics & Conversion Tracking

The portfolio uses **Google Analytics 4 (GA4)** to monitor traffic, user engagement, and conversion metrics. This data is critical for understanding which projects and skills resonate most with the audience.

### Tracked Events (KPIs)

To view these in Google Analytics, look under _Reports > Engagement > Events_.

| Category       | Action                 | Context (Label/Target)       | Purpose                                                           |
| :------------- | :--------------------- | :--------------------------- | :---------------------------------------------------------------- |
| **Pageview**   | `pageview`             | Any Path                     | General traffic monitoring.                                       |
| **Projects**   | `View Detail`          | Project Title                | Identify which portfolio pieces generate the most interest.       |
| **Projects**   | `External Link Click`  | External URL                 | Track intent to view live project sites.                          |
| **Timeline**   | `Link Click`           | Career Title                 | Track exploration of professional history.                        |
| **Navigation** | `Toggle File Explorer` | N/A                          | Understand how technical stakeholders explore the site.           |
| **Contact**    | `Intent`               | 'Let's Talk Button'          | Track lead generation and interest.                               |
| **OSS Card**   | `Open Modal`           | OSS Project Title            | Track engagement with Open Source highlights.                     |
| **OSS Card**   | `Open on GitHub`       | OSS Project Title            | Conversion metric: Users navigating to GitHub repositories.       |
| **Language**   | `Change`               | Language Code (en, es, etc.) | Understand geographic and linguistic preferences of the audience. |
| **Footer**     | `[Social] Click`       | LinkedIn, GitHub, etc.       | Track external profile visits.                                    |

### Microsoft Clarity

In addition to GA4, **Microsoft Clarity** is configured. This provides:

- **Heatmaps:** See where users click and how far they scroll on the landing page.
- **Session Recordings:** Watch how visitors navigate the timeline and projects.

## 4. Continuous Improvement

- **Review GA4 Monthly:** Check which languages are used most and ensure translations for those are perfect.
- **Monitor Bounce Rate:** If users are leaving quickly, reconsider the hero section's time-to-interactivity.
- **Update Metadata:** Keep the social card, `llms.txt` and the localized `seo.*` copy in step with the title and the numbers.
