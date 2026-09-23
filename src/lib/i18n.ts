import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json';

export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Only English ships in the main bundle. The other three are fetched on demand
 * the first time someone actually selects them — previously every visitor
 * downloaded all four dictionaries to read the site in one of them.
 */
const loaders: Record<
  Exclude<SupportedLanguage, 'en'>,
  () => Promise<{ default: Record<string, unknown> }>
> = {
  es: () => import('../locales/es/translation.json'),
  fr: () => import('../locales/fr/translation.json'),
  de: () => import('../locales/de/translation.json'),
};

const loaded = new Set<string>(['en']);

export async function loadLanguage(language: string) {
  const base = language.split('-')[0];
  if (loaded.has(base)) return;
  const loader = loaders[base as Exclude<SupportedLanguage, 'en'>];
  if (!loader) return;

  const resource = await loader();
  i18n.addResourceBundle(base, 'translation', resource.default, true, true);
  loaded.add(base);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: [...SUPPORTED_LANGUAGES],
    resources: {
      en: { translation: enTranslation },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: [
        'queryString',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['localStorage', 'cookie'],
    },
  });

// Fetch whatever the detector landed on, and anything chosen later.
void loadLanguage(i18n.language ?? 'en');
i18n.on('languageChanged', (language) => {
  void loadLanguage(language);
});

export default i18n;
