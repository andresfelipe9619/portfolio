import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';

const toastMock = vi.fn();
vi.mock('sonner', () => ({
  toast: (...args: unknown[]) => toastMock(...args),
}));

/** Stands in for i18next: a switch lands only when the test resolves it. */
const pending: Array<() => void> = [];
const loaded = new Set<string>(['en']);

const i18nStub = {
  language: 'en',
  resolvedLanguage: 'en' as string | undefined,
  changeLanguage: vi.fn(
    (code: string) =>
      new Promise<void>((resolve) => {
        pending.push(() => {
          i18nStub.language = code;
          i18nStub.resolvedLanguage = loaded.has(code) ? code : 'en';
          resolve();
        });
      }),
  ),
  hasResourceBundle: (code: string) => loaded.has(code),
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: i18nStub, t: (key: string) => key }),
}));

const settleNext = async () => {
  await act(async () => {
    pending.shift()?.();
  });
};

describe('useLanguageSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pending.length = 0;
    loaded.clear();
    loaded.add('en');
    i18nStub.language = 'en';
    i18nStub.resolvedLanguage = 'en';
  });

  it('switches language when the dictionary arrives', async () => {
    const { useLanguageSwitch } = await import('../use-language-switch');
    const { result } = renderHook(() => useLanguageSwitch());
    loaded.add('es');

    let done!: Promise<void>;
    act(() => {
      done = result.current('es');
    });
    await settleNext();
    await act(() => done);

    expect(i18nStub.changeLanguage).toHaveBeenCalledTimes(1);
    expect(i18nStub.resolvedLanguage).toBe('es');
    expect(toastMock).not.toHaveBeenCalled();
  });

  it('puts things back and says so when the download fails', async () => {
    const { useLanguageSwitch } = await import('../use-language-switch');
    const { result } = renderHook(() => useLanguageSwitch());
    // 'fr' is deliberately never marked as loaded: the chunk failed.

    let done!: Promise<void>;
    act(() => {
      done = result.current('fr');
    });
    await settleNext(); // the failed switch lands (with no dictionary)
    await settleNext(); // the revert lands
    await act(() => done);

    expect(i18nStub.changeLanguage).toHaveBeenNthCalledWith(1, 'fr');
    expect(i18nStub.changeLanguage).toHaveBeenNthCalledWith(2, 'en');
    expect(i18nStub.language).toBe('en');
    expect(toastMock).toHaveBeenCalledWith('languageLoadError.title', {
      description: 'languageLoadError.description',
    });
  });

  // An overtaken switch is i18next's business to discard. If we reverted it,
  // we'd undo the visitor's newer, successful pick.
  it('leaves an overtaken switch alone instead of reverting it', async () => {
    const { useLanguageSwitch } = await import('../use-language-switch');
    const { result } = renderHook(() => useLanguageSwitch());
    loaded.add('de');

    let first!: Promise<void>;
    let second!: Promise<void>;
    act(() => {
      first = result.current('fr'); // never loads
      second = result.current('de');
    });
    await settleNext();
    await settleNext();
    await act(() => Promise.all([first, second]));

    expect(i18nStub.changeLanguage).toHaveBeenCalledTimes(2);
    expect(toastMock).not.toHaveBeenCalled();
  });
});
