import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_VN from "../locales/vn/home.json";
import HOME_EN from "../locales/en/home.json";
import HOME_TQ from "../locales/tq/home.json";


export const resources = {
  en: {
    home: HOME_EN,
    product:''
  },
  vi: {
    home: HOME_VN
  },
  tq: {
    home: HOME_TQ
  }
};

export const defaultNS = 'home'
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    ns:['home', 'product'],
    fallbackLng: 'vi' , 
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;