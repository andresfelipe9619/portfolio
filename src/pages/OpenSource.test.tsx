import { render, screen } from '@testing-library/react';
import OpenSourcePage from './OpenSource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('@/hooks/use-easter-egg', () => ({
  useTimeEasterEgg: vi.fn(),
}));

vi.mock('@/data/open-source', () => ({
  default: [
    {
      section: 'products',
      title: 'ShipIt',
      href: 'https://example.com/shipit',
      subtitle: 'Build faster',
      badges: ['ts'],
      year: '2025',
      active: true,
      details: 'details',
    },
    {
      section: 'cloud',
      title: 'CloudNinja',
      href: 'https://example.com/cloudninja',
      subtitle: 'Deploy smarter',
      badges: ['aws'],
      year: '2024',
      active: true,
      details: 'details',
    },
  ],
}));

vi.mock('@/components/oss-card', () => ({
  OssCard: ({ title }: { title: string }) => <article>{title}</article>,
}));

vi.mock('@/components/magicui/dot-pattern', () => ({
  DotPattern: () => <div data-testid="dot-pattern" />,
}));

describe('OpenSource page', () => {
  it('renders grouped OSS sections and cards', () => {
    render(<OpenSourcePage />);

    expect(screen.getByText('ossPage.title')).toBeInTheDocument();
    expect(screen.getByText('ossPage.productsTitle')).toBeInTheDocument();
    expect(screen.getByText('ossPage.cloudTitle')).toBeInTheDocument();
    expect(screen.queryByText('ossPage.playgroundTitle')).not.toBeInTheDocument();
    expect(screen.getByText('ShipIt')).toBeInTheDocument();
    expect(screen.getByText('CloudNinja')).toBeInTheDocument();
  });
});
