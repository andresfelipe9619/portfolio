import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';

type Handler = (language: string) => void;

const handlers = new Set<Handler>();
const i18nStub = {
  language: 'en' as string | undefined,
  resolvedLanguage: 'en' as string | undefined,
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

/**
 * Mimics i18next: `language` is what was requested, `resolvedLanguage` is what
 * the text actually rendered in once the dictionary did (or didn't) arrive.
 */
const emitLanguageChange = (requested: string, resolved = requested) => {
  act(() => {
    i18nStub.language = requested;
    i18nStub.resolvedLanguage = resolved;
    handlers.forEach((handler) => handler(requested));
  });
};

describe('useDocumentLanguage', () => {
  beforeEach(() => {
    handlers.clear();
    i18nStub.language = 'en';
    i18nStub.resolvedLanguage = 'en';
    document.documentElement.lang = '';
  });

  it('applies the current language on mount', async () => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    expect(document.documentElement.lang).toBe('en');
  });

  // German content should not claim to be English.
  it.each(['es', 'fr', 'de'])('follows a switch to %s', async (language) => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    emitLanguageChange(language);

    expect(document.documentElement.lang).toBe(language);
  });

  // ...and English content should not claim to be Spanish. When a dictionary
  // download fails the text falls back to English, so the tag must follow the
  // text rather than the request.
  it('stays on the language the text is actually in when a download fails', async () => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    emitLanguageChange('es', 'en');

    expect(document.documentElement.lang).toBe('en');
  });

  it('strips the region subtag from tags like de-AT', async () => {
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    emitLanguageChange('de-AT');

    expect(document.documentElement.lang).toBe('de');
  });

  it('falls back to language when nothing has resolved yet', async () => {
    i18nStub.resolvedLanguage = undefined;
    i18nStub.language = 'fr';
    const { useDocumentLanguage } = await import('../use-document-language');
    renderHook(() => useDocumentLanguage());

    expect(document.documentElement.lang).toBe('fr');
  });

  it('defaults to en when i18n reports nothing at all', async () => {
    i18nStub.resolvedLanguage = undefined;
    i18nStub.language = undefined;
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
