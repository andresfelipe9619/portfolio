import { render, screen, fireEvent } from '@/test/utils';
import { vi, afterEach } from 'vitest';
import { Header } from '../header';

vi.mock('@/lib/ga', () => ({
  logEvent: vi.fn(),
}));

describe('Header', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('links the wordmark back home', () => {
    render(<Header onClick={vi.fn()} />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('exposes an accessible name on the explorer toggle', () => {
    render(<Header onClick={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Toggle Explorer' }),
    ).toBeInTheDocument();
  });

  it('calls onClick when the explorer toggle is pressed', () => {
    const onClick = vi.fn();
    render(<Header onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle Explorer' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('hides the under-construction ribbon by default', () => {
    render(<Header onClick={vi.fn()} />);

    expect(screen.queryByText(/underConstruction/)).not.toBeInTheDocument();
  });

  it('shows the under-construction ribbon when the flag is on', () => {
    vi.stubEnv('VITE_UNDER_CONSTRUCTION_ENABLED', 'true');

    render(<Header onClick={vi.fn()} />);

    expect(screen.getByText(/underConstruction/)).toBeInTheDocument();
  });

  it('renders the breadcrumb for the current route', () => {
    render(<Header onClick={vi.fn()} />, { initialEntries: ['/projects'] });

    expect(screen.getByText('~/src/pages/Projects')).toBeInTheDocument();
  });
});
