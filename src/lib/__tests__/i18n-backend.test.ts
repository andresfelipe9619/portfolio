import i18next, { type i18n as I18n, type ResourceKey } from 'i18next';
import { vi } from 'vitest';
import { createLazyBackend, type DictionaryLoader } from '../i18n-backend';

const en = { greeting: 'Hello' };
const es = { greeting: 'Hola' };
const de = { greeting: 'Hallo' };

/** A loader the test decides when (and whether) to resolve. */
const deferredLoader = () => {
  let resolve!: (value: { default: ResourceKey }) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<{ default: ResourceKey }>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const loader: DictionaryLoader = vi.fn(() => promise);
  return { loader, resolve, reject };
};

const createI18n = async (
  loaders: Record<string, DictionaryLoader>,
  lng = 'en',
): Promise<I18n> => {
  const instance = i18next.createInstance();
  await instance.use(createLazyBackend(loaders)).init({
    lng,
    supportedLngs: ['en', 'es', 'fr', 'de'],
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    fallbackLng: 'en',
  });
  return instance;
};

/** Lets pending promise callbacks (and i18next's follow-ups) run. */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('createLazyBackend', () => {
  it('serves English from the bundle without fetching anything', async () => {
    const es$ = deferredLoader();
    const i18n = await createI18n({ es: es$.loader });

    expect(i18n.t('greeting')).toBe('Hello');
    expect(es$.loader).not.toHaveBeenCalled();
  });

  it('fetches a dictionary the first time its language is needed', async () => {
    const i18n = await createI18n({
      es: () => Promise.resolve({ default: es }),
    });

    await i18n.changeLanguage('es');

    expect(i18n.resolvedLanguage).toBe('es');
    expect(i18n.t('greeting')).toBe('Hola');
  });

  // This is what makes react-i18next suspend on a first visit in German
  // instead of rendering English under <html lang="de">: react-i18next only
  // treats i18n as ready once isInitialized is true.
  it('does not report itself initialised until the detected language has arrived', async () => {
    const de$ = deferredLoader();
    const instance = i18next.createInstance();
    const initialised = instance
      .use(createLazyBackend({ de: de$.loader }))
      .init({
        lng: 'de',
        supportedLngs: ['en', 'de'],
        resources: { en: { translation: en } },
        partialBundledLanguages: true,
        fallbackLng: 'en',
      });

    await flush();
    // undefined until init completes — falsy either way, which is all
    // react-i18next checks.
    expect(instance.isInitialized).toBeFalsy();

    de$.resolve({ default: de });
    await initialised;

    expect(instance.isInitialized).toBe(true);
    expect(instance.resolvedLanguage).toBe('de');
    expect(instance.t('greeting')).toBe('Hallo');
  });

  // The race from the review: pick Español (slow), then Deutsch (fast). The
  // late Spanish download must not override the visitor's final choice.
  it('lets the last pick win when an earlier download finishes later', async () => {
    const es$ = deferredLoader();
    const i18n = await createI18n({
      es: es$.loader,
      de: () => Promise.resolve({ default: de }),
    });

    const slow = i18n.changeLanguage('es');
    await i18n.changeLanguage('de');
    expect(i18n.resolvedLanguage).toBe('de');

    es$.resolve({ default: es });
    await slow;
    await flush();

    expect(i18n.language).toBe('de');
    expect(i18n.resolvedLanguage).toBe('de');
    expect(i18n.t('greeting')).toBe('Hallo');
  });

  it('falls back to English, without an unhandled rejection, when a download fails', async () => {
    const es$ = deferredLoader();
    const i18n = await createI18n({ es: es$.loader });

    const switching = i18n.changeLanguage('es');
    es$.reject(new Error('chunk missing after a deploy'));
    await expect(switching).resolves.toBeTypeOf('function');

    // Asked for Spanish, but the text is English — and resolvedLanguage says
    // so, which is what <html lang> follows.
    expect(i18n.resolvedLanguage).toBe('en');
    expect(i18n.t('greeting')).toBe('Hello');
    expect(i18n.hasResourceBundle('es', 'translation')).toBe(false);
  });

  it('never resolves a language code to an inherited object property', () => {
    const backend = createLazyBackend({});
    const callback = vi.fn();

    backend.read('constructor', 'translation', callback);

    expect(callback).toHaveBeenCalledWith(null, {});
  });
});
