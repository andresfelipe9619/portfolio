import { fireEvent, render, screen } from '@/test/utils';
import Home from '../Home';
import { vi } from 'vitest';

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
