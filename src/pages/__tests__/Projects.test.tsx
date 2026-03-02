import { render, screen } from '@/test/utils';
import Projects from '../Projects';

vi.mock('@/hooks/use-easter-egg', () => ({
  useTimeEasterEgg: vi.fn(),
}));

describe('Projects page', () => {
  it('renders hero copy and page building blocks', () => {
    // We render without mocking the grids and footers to test integration
    render(<Projects />);

    expect(screen.getByText('/projects')).toBeInTheDocument();
    expect(screen.getByText('projectsTitle')).toBeInTheDocument();
    expect(screen.getByText('projectsSubtitle')).toBeInTheDocument();
  });
});
