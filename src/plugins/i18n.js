import { createI18n } from 'vue-i18n'
import tw from '../lang/tw'
import en from '../lang/en'

const i18n = createI18n({
  locale: 'tw',
  fallbackLocale: 'tw',
  messages: {
    tw,
    en
  }
})
export default i18n