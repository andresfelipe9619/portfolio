import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json';
import { createLazyBackend } from './i18n-backend';

export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  // Only English ships in the main bundle. The other three are fetched the
  // first time someone actually needs them — previously every visitor
  // downloaded all four dictionaries to read the site in one of them.
  .use(
    createLazyBackend({
      es: () => import('../locales/es/translation.json'),
      fr: () => import('../locales/fr/translation.json'),
      de: () => import('../locales/de/translation.json'),
    }),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: [...SUPPORTED_LANGUAGES],
    resources: {
      en: { translation: enTranslation },
    },
    // English is bundled; everything else comes through the backend above.
    partialBundledLanguages: true,
    fallbackLng: 'en',
    // Treat "de-DE" as a match for "de" and fetch the "de" dictionary for it.
    // Without this, i18next prefers any *exact* match anywhere in the detected
    // list, so a visitor whose browser says ['de-DE', 'en-US', 'en'] got the
    // English they listed last instead of the German they listed first.
    load: 'languageOnly',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      // Only signals that actually come from the visitor. 'htmlTag' used to be
      // in here, reading back the static lang="en" in index.html — so for a
      // browser reporting just 'de-DE' (Safari, typically) that hardcoded "en"
      // was an exact match that outranked the visitor's own language. 'path'
      // and 'subdomain' went too: routes here are pages, not language codes.
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
