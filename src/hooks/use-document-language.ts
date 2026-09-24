import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Keeps `<html lang>` in step with the language the page is actually in.
 *
 * index.html hardcodes `lang="en"`, so without this a visitor reading the
 * German translation would still be telling assistive tech the page was
 * English — screen readers pronounce German with an English voice, and search
 * engines index the wrong language signal.
 *
 * It follows `resolvedLanguage`, not `language`. The two differ exactly when it
 * matters: `language` is what was asked for, `resolvedLanguage` is what the
 * text is rendered in. If a dictionary download fails, the page falls back to
 * English, and the tag has to say English too — anything else recreates the
 * very mismatch this hook exists to prevent.
 */
export function useDocumentLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const applyLanguage = () => {
      const language = i18n.resolvedLanguage ?? i18n.language ?? 'en';
      // i18n can hand back tags like "en-US"; `lang` wants the base subtag.
      document.documentElement.lang = language.split('-')[0];
    };

    applyLanguage();

    i18n.on('languageChanged', applyLanguage);
    return () => {
      i18n.off('languageChanged', applyLanguage);
    };
  }, [i18n]);
}
