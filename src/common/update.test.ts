import updater from './update'
import { DEFAULTS } from './defaults'
import { ScoreItem } from './game.d'
import { AppConfig } from './app.d'

describe('LocalStorage updater', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update game-level in score code to doubled value with radix 18 ', () => {
    const testScore = {code: '775kfcdjvgkerdbchjk'} as ScoreItem
    localStorage.setItem('mv-victory', JSON.stringify([testScore]))
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    updater()

    const victoriesStorage = localStorage.getItem('mv-victories')
    const resultScore: ScoreItem[] = victoriesStorage ? JSON.parse(victoriesStorage) : []
    if (resultScore.length) {
      expect(resultScore[0].code).toBe('77akfcdjvgkerdbchjk')
      expect(consoleLogSpy).toHaveBeenCalledWith('Scorelist updated to use intermediate levels.')
    } else {
      expect('fail').toBe(true)
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
})
