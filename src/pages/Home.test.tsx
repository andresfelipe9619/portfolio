import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

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
  TESTIMONIALS: [],
  TIMELINE_DATA: { timeline: { featured: [] } },
}));

vi.mock('@/lib/timeline', () => ({
  flattenTimeline: () => [],
}));

vi.mock('react-ga4', () => ({
  default: { event: vi.fn() },
}));

vi.mock('@/components/magicui/typing-animation', () => ({
  TypingAnimation: ({ children }: { children: any }) => <h1>{children}</h1>,
}));

vi.mock('@/components/magicui/highlighter.tsx', () => ({
  Highlighter: ({ children }: { children: any }) => <>{children}</>,
}));

vi.mock('@/components/magicui/blur-fade.tsx', () => ({
  default: ({ children }: { children: any }) => <>{children}</>,
}));

vi.mock('@/components/magicui/shimmer-button', () => ({
  ShimmerButton: ({ children, onClick }: { children: any; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock('@/components/magicui/rainbow-button.tsx', () => ({
  RainbowButton: ({ children, onClick }: { children: any; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock('@/components/virus-scan-dialog.tsx', () => ({
  default: ({ open }: { open: boolean }) => (open ? <div>virus-open</div> : null),
}));

vi.mock('@/components/joke-dialog.tsx', () => ({
  default: ({ open }: { open: boolean }) => (open ? <div>joke-open</div> : null),
}));

vi.mock('@/components/project-dialog', () => ({
  default: () => null,
}));

vi.mock('@/components/magicui/particles', () => ({
  Particles: () => null,
}));

vi.mock('@/components/magicui/globe', () => ({
  Globe: () => null,
}));

vi.mock('@/sections/footer.tsx', () => ({
  Footer: () => null,
}));

vi.mock('@/sections/oss-highlights.tsx', () => ({
  OssHighlights: () => null,
}));

vi.mock('@/sections/client-marquee', () => ({
  ClientMarqueeSection: () => null,
}));

vi.mock('@/sections/skills', () => ({
  SkillsSection: () => null,
}));

vi.mock('@/sections/experience-roulette.tsx', () => ({
  default: () => null,
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Home page', () => {
  it('renders hero actions and opens dialogs', () => {
    sessionStorage.setItem('hasSeenHero', 'true');

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText('globalCompanies')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'exploreUniverse' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'downloadResume' }));
    fireEvent.click(screen.getByRole('button', { name: 'exploreUniverse' }));
  });
});
