import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';

type Handler = (language: string) => void;

const handlers = new Set<Handler>();
const i18nStub = {
  language: 'en',
  on: (event: string, handler: Handler) => {
    if (event === 'languageChanged') handlers.add(handler);
  },
  off: (event: string, handler: Handler) => {
    if (event === 'languageChanged') handlers.delete(handler);
  },
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: i18nStub, t: (key: string) => key }),
}));

const emitLanguageChange = (language: string) => {
  act(() => {
    handlers.forEach((handler) => handler(language));
  });
};

describe('useDocumentLanguage', () => {
  beforeEach(() => {
    handlers.clear();
    i18nStub.language = 'en';
    document.documentElement.lang = '';
  });

  it('applies the current language on mount', async () => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    expect(document.documentElement.lang).toBe('en');
  });

  // The whole point: German content should not claim to be English.
  it.each(['es', 'fr', 'de'])('follows a switch to %s', async (language) => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    emitLanguageChange(language);

    expect(document.documentElement.lang).toBe(language);
  });

  it('strips the region subtag from tags like en-US', async () => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    emitLanguageChange('de-AT');

    expect(document.documentElement.lang).toBe('de');
  });

  it('defaults to en when i18n reports no language', async () => {
    i18nStub.language = undefined as unknown as string;
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    expect(document.documentElement.lang).toBe('en');
  });

  it('unsubscribes on unmount', async () => {
    const { useDocumentLanguage } = await import('../use-document-language');
    const { unmount } = renderHook(() => useDocumentLanguage());

    expect(handlers.size).toBe(1);
    unmount();
    expect(handlers.size).toBe(0);
  });
});
