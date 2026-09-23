#!/usr/bin/env node
/**
 * Generates public/sitemap.xml at build time.
 *
 * The hand-maintained version drifted: it was missing /blog and carried
 * hardcoded lastmod dates that hadn't been true since February. Generating it
 * means the dates are honest and adding a route can't quietly forget the map.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://andressuarez.dev';

/** Every route worth indexing. Keep in step with the router in src/App.tsx. */
const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/oss', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'monthly', priority: '0.5' },
  {
    path: '/case-studies/sentir-creativo',
    changefreq: 'monthly',
    priority: '0.8',
  },
  { path: '/case-studies/proaxdata', changefreq: 'monthly', priority: '0.8' },
];

const lastmod = new Date().toISOString().split('T')[0];

const body = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, 'utf8');

console.warn(`sitemap.xml written with ${routes.length} routes (${lastmod})`);
