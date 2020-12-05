import { i18n } from "@lingui/core";
import { en, es, fr, de } from "make-plural/plurals";

export const locales = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
};

export const defaultLocale = "en";

i18n.loadLocaleData({
  en: { plurals: en },
  es: { plurals: es },
  fr: { plurals: fr },
  de: { plurals: de },
});

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale) {
  const messages = await import(`./locales/${locale}/translation.json`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

export default i18n;
