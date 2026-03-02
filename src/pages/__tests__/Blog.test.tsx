import { fireEvent, render, screen } from '@/test/utils';
import Blog from '../Blog';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Blog page', () => {
  it('renders placeholder content and routes back home', () => {
    render(<Blog />);

    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /back to home/i }));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
