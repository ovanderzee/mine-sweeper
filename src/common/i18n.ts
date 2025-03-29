import nederlands from './translations/nederlands.json'
import english from './translations/english.json'
import { Translation, Languages } from './app-types'

const translationLength = (translation: Translation) => Object.keys(translation)
  .map(group => Object.keys(group))
  .flat()
  .length
const assertEquality = translationLength(nederlands) === translationLength(english)

console.assert(
  assertEquality,
  'Translations have different number of entries',
)

const translationIds = Object.keys(Languages)

/**
  Try to match the preferred language
  window.navigator.languages can be one item or an array of items
*/
const inferLanguage = (): Languages => {
  const navigatorLanguages: string[] =
    Array.isArray(window.navigator.languages) && window.navigator.languages.length
      ? window.navigator.languages
      : [window.navigator.language]

  const availableLanguages: string[] = navigatorLanguages.map((lang) => lang.substr(0, 2))

  const commonLanguages: string[] = translationIds
    .filter(trans => availableLanguages.includes(trans))

  const languageMatch: string = commonLanguages.length
    ? commonLanguages[commonLanguages.length - 1]
    : translationIds[0]

  return languageMatch as Languages
}

export const defaultLanguage: Languages = inferLanguage()

export const texts: Record<string, Translation> = {
  nl: nederlands,
  en: english,
}
