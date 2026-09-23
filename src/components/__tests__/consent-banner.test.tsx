import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { beforeEach } from 'vitest';
import { ConsentBanner } from '../consent-banner';
import { CONSENT_STORAGE_KEY, getConsent } from '@/lib/consent';

describe('ConsentBanner', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('asks a first-time visitor', async () => {
    render(<ConsentBanner />);

    expect(await screen.findByText('consent.title')).toBeInTheDocument();
  });

  it('offers accept and decline as equally reachable buttons', async () => {
    render(<ConsentBanner />);

    expect(
      await screen.findByRole('button', { name: 'consent.accept' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'consent.decline' }),
    ).toBeInTheDocument();
  });

  it('records a yes and dismisses itself', async () => {
    render(<ConsentBanner />);

    fireEvent.click(
      await screen.findByRole('button', { name: 'consent.accept' }),
    );

    expect(getConsent()).toBe('granted');
    await waitFor(() => {
      expect(screen.queryByText('consent.title')).not.toBeInTheDocument();
    });
  });

  it('records a no and dismisses itself', async () => {
    render(<ConsentBanner />);

    fireEvent.click(
      await screen.findByRole('button', { name: 'consent.decline' }),
    );

    expect(getConsent()).toBe('denied');
    await waitFor(() => {
      expect(screen.queryByText('consent.title')).not.toBeInTheDocument();
    });
  });

  it('does not pester someone who already answered yes', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    render(<ConsentBanner />);

    expect(screen.queryByText('consent.title')).not.toBeInTheDocument();
  });

  it('does not pester someone who already answered no', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'denied');
    render(<ConsentBanner />);

    expect(screen.queryByText('consent.title')).not.toBeInTheDocument();
  });

  it('is exposed to assistive tech as a labelled dialog', async () => {
    render(<ConsentBanner />);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'consent.title');
  });
});
