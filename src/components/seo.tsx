import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://andressuarez.dev';
const DEFAULT_IMAGE = `${SITE_URL}/me.jpeg`;

interface SeoProps {
  /** Page title, rendered as "<title> | Andrés Suárez". */
  title: string;
  description: string;
  /** Path this page canonically lives at, e.g. "/projects". */
  path: string;
  image?: string;
  /** Set for pages that shouldn't be indexed (placeholders, errors). */
  noIndex?: boolean;
}

/**
 * Per-page metadata.
 *
 * Home, Projects, Contact and OpenSource all used to inherit the single static
 * title and description from index.html, so four different URLs showed up in
 * search results wearing the same outfit. Each page now describes itself.
 */
export function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SeoProps) {
  const fullTitle = `${title} | Andrés Suárez`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noIndex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
}
