import { i18n } from 'i18next';

export const languageToggleHandler = (i18n: i18n) => {
  i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  document.documentElement.lang = i18n.language;
  document.dir = i18n.dir();
};
