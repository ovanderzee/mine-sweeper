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

const translations = ['en', 'nl']

const navigatorLanguages =
  Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language]

const configuredLanguages = navigatorLanguages.map((lang) => lang.substr(0, 2))

const commonLanguages = translations.map((trans) =>
  configuredLanguages.find((lang) => lang === trans)
)

const optimalLanguage = commonLanguages.length
  ? commonLanguages[commonLanguages.length - 1]
  : translations[0]

const texts = {
  nl: nederlands,
  en: english,
}

const text = texts[optimalLanguage]

export default text
