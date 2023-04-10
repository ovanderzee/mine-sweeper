import { nederlands } from './translations/nederlands'
import { english } from './translations/english'

const tLen = (translation) => Object.keys(translation)
  .map(group => Object.keys(group))
  .flat()
  .length
const assertLength = tLen(nederlands) === tLen(english)
console.assert(
  assertLength,
  'Translations have different number of entries',
)

const translations = {
  'en': 'English',
  'nl': 'Nederlands',
}
const translationIds = Object.keys(translations)

/** Try to match the preferred language */
const inferLanguage = () => {
  const navigatorLanguages =
    Array.isArray(window.navigator.languages) && window.navigator.languages.length
      ? window.navigator.languages
      : [window.navigator.language]

  const availableLanguages = navigatorLanguages.map((lang) => lang.substr(0, 2))

  const commonLanguages = translationIds.map((trans) =>
    availableLanguages.find((lang) => lang === trans)
  ).filter(l => l)

  const languageMatch = commonLanguages.length
    ? commonLanguages[commonLanguages.length - 1]
    : translationIds[0]

  return languageMatch
}

const defaultLanguage = inferLanguage()

const texts = {
  nl: nederlands,
  en: english,
}

export { translations, defaultLanguage, texts }
