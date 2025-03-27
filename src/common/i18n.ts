import nederlands from './translations/nederlands'
import english from './translations/english'

const translationLength = (translation) => Object.keys(translation)
  .map(group => Object.keys(group))
  .flat()
  .length
const assertEquality = translationLength(nederlands) === translationLength(english)

console.assert(
  assertEquality,
  'Translations have different number of entries',
)

export const translations = {
  'en': 'English',
  'nl': 'Nederlands',
}

const translationIds = Object.keys(translations)

/**
  Try to match the preferred language
  window.navigator.languages can be one item or an array of items
*/
const inferLanguage = () => {
  const navigatorLanguages =
    Array.isArray(window.navigator.languages) && window.navigator.languages.length
      ? window.navigator.languages
      : [window.navigator.language]

  const availableLanguages = navigatorLanguages.map((lang) => lang.substr(0, 2))

  const commonLanguages = translationIds
    .filter(trans => availableLanguages.includes(trans))

  const languageMatch = commonLanguages.length
    ? commonLanguages[commonLanguages.length - 1]
    : translationIds[0]

  return languageMatch
}

export const defaultLanguage = inferLanguage()

export const texts = {
  nl: nederlands,
  en: english,
}
