import * as i18n from './i18n'

describe('infer language from navigator.langages array', () => {
  let languageGetter: jest.SpyInstance;

  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'languages', 'get')
    jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('')
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
  let languageGetter: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(window.navigator, 'languages', 'get').mockReturnValue([])
    languageGetter = jest.spyOn(window.navigator, 'language', 'get')
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
