import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, waitFor } from '@/test/utils';
import { Seo } from '../seo';

const headTags = () => ({
  title: document.title,
  descriptions: [
    ...document.head.querySelectorAll('meta[name="description"]'),
  ].map((m) => m.getAttribute('content')),
  canonicals: [...document.head.querySelectorAll('link[rel="canonical"]')].map(
    (l) => l.getAttribute('href'),
  ),
  robots: [...document.head.querySelectorAll('meta[name="robots"]')].map((m) =>
    m.getAttribute('content'),
  ),
});

describe('Seo', () => {
  it('renders a suffixed title, a description and a canonical', async () => {
    render(
      <Seo title="Projects" description="Selected work." path="/projects" />,
    );

    await waitFor(() => {
      expect(headTags()).toEqual({
        title: 'Projects | Andrés Suárez',
        descriptions: ['Selected work.'],
        canonicals: ['https://andressuarez.dev/projects'],
        robots: [],
      });
    });
  });

  // A noindex page pointing its canonical somewhere is a contradiction
  // search engines have to resolve for you. Better not to ask.
  it('marks noindex pages as such and gives them no canonical', async () => {
    render(<Seo title="Nope" path="/nope" noIndex />);

    await waitFor(() => {
      expect(headTags().robots).toEqual(['noindex, follow']);
    });
    expect(headTags().canonicals).toEqual([]);
  });

  it('omits the description tag when there is nothing to say', async () => {
    render(<Seo title="Quiet" path="/quiet" />);

    await waitFor(() => {
      expect(document.title).toBe('Quiet | Andrés Suárez');
    });
    expect(headTags().descriptions).toEqual([]);
  });
});

// The root cause of the duplicate-canonical bug: React 19 hoists these tags
// next to any static ones instead of replacing them, so index.html must not
// ship its own. This guards against someone "helpfully" adding them back.
describe('index.html', () => {
  const html = readFileSync(resolve(__dirname, '../../../index.html'), 'utf8');
  // Comments don't count — index.html explains in one why these tags are gone.
  const head = html
    .slice(0, html.indexOf('</head>'))
    .replace(/<!--[\s\S]*?-->/g, '');

  it('ships no static <title>', () => {
    expect(head).not.toMatch(/<title>/);
  });

  it('ships no static description', () => {
    expect(head).not.toMatch(/name="description"/);
  });

  it('ships no static canonical', () => {
    expect(head).not.toMatch(/rel="canonical"/);
  });

  it('keeps the site-wide social card, which crawlers read without JS', () => {
    expect(head).toMatch(/property="og:title"/);
    expect(head).toMatch(/name="twitter:card"/);
  });
});
