import { render, screen } from '@/test/utils';
import { Breadcrumb } from '../breadcrumb';

describe('Breadcrumb', () => {
  it('shows the Home path at the root', () => {
    render(<Breadcrumb />, { initialEntries: ['/'] });
    expect(screen.getByText('~/src/pages/Home')).toBeInTheDocument();
  });

  it.each([
    ['/projects', '~/src/pages/Projects'],
    ['/contact', '~/src/pages/Contact'],
    ['/oss', '~/src/pages/Oss'],
    ['/blog', '~/src/pages/Blog'],
  ])('renders %s as %s', (route, expected) => {
    render(<Breadcrumb />, { initialEntries: [route] });
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('always shows the prompt arrow', () => {
    render(<Breadcrumb />, { initialEntries: ['/projects'] });
    expect(screen.getByText('➜')).toBeInTheDocument();
  });
});
