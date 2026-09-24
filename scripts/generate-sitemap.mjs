#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from one list of indexable routes.
 *
 * What's deliberately missing:
 *
 * - /blog. It's a placeholder page that ships <meta name="robots"
 *   content="noindex">, and a sitemap that submits a noindex URL just earns a
 *   "Submitted URL marked noindex" warning in Search Console.
 * - <lastmod>, <changefreq> and <priority>. Google ignores changefreq and
 *   priority outright, and only trusts lastmod when it tracks real content
 *   changes; stamping every URL with the build date is the opposite of that.
 *   Leaving them out also makes the output deterministic, so running a build
 *   never leaves a dirty working tree behind.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://andressuarez.dev';

/**
 * Every route worth indexing. Keep in step with the router in src/App.tsx —
 * and leave out anything that renders noindex.
 */
const routes = [
  '/',
  '/projects',
  '/oss',
  '/contact',
  '/case-studies/sentir-creativo',
  '/case-studies/proaxdata',
];

const body = routes
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(resolve(__dirname, '..', 'public', 'sitemap.xml'), xml, 'utf8');

console.warn(`sitemap.xml written with ${routes.length} routes`);
