import update from './update'
import { DEFAULTS } from './defaults'
import { ScoreItem } from './game.d'
import { AppConfig } from './app.d'

const victoryScores = [
  {"code":"663AwiMIyPMpqRA","date":1783260975866,"user":"Gekweld","game":{"cells":36,"mines":4,"playMode":"Jakkes","effort":{"least":7,"most":22}},"play":{"moves":7,"duration":10.634},"score":{"efficiency":1,"speed":0.6583,"points":658}},
  {"code":"663AwkRlSvSw6RA","date":1783260763699,"user":"Gewoon","game":{"cells":36,"mines":4,"playMode":"normal","effort":{"least":5,"most":16}},"play":{"moves":5,"duration":8.3},"score":{"efficiency":1,"speed":0.6024,"points":602}},
  {"code":"663Aw3CMZpWyMSA","date":1783260676150,"user":"Geen PLAY_MODE in config","game":{"cells":36,"mines":4,"effort":{"least":9,"most":26}},"play":{"moves":9,"duration":16.466},"score":{"efficiency":1,"speed":0.5466,"points":547}},
  {"code":"663IwBlLCPLb-ZA","date":1783260802299,"user":"Geen Haar","game":{"cells":36,"mines":4,"playMode":"bare","effort":{"least":5,"most":13}},"play":{"moves":5,"duration":9.982},"score":{"efficiency":1,"speed":0.5009,"points":501}},
  {"code":"663Aw0RlTg6rqxA","date":1783260902985,"user":"Gesneden","game":{"cells":36,"mines":4,"playMode":"sharp","effort":{"least":6,"most":21}},"play":{"moves":8,"duration":13.836},"score":{"efficiency":0.75,"speed":0.5782,"points":434}}
]

const victoriesScores = [
  {"code":"666AwiMIyPMpqRA","date":1783260975866,"user":"Gekweld","game":{"cells":36,"mines":4,"playMode":"Jakkes","effort":{"least":7,"most":22}},"play":{"moves":7,"duration":10.634},"score":{"efficiency":1,"speed":0.6583,"points":658}},
  {"code":"666AwkRlSvSw6RA","date":1783260763699,"user":"Gewoon","game":{"cells":36,"mines":4,"playMode":"normal","effort":{"least":5,"most":16}},"play":{"moves":5,"duration":8.3},"score":{"efficiency":1,"speed":0.6024,"points":602}},
  {"code":"666Aw3CMZpWyMSA","date":1783260676150,"user":"Geen PLAY_MODE in config","game":{"cells":36,"mines":4,"effort":{"least":9,"most":26}},"play":{"moves":9,"duration":16.466},"score":{"efficiency":1,"speed":0.5466,"points":547}},
  {"code":"666IwBlLCPLb-ZA","date":1783260802299,"user":"Geen Haar","game":{"cells":36,"mines":4,"playMode":"bare","effort":{"least":5,"most":13}},"play":{"moves":5,"duration":9.982},"score":{"efficiency":1,"speed":0.5009,"points":501}},
  {"code":"666Aw0RlTg6rqxA","date":1783260902985,"user":"Gesneden","game":{"cells":36,"mines":4,"playMode":"sharp","effort":{"least":6,"most":21}},"play":{"moves":8,"duration":13.836},"score":{"efficiency":0.75,"speed":0.5782,"points":434}}
]

const wonGamesScores = [
  {"code":"6660AwiMIyPMpqRA","date":1783260975866,"user":"Gekweld","game":{"cells":36,"mines":4,"effort":{"least":7,"most":22},"level":6},"play":{"moves":7,"duration":10.634},"score":{"efficiency":1,"speed":0.6583,"points":658}},
  {"code":"6660AwkRlSvSw6RA","date":1783260763699,"user":"Gewoon","game":{"cells":36,"mines":4,"effort":{"least":5,"most":16},"level":6},"play":{"moves":5,"duration":8.3},"score":{"efficiency":1,"speed":0.6024,"points":602}}, // geen mode OK
  {"code":"6660Aw3CMZpWyMSA","date":1783260676150,"user":"Geen PLAY_MODE in config","game":{"cells":36,"mines":4,"effort":{"least":9,"most":26},"level":6},"play":{"moves":9,"duration":16.466},"score":{"efficiency":1,"speed":0.5466,"points":547}}, // geen mode
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
    localStorage.setItem('mv-victory', JSON.stringify(victoryScores))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    update.doubleGameLevel()

    const victoriesStorage = localStorage.getItem('mv-victories')
    const bareScores: ScoreItem[] = victoriesStorage ? JSON.parse(victoriesStorage) : []
    // refineScores not considered
    expect(bareScores instanceof Array).toBe(true)
    expect(bareScores).toStrictEqual(victoriesScores)
    expect(consoleLogSpy).toHaveBeenCalledWith('Scorelist updated to use intermediate levels.')
  })

  it('should remove MAX_SCORES configuration', () => {
    const testConfig = { ...DEFAULTS, 'MAX_SCORES': 31 } as AppConfig
    localStorage.setItem('mv-config', JSON.stringify(testConfig))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    update.removeMaxScores()

    const configStorage = localStorage.getItem('mv-config') || '{}'
    const resultConfig: AppConfig = JSON.parse(configStorage)
    expect(Object.hasOwn(resultConfig, 'BOARD_SIZE')).toBe(true)
    expect(Object.hasOwn(resultConfig, 'MAX_SCORES')).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith('Configuration cleaned up.')
  })

  it('should show gamelevel and rename playMode to mode in game section of score', () => {
    localStorage.setItem('mv-victories', JSON.stringify(victoriesScores))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    update.changePlayModeValues()

    const wonGamesStorage = localStorage.getItem('mv-won-games')
    const bareScores: ScoreItem[] = wonGamesStorage ? JSON.parse(wonGamesStorage) : []
    // refineScores not considered
    expect(bareScores instanceof Array).toBe(true)
    expect(bareScores).toStrictEqual(wonGamesScores)
    expect(consoleLogSpy).toHaveBeenCalledWith('Scorelist updated to replay with right playmode.')
  })

})
