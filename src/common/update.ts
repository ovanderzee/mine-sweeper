import { ScoreItem } from './game.d'
import { SCORE_RADIX } from './constants'
import { capitalise } from './functions'

/**
 Add updates at the end
 */
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

  const cfgMaxScoresStorage = localStorage.getItem('mv-config') || '{}'
  const cfgMaxScoresObject = JSON.parse(cfgMaxScoresStorage)
  if (Object.hasOwn(cfgMaxScoresObject, 'MAX_SCORES')) {
    delete cfgMaxScoresObject.MAX_SCORES
    localStorage.setItem('mv-config', JSON.stringify(cfgMaxScoresObject))
    console.log('Configuration cleaned up.')
  }

  const victoriesStorage = localStorage.getItem('mv-victories')
  if (victoriesStorage) {
    const scores: ScoreItem[] = JSON.parse(victoriesStorage)
    const converted = scores.map((s: ScoreItem) => {
      // one-bit values in code property
      const playModeString = capitalise(s.game?.playMode) || '--'
      const playModeNames = ['Normal', 'Bare', 'Sharp']
      const playModeNumber = playModeNames.findIndex(el => el === playModeString)
      const newCode = s.code.substring(0,3) + Math.max(playModeNumber, 0) + s.code.substring(3)
      // format score items
      s.code = newCode
      if (Object.hasOwn(s.game, 'playMode')) {
        if (playModeNumber > 0) {
          s.game.mode = playModeString
        }
        delete s.game?.playMode
      }
      s.game.level = parseInt(s.code.charAt(2), SCORE_RADIX)
      return s
    })

    localStorage.setItem('mv-won-games', JSON.stringify(converted))
//    localStorage.removeItem('mv-victories')
    console.log('Scorelist updated to replay with right playmode.')
  }
}

export default updater
