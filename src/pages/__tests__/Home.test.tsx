import { act, fireEvent, render, screen, waitFor, within } from '@/test/utils';
import Home from '../Home';
import { vi } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { logEvent } from '@/lib/ga';

vi.mock('@/lib/ga', () => ({ logEvent: vi.fn() }));

vi.mock('@/data/timeline', () => ({
  TESTIMONIALS: [
    {
      quote: 'Test quote',
      client: 'Test Client',
      country: 'Test Country',
      flag: '🇺🇸',
    },
  ],
  TIMELINE_DATA: {
    timeline: {
      '2024': [{ title: 'Test Project', testimonial: 'Test quote' }],
    },
  },
}));

// Keep WebGL / Canvas / heavy DOM component mocks
vi.mock('@/components/magicui/particles', () => ({
  Particles: () => <div data-testid="particles" />,
}));

vi.mock('@/components/magicui/globe', () => ({
  Globe: () => <div data-testid="globe" />,
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Home page', () => {
  // The dialogs are lazy chunks. Without this, the first test to open each
  // one also paid for compiling and loading it inside findBy's one-second
  // wait: 0.5 s on an idle machine, 0.7 s with every core busy, and more than
  // a second on the first run after a clean install.
  beforeAll(async () => {
    await Promise.all([
      import('@/components/project-dialog'),
      import('@/components/joke-dialog'),
      import('@/components/virus-scan-dialog'),
    ]);
  });

  beforeEach(() => {
    // Reset any storage state to ensure predictable tests
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // The first line is the largest thing on the page, so it is what "loaded"
  // means to a visitor (and to Lighthouse). It used to type in, letter by letter.
  it('shows the headline’s first line from the very first frame', () => {
    render(<Home />);

    expect(screen.getByText('globalCompanies')).toBeInTheDocument();
  });

  // First visits used to lock scrolling for the whole 6.5 s intro.
  it('never locks scrolling, even while the intro plays', () => {
    render(<Home />);

    expect(document.body).not.toHaveClass('no-scroll');
  });

  // ...and to hold back every section below the hero until it finished.
  it('renders the rest of the page without waiting for the intro', () => {
    render(<Home />);

    expect(screen.getByText('faqTitle')).toBeInTheDocument();
  });

  // The testimonial cards were clickable divs: no focus, no Enter key, no way
  // in without a mouse.
  it('opens a testimonial’s project from the keyboard', async () => {
    sessionStorage.setItem('hasSeenHero', 'true');
    render(<Home />);

    const [card] = screen.getAllByRole('button', { name: /Test quote/ });
    expect(card).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(await screen.findByRole('dialog')).toHaveTextContent('Test Project');
  });

  // Confetti moves too. Reduced-motion visitors skip the party and still get
  // where they were going.
  it('throws confetti that respects reduced motion, then heads to Contact', async () => {
    sessionStorage.setItem('hasSeenHero', 'true');
    render(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<p>contact page</p>} />
      </Routes>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'letsTalk' }));

    await waitFor(() => expect(confetti).toHaveBeenCalled());
    vi.mocked(confetti).mock.calls.forEach(([options]) =>
      expect(options).toMatchObject({ disableForReducedMotion: true }),
    );
    expect(
      await screen.findByText('contact page', {}, { timeout: 2_000 }),
    ).toBeInTheDocument();
  });

  // The "virus scan" is the joke; the résumé at the end is the point. And the
  // download is logged through logEvent, where the consent gate lives.
  it('runs its “virus scan”, then hands over the résumé', async () => {
    sessionStorage.setItem('hasSeenHero', 'true');
    const download = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: 'downloadResume' }));
    const dialog = await screen.findByRole('dialog');

    vi.useFakeTimers();
    try {
      fireEvent.click(
        within(dialog).getByRole('button', { name: /unleash the genius/i }),
      );
      act(() => vi.advanceTimersByTime(6_000));
      fireEvent.click(screen.getByRole('button', { name: /download resume/i }));

      expect(download).toHaveBeenCalledTimes(1);
      expect(download.mock.contexts[0]).toHaveAttribute(
        'download',
        'andres-suarez-resume.pdf',
      );
      expect(logEvent).toHaveBeenCalledWith(
        'Resume',
        'Downloaded',
        'Resume Downloaded',
      );
    } finally {
      vi.useRealTimers();
      download.mockRestore();
    }
  });

  it('renders hero content immediately if hasSeenHero is true', async () => {
    sessionStorage.setItem('hasSeenHero', 'true');

    render(<Home />);

    // Using real UI components we should see the text
    expect(screen.getByText('globalCompanies')).toBeInTheDocument();

    // Test dialogs
    const exploreBtn = await screen.findByRole('button', {
      name: 'exploreUniverse',
    });
    expect(exploreBtn).toBeInTheDocument();

    // Open Joke dialog
    fireEvent.click(exploreBtn);
    expect(await screen.findByText(/bro/i)).toBeInTheDocument();
  });
});
