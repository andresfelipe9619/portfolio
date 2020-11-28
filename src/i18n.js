import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./locales/en/translation.json";
import translationGer from "./locales/ger/translation.json";
import translationFre from "./locales/fre/translation.json";
import translationEs from "./locales/es/translation.json";

i18n
  // .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: { useSuspense: false },

    resources: {
      en: {
        translation: translationEng,
      },
      ger: {
        translation: translationGer,
      },
      fre: {
        translation: translationFre,
      },
      es: {
        translation: translationEs,
      },
    },
  });

export default i18n;
