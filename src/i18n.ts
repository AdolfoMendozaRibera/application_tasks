
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa tus archivos de traducción
import esTranslation from './locals/es/translation.json';
import enTranslation from './locals/en/translation.json';
import deTranslation from './locals/de/translation.json';
import frTranslation from './locals/fr/translation.json';
import ptTranslation from './locals/pt/translation.json';   
import ruTranslation from './locals/ru/translation.json';
import zhTranslation from './locals/zh/translation.json';

export const AVAILABLE_LANGUAGES = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh', label: '中文' },
];


const resources = {
    es: {
        translation: esTranslation
    },
    en: {
        translation: enTranslation
    },
    de: {
        translation: deTranslation
    },
    fr: {
        translation: frTranslation
    },
    pt: {
        translation: ptTranslation
    },
    ru: { 
        translation: ruTranslation
    },
    zh: {
        translation: zhTranslation
    },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources, 
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;