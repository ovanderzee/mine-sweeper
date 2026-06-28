import { ScoreItem } from './game.d'
import { SCORE_RADIX } from './constants'

const updater = () => {

  const victoryStorage = localStorage.getItem('mv-victory')
  if (victoryStorage) {
    const scores: ScoreItem[] = JSON.parse(victoryStorage)
    const converted = scores.map((s: ScoreItem) => {
      const thirdDecimal = Number(s.code.charAt(2)) * 2
      const newCode = s.code.substring(0,2) + thirdDecimal.toString(SCORE_RADIX) + s.code.substring(3)
      s.code = newCode
      return s
    })

    localStorage.setItem('mv-victories', JSON.stringify(converted))
    localStorage.removeItem('mv-victory')
    console.log('Scorelist updated to use intermediate levels.')
  }

}

export default updater
