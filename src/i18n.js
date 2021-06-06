const translations = ['en', 'nl']

const configuredLanguages = (navigator.languages || [navigator.language]).map(
  (lang) => lang.substr(0, 2)
)

const commonLanguages = translations.map((trans) =>
  configuredLanguages.find(trans)
)

const optimalLanguage = commonLanguages.length
  ? commonLanguages[commonLanguages.length]
  : translations[0]

const texts = {}

texts['nl'] = {
  common: {
    Minesweeper: 'Mijnenveger',
    'mine sweeper': 'mijnen veger',
    Mines: 'Mijnen',
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

export default text = texts[optimalLanguage]
