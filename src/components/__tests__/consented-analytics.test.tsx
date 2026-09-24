import { render, screen, act } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

const load = async () => {
  vi.resetModules();
  const [{ ConsentedAnalytics }, consent] = await Promise.all([
    import('../consented-analytics'),
    import('@/lib/consent'),
  ]);
  return { ConsentedAnalytics, setConsent: consent.setConsent };
};

describe('ConsentedAnalytics', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders nothing before the visitor has answered', async () => {
    const { ConsentedAnalytics } = await load();
    render(<ConsentedAnalytics />);

    expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument();
  });

  // The review finding: consent used to be read once at render, so accepting
  // did nothing until the next page load.
  it('starts the moment the visitor accepts, without a reload', async () => {
    const { ConsentedAnalytics, setConsent } = await load();
    render(<ConsentedAnalytics />);

    act(() => setConsent('granted'));

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  });

  it('stays off when the visitor declines', async () => {
    const { ConsentedAnalytics, setConsent } = await load();
    render(<ConsentedAnalytics />);

    act(() => setConsent('denied'));

    expect(screen.queryByTestId('vercel-analytics')).not.toBeInTheDocument();
  });

  it('starts straight away for a returning visitor who already accepted', async () => {
    localStorage.setItem('analytics-consent', 'granted');
    const { ConsentedAnalytics } = await load();
    render(<ConsentedAnalytics />);

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  });
});
