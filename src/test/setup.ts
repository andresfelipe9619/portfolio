import '@testing-library/jest-dom';
import { vi } from 'vitest';

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  disconnect(): void { }
  observe(): void { }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void { }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Global mock for ResizeObserver
class ResizeObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Global mock for react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      // Special case for FAQ in Home.test.tsx
      if (opts?.returnObjects && key === 'faq') {
        return [{ question: 'Q1', answer: 'A1' }];
      }
      return key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => { }),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => { },
  },
}));

// Global mock for react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}));
