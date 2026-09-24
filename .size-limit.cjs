/**
 * Bundle budgets.
 *
 * "Critical path" is derived from dist/index.html instead of guessed from chunk
 * names: it's exactly the set of scripts the browser has to fetch before first
 * render — the entry plus everything it modulepreloads. The previous budget
 * matched two hand-picked globs (index-*, react-*) while three more eager
 * chunks (sentry, motion, i18n) were silently counted as "lazy", so the gate
 * measured 146 kB of a 266 kB critical path and could never trip on the rest.
 *
 * Deriving it means a new eager chunk is counted the day it appears.
 */
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(indexHtml)) {
  throw new Error(
    'size-limit measures the built output. Run `npm run build` first.',
  );
}

const html = fs.readFileSync(indexHtml, 'utf8');
const eager = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.js)"/g)].map(
  (match) => `dist/${match[1]}`,
);

if (eager.length === 0) {
  throw new Error('Found no scripts in dist/index.html — did the build fail?');
}

module.exports = [
  {
    name: 'Critical path (every script index.html loads before first render)',
    path: eager,
    // Locked just above today's 266 kB so it can't creep. It's heavy — Sentry
    // and motion are most of it — and shrinking it is its own project; this
    // budget's job is to make sure nobody makes it worse without noticing.
    limit: '280 kB',
  },
  {
    name: 'Lazy chunks (routes, effects, dictionaries)',
    path: ['dist/assets/*.js', ...eager.map((file) => `!${file}`)],
    // Was 220 kB back when this bucket wrongly included three eager chunks.
    limit: '95 kB',
  },
  {
    name: 'Styles',
    path: 'dist/assets/*.css',
    limit: '40 kB',
  },
];
