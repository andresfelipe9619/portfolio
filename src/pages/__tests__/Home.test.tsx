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
  TIMELINE_DATA: { timeline: { featured: [] } },
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
