import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

/**
 * Switches language and owns the unhappy path.
 *
 * i18next already waits for the dictionary to arrive before applying a switch,
 * and ignores a slow switch that a newer one has overtaken. What it can't do
 * is tell the visitor when a download fails (offline, or a stale tab asking
 * for a chunk a newer deploy has replaced). Left alone, the menu would claim a
 * language the page isn't in. So on failure we put things back and say so.
 */
export function useLanguageSwitch() {
  const { t, i18n } = useTranslation();
  const latestAttempt = useRef(0);

  return useCallback(
    async (code: string) => {
      const previous = i18n.resolvedLanguage ?? i18n.language ?? 'en';
      const attempt = ++latestAttempt.current;

      await i18n.changeLanguage(code);

      // A newer pick overtook this one; i18next has already discarded it.
      if (attempt !== latestAttempt.current) return;

      if (!i18n.hasResourceBundle(code, 'translation')) {
        await i18n.changeLanguage(previous);
        toast(t('languageLoadError.title'), {
          description: t('languageLoadError.description'),
        });
      }
    },
    [i18n, t],
  );
}
