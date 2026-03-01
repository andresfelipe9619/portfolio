import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from './Projects';
import { TooltipProvider } from '@/components/ui/tooltip';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/hooks/use-easter-egg', () => ({
  useTimeEasterEgg: vi.fn(),
}));

describe('Projects page', () => {
  it('renders hero copy and page building blocks', () => {
    // We render without mocking the grids and footers to test integration
    render(
      <MemoryRouter>
        <TooltipProvider>
          <Projects />
        </TooltipProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('/projects')).toBeInTheDocument();
    expect(screen.getByText('projectsTitle')).toBeInTheDocument();
    expect(screen.getByText('projectsSubtitle')).toBeInTheDocument();
  });
});
