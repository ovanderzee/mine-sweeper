import { ScoreItem } from './game.d'
import { DEFAULTS } from './defaults'
import { SCORE_RADIX } from './constants'
import { capitalise } from './functions'
import { AppConfig, PlayMode } from './app.d'

/**
 Add updates at the end
 */
const updater = () => {

  const victoryStorage = localStorage.getItem('mv-victory')
  if (victoryStorage) {
    const scores: ScoreItem[] = JSON.parse(victoryStorage)
    const converted = scores.map((s: ScoreItem) => {
      const gameLevel = Number(s.code.charAt(2)) * 2
      const newCode = s.code.substring(0,2) + gameLevel.toString(SCORE_RADIX) + s.code.substring(3)
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
    const playModeNames = Object.values(PlayMode)

    /* CONFIGURATION */

    const configStorage = localStorage.getItem('mv-config')
    if (configStorage) {
      const config: AppConfig = { ...JSON.parse(configStorage), ...DEFAULTS }

      const updPlayMode = capitalise(config.PLAY_MODE)
      config.PLAY_MODE = PlayMode[updPlayMode as keyof typeof PlayMode] || PlayMode.NORMAL

      localStorage.setItem('mv-config', JSON.stringify(config))
      console.log('Configuration updated.')
    }

    /* SCORE-LIST */

    const scores: ScoreItem[] = JSON.parse(victoriesStorage)
    const converted = scores.map((s: ScoreItem) => {
      // one-bit values in code property
      const playModeString = capitalise(s.game?.playMode) || '--'
      const playModeNumber = playModeNames.indexOf(playModeString as unknown as PlayMode)
      const boundModeNumber = Math.max(playModeNumber, 0)
      const newCode = s.code.substring(0,3) + boundModeNumber + s.code.substring(3)
      s.code = newCode
      // format score items
      if (playModeNumber > 0) {
        s.game.mode = playModeString
      }
      delete s.game?.playMode
      s.game.level = parseInt(s.code.charAt(2), SCORE_RADIX)
      return s
    })

    localStorage.setItem('mv-won-games', JSON.stringify(converted))
    localStorage.removeItem('mv-victories')
    console.log('Scorelist updated to replay with right playmode.')
  }
}

export default updater
