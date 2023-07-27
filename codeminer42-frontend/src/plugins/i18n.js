import { createI18n } from 'vue-i18n'

const defaultLocale = 'en'
const i18n = createI18n({
  locale: defaultLocale,
})

// add these two lines in a route change event function
setI18nLanguage(i18n, defaultLocale)
loadLocaleMessages(i18n, defaultLocale)

export default i18n

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}


export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./i18n-resources/${locale}.json`
  )
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)
}
