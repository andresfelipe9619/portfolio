import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { vi } from 'vitest';
import { TooltipProvider } from '@/components/ui/tooltip';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      if (opts?.returnObjects && key === 'faq') {
        return [{ question: 'Q1', answer: 'A1' }];
      }
      return key;
    },
  }),
}));

vi.mock('@/data/timeline', () => ({
  TESTIMONIALS: [
    { quote: 'Test quote', client: 'Test Client', country: 'Test Country', flag: '🇺🇸' }
  ],
  TIMELINE_DATA: { timeline: { featured: [] } },
}));

vi.mock('react-ga4', () => ({
  default: { event: vi.fn() },
}));

// Mock ResizeObserver for some magicui components
global.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

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

    render(
      <MemoryRouter>
        <TooltipProvider>
          <Home />
        </TooltipProvider>
      </MemoryRouter>,
    );

    // Using real UI components we should see the text
    expect(screen.getByText('globalCompanies')).toBeInTheDocument();

    // Test dialogs
    const exploreBtn = await screen.findByRole('button', { name: 'exploreUniverse' });
    expect(exploreBtn).toBeInTheDocument();

    // Open Joke dialog
    fireEvent.click(exploreBtn);
    expect(await screen.findByText(/bro/i)).toBeInTheDocument();
  });
});
