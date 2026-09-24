import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://andressuarez.dev';

interface SeoProps {
  /** Page title, rendered as "<title> | Andrés Suárez". */
  title: string;
  description?: string;
  /** Path this page canonically lives at, e.g. "/projects". */
  path: string;
  /** Set for pages that shouldn't be indexed (placeholders, errors). */
  noIndex?: boolean;
}

/**
 * Per-page title, description and canonical.
 *
 * Two things this deliberately does *not* do, both learned the hard way:
 *
 * - index.html carries no <title>, description or canonical of its own. Under
 *   React 19, react-helmet-async hoists these tags natively and never replaces
 *   static ones, so a default in index.html meant every page shipped two
 *   canonicals — the first pointing at the home page.
 * - Open Graph and Twitter tags stay in index.html as the site-wide card.
 *   Social crawlers don't run JavaScript, so per-page versions rendered here
 *   would never be seen by them — only duplicated for everything else.
 */
export function Seo({ title, description, path, noIndex = false }: SeoProps) {
  return (
    <Helmet>
      <title>{`${title} | Andrés Suárez`}</title>
      {description && <meta name="description" content={description} />}
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={`${SITE_URL}${path}`} />
      )}
    </Helmet>
  );
}
