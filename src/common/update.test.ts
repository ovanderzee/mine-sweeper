import updater from './update'
import { ScoreItem } from './game.d'


describe('LocalStorage updater', () => {
  beforeEach(() => {
    localStorage.clear()
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
      expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    } else {
      expect('fail').toBe(true)
    }
  })
})
