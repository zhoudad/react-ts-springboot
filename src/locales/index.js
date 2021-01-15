import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { getLanguage } from '../utils'

import customZhCn from './lang/zh_CN';
import customEnUs from './lang/en_US';
import customZhHk from './lang/hk_CN';

const lng = getLanguage();
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en_US: {
        translation: customEnUs,
      },
      zh_CN: {
        translation: customZhCn,
      },
      hk_CN: {
        translation: customZhHk,
      }
    },
    lng: lng,
    fallbackLng: lng,

    interpolation: {
      escapeValue: false,
    },
  });

