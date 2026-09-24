import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * The Sentry DSN lives in two files that nothing else ties together:
 * .env.production, which the SDK reads, and vercel.json, whose CSP sends
 * violation reports to the same project and has to let the feedback dialog load
 * its script from the DSN's host. Change one, forget the other, and reports go
 * somewhere nobody looks. The last DSN mix-up went unnoticed for months.
 *
 * What no test can check from here is that the DSN belongs to the project
 * receiving the source maps. That's rule 1 in .env.production.
 */
const repo = resolve(__dirname, '../..');

const readDsn = (): string | undefined =>
  readFileSync(resolve(repo, '.env.production'), 'utf8')
    .split('\n')
    .find((line) => line.startsWith('VITE_SENTRY_DSN='))
    ?.slice('VITE_SENTRY_DSN='.length)
    .trim();

type HeaderRule = {
  source: string;
  headers: Array<{ key: string; value: string }>;
};

const readSiteHeaders = () => {
  const { headers } = JSON.parse(
    readFileSync(resolve(repo, 'vercel.json'), 'utf8'),
  ) as { headers: HeaderRule[] };
  const site = headers.find((rule) => rule.source === '/(.*)');
  const get = (key: string) =>
    site?.headers.find((header) => header.key === key)?.value;

  // Report-Only today; the same checks have to hold once it's enforced.
  const csp =
    get('Content-Security-Policy') ??
    get('Content-Security-Policy-Report-Only') ??
    '';
  const directives = new Map(
    csp
      .split(';')
      .map((directive) => directive.trim().split(/\s+/))
      .filter(([name]) => name)
      .map(([name, ...sources]) => [name, sources]),
  );

  return { directives, reportingEndpoints: get('Reporting-Endpoints') };
};

describe('Sentry configuration', () => {
  const dsn = readDsn();
  const { directives, reportingEndpoints } = readSiteHeaders();

  it('ships a DSN with production builds', () => {
    expect(dsn, 'VITE_SENTRY_DSN in .env.production').toMatch(
      /^https:\/\/[0-9a-f]+@[\w.-]+\/\d+$/,
    );
  });

  describe('vercel.json follows the DSN', () => {
    const { host, username: publicKey, pathname } = new URL(dsn ?? '');
    const securityEndpoint = `https://${host}/api/${pathname.slice(1)}/security/?sentry_key=${publicKey}&sentry_environment=production`;

    it('sends CSP reports to the DSN’s project', () => {
      expect(directives.get('report-uri')).toEqual([securityEndpoint]);
      expect(reportingEndpoints).toBe(`csp-endpoint="${securityEndpoint}"`);
    });

    it('lets the feedback dialog load its script from the DSN’s host', () => {
      expect(directives.get('script-src')).toContain(`https://${host}`);
    });

    it('lets the SDK send events to the DSN’s host', () => {
      const allowed = directives.get('connect-src') ?? [];
      const parent = host.slice(host.indexOf('.') + 1);
      expect(
        allowed.includes(`https://${host}`) ||
          allowed.includes(`https://*.${parent}`),
        `connect-src allows https://${host}`,
      ).toBe(true);
    });
  });
});
