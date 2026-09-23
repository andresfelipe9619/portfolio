import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Keeps `<html lang>` in step with the active i18n language.
 *
 * index.html hardcodes `lang="en"`, so before this hook a visitor reading the
 * German translation was still telling assistive tech the page was English —
 * which means screen readers pronounce German text with an English voice, and
 * search engines index the wrong language signal. Neither is visible to us,
 * and both are immediately obvious to anyone who depends on them.
 */
export function useDocumentLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const applyLanguage = (language: string) => {
      // i18n hands back tags like "en-US"; `lang` wants the base subtag.
      document.documentElement.lang = language.split('-')[0];
    };

    applyLanguage(i18n.language ?? 'en');

    i18n.on('languageChanged', applyLanguage);
    return () => {
      i18n.off('languageChanged', applyLanguage);
    };
  }, [i18n]);
}
