import { render, screen, fireEvent } from '@/test/utils';
import { vi } from 'vitest';
import NotFound from '../NotFound';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

describe('NotFound', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('announces itself as a 404', () => {
    render(<NotFound />, { initialEntries: ['/nope'] });
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the localized headline and description', () => {
    render(<NotFound />, { initialEntries: ['/nope'] });

    expect(screen.getByText('notFound.title0')).toBeInTheDocument();
    expect(screen.getByText('notFound.description')).toBeInTheDocument();
  });

  it('echoes the path the visitor actually asked for', () => {
    render(<NotFound />, { initialEntries: ['/this/does/not/exist'] });

    expect(screen.getByTestId('not-found-path')).toHaveTextContent(
      '/this/does/not/exist',
    );
  });

  it('offers a route back home', () => {
    render(<NotFound />, { initialEntries: ['/nope'] });

    fireEvent.click(screen.getByRole('button', { name: /backHome/i }));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('offers a route to contact so typos can be reported', () => {
    render(<NotFound />, { initialEntries: ['/nope'] });

    fireEvent.click(screen.getByRole('button', { name: /reportIt/i }));
    expect(navigateMock).toHaveBeenCalledWith('/contact');
  });

  it('uses a single top-level heading', () => {
    render(<NotFound />, { initialEntries: ['/nope'] });

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders inside a main landmark', () => {
    render(<NotFound />, { initialEntries: ['/nope'] });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
