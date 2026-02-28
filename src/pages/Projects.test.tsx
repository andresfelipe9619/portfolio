import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from './Projects';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/hooks/use-easter-egg', () => ({
  useTimeEasterEgg: vi.fn(),
}));

vi.mock('@/components/ProjectsGrid', () => ({
  default: () => <div data-testid="projects-grid">Projects grid mock</div>,
}));

vi.mock('@/sections/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer mock</footer>,
}));

describe('Projects page', () => {
  it('renders hero copy and page building blocks', () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );

    expect(screen.getByText('/projects')).toBeInTheDocument();
    expect(screen.getByText('projectsTitle')).toBeInTheDocument();
    expect(screen.getByText('projectsSubtitle')).toBeInTheDocument();
    expect(screen.getByTestId('projects-grid')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
