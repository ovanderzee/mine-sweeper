import updater from './update'
import { DEFAULTS } from './defaults'
import { ScoreItem } from './game.d'
import { AppConfig } from './app.d'

const inputScores = [
  {"code":"666AwiMIyPMpqRA","date":1783260975866,"user":"Gekweld","game":{"cells":36,"mines":4,"playMode":"Jakkes","effort":{"least":7,"most":22}},"play":{"moves":7,"duration":10.634},"score":{"efficiency":1,"speed":0.6583,"points":658}},
  {"code":"666AwkRlSvSw6RA","date":1783260763699,"user":"Gewoon","game":{"cells":36,"mines":4,"playMode":"normal","effort":{"least":5,"most":16}},"play":{"moves":5,"duration":8.3},"score":{"efficiency":1,"speed":0.6024,"points":602}},
  {"code":"666Aw3CMZpWyMSA","date":1783260676150,"user":"Geen PLAY_MODE in config","game":{"cells":36,"mines":4,"playMode":"normal","effort":{"least":9,"most":26}},"play":{"moves":9,"duration":16.466},"score":{"efficiency":1,"speed":0.5466,"points":547}},
  {"code":"666IwBlLCPLb-ZA","date":1783260802299,"user":"Geen Haar","game":{"cells":36,"mines":4,"playMode":"bare","effort":{"least":5,"most":13}},"play":{"moves":5,"duration":9.982},"score":{"efficiency":1,"speed":0.5009,"points":501}},
  {"code":"666Aw0RlTg6rqxA","date":1783260902985,"user":"Gesneden","game":{"cells":36,"mines":4,"playMode":"sharp","effort":{"least":6,"most":21}},"play":{"moves":8,"duration":13.836},"score":{"efficiency":0.75,"speed":0.5782,"points":434}}
]

const outputScores = [
  {"code":"6660AwiMIyPMpqRA","date":1783260975866,"user":"Gekweld","game":{"cells":36,"mines":4,"effort":{"least":7,"most":22},"mode":"Normal","level":6},"play":{"moves":7,"duration":10.634},"score":{"efficiency":1,"speed":0.6583,"points":658}},
  {"code":"6660AwkRlSvSw6RA","date":1783260763699,"user":"Gewoon","game":{"cells":36,"mines":4,"effort":{"least":5,"most":16},"mode":"Normal","level":6},"play":{"moves":5,"duration":8.3},"score":{"efficiency":1,"speed":0.6024,"points":602}}, // geen mode OK
  {"code":"6660Aw3CMZpWyMSA","date":1783260676150,"user":"Geen PLAY_MODE in config","game":{"cells":36,"mines":4,"effort":{"least":9,"most":26},"mode":"Normal","level":6},"play":{"moves":9,"duration":16.466},"score":{"efficiency":1,"speed":0.5466,"points":547}}, // geen mode
  {"code":"6661IwBlLCPLb-ZA","date":1783260802299,"user":"Geen Haar","game":{"cells":36,"mines":4,"effort":{"least":5,"most":13},"mode":"Bare","level":6},"play":{"moves":5,"duration":9.982},"score":{"efficiency":1,"speed":0.5009,"points":501}},
  {"code":"6662Aw0RlTg6rqxA","date":1783260902985,"user":"Gesneden","game":{"cells":36,"mines":4,"effort":{"least":6,"most":21},"mode":"Sharp","level":6},"play":{"moves":8,"duration":13.836},"score":{"efficiency":0.75,"speed":0.5782,"points":434}}
]


describe('LocalStorage updater', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update game-level in score code to doubled value with radix 18 ', () => {
    const testScore = inputScores[3] as ScoreItem
    localStorage.setItem('mv-victory', JSON.stringify([testScore]))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    updater()

    const victoriesStorage = localStorage.getItem('mv-victories')
    const resultScore: ScoreItem[] = victoriesStorage ? JSON.parse(victoriesStorage) : []
    if (resultScore.length) {
      expect(resultScore instanceof Array).toBe(true)
      expect(resultScore[0].code).toBe(outputScores[3].code)
      expect(consoleLogSpy).toHaveBeenCalledWith('Scorelist updated to use intermediate levels.')
    }
  })

  it('should remove MAX_SCORES configuration', () => {
    const testConfig = { ...DEFAULTS, 'MAX_SCORES': 31 } as AppConfig
    localStorage.setItem('mv-config', JSON.stringify(testConfig))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    updater()

    const configStorage = localStorage.getItem('mv-config') || '{}'
    const resultConfig: AppConfig = JSON.parse(configStorage)
    expect(resultConfig).toStrictEqual(DEFAULTS)
    expect(Object.hasOwn(resultConfig, 'BOARD_SIZE')).toBe(true)
    expect(Object.hasOwn(resultConfig, 'MAX_SCORES')).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith('Configuration cleaned up.')
  })

  it('should show gamelevel and rename playMode to mode in game section of score', () => {
    localStorage.setItem('mv-victories', JSON.stringify(inputScores))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    updater()

    const wonGamesStorage = localStorage.getItem('mv-won-games')
    const resultScore: ScoreItem[] = wonGamesStorage ? JSON.parse(wonGamesStorage) : []
    if (resultScore.length) {
      expect(resultScore instanceof Array).toBe(true)
      expect(resultScore).toStrictEqual(outputScores)
      expect(consoleLogSpy).toHaveBeenCalledWith('Scorelist updated to replay with right playmode.')
    }
  })

})
