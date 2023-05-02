
import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DEVELOPMENT } from 'src/constants/env'

import translationsEN from './en.json'
import translationsES from './es.json'

// the translations
export const resources = {
  en: {
    translation: translationsEN
  },
  es: {
    translation: translationsES
  },
}

i18n
  .use(detector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    fallbackLng: 'en', // use en if detected lng is not available
    debug: false, //DEVELOPMENT,
    keySeparator: '.', // we use keys in form messages.welcome
    nsSeparator: '::',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })


export default i18n