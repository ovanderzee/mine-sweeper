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

const texts = {}

texts['nl'] = {
  common: {
    Minesweeper: 'Mijnenveger',
    'mine sweeper': 'mijnen veger',
    Mines: 'Mijnen',
  },
  anim: {
    minesweeper_1: 'mijnen',
    minesweeper_2: 'veger',
  },
  scores: {},
  help: {},
  settings: {},
  nav: {
    'Hall of Fame': 'Beste Scores',
    'Clear List': 'Wis lijst',
    'New Game': 'Nieuw Spel',
    Replay: 'Speel Opnieuw',
    'Place Flag': 'Plaats Vlag',
    Settings: 'Instellingen',
    Help: 'Uitleg',
    Return: 'Terug',
  },
}

const text = texts[optimalLanguage]

export default text
