import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CaseStudy from './CaseStudy';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@/data/timeline', () => ({
  TIMELINE_DATA: {
    timeline: {
      featured: [
        {
          caseStudyId: 'rocket-app',
          title: 'Rocket App',
          summary: 'Launches features at orbital speed.',
          description: 'A production system built for scale.',
          kind: 'Product',
          area: 'Fintech',
          client: 'Acme Corp',
          country: 'Colombia',
          flag: '🇨🇴',
          date: '2025',
          stack: ['React', 'TypeScript'],
        },
      ],
    },
  },
}));

vi.mock('@/components/magicui/particles', () => ({
  Particles: () => <div data-testid="particles" />,
}));

describe('CaseStudy page', () => {
  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => { });
  });

  it('renders case study content for a valid case-study id', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/case-studies/rocket-app']}>
          <Routes>
            <Route path="/case-studies/:id" element={<CaseStudy />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText('Rocket App')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Launches features at orbital speed.')).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('shows a not-found state for an unknown id', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/case-studies/unknown']}>
          <Routes>
            <Route path="/case-studies/:id" element={<CaseStudy />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText('Case Study Not Found')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /return home/i }));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
