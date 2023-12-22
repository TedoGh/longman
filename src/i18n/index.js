import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/en/translation.json";
import translationKA from "../locales/ka/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ka: {
    translation: translationKA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ka",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
