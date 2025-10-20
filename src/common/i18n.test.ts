import { vi, MockInstance } from 'vitest'
import * as i18n from './i18n'

describe('infer language from navigator.languages array', () => {
  let languageGetter: MockInstance;

  beforeEach(() => {
    languageGetter = vi.spyOn(window.navigator, 'languages', 'get')
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('')
  })

  it('infer a minority language if possible', () => {
    languageGetter.mockReturnValue(['fr-FR', 'en-GB', 'nl-BE'])

    const currLang = i18n.inferLanguage()
    expect(currLang).toBe('nl')
  })

  it('infer a language from priority', () => {
    languageGetter.mockReturnValue(['fr-FR', 'nl-BE', 'en-GB'])

    const currLang = i18n.inferLanguage()
    expect(currLang).toBe('nl')
  })

  it('infer a common language when there is no match', () => {
    languageGetter.mockReturnValue(['de-AT', 'fr-FR'])

    const currLang = i18n.inferLanguage()
    expect(currLang).toBe('en')
  })
})

describe('infer language from navigator.language string', () => {
  let languageGetter: MockInstance;

  beforeEach(() => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue([])
    languageGetter = vi.spyOn(window.navigator, 'language', 'get')
  })

  it('use supplied language if possible', () => {
    languageGetter.mockReturnValue('nl-NL')

    const currLang = i18n.inferLanguage()
    expect(currLang).toBe('nl')
  })

  it('use english when no known language was supplied', () => {
    languageGetter.mockReturnValue('uk-UA')

    const currLang = i18n.inferLanguage()
    expect(currLang).toBe('en')
  })
})

describe('check translations sanity', () => {

  const keysNl = Object.keys(i18n.texts.nl)
  const keysEn = Object.keys(i18n.texts.en)

  it('all sections of translation have the same keys', () => {
    expect(keysNl.join()).toBe(keysEn.join())
  })

  it('all translations have the same keys', () => {
    keysNl.forEach((key) => {
      const textKeysNl = Object.keys(i18n.texts.nl[key])
      const textKeysEn = Object.keys(i18n.texts.en[key])

      expect(textKeysNl.join()).toBe(textKeysEn.join())
    })
  })
})
