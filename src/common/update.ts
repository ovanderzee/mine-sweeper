import { ScoreItem } from './game.d'
import { DEFAULTS } from './defaults'
import { SCORE_RADIX, SCORE_LIST_NAMES } from './constants'
import { capitalise, sanitisedParse } from './functions'
import { AppConfig, PlayMode } from './app.d'
import { rebuildGameData } from './scoring'

export const doubleGameLevel = () => {
  const victoryStorage = localStorage.getItem(`mv-${SCORE_LIST_NAMES[1]}`)
  if (victoryStorage) {
    try {
      const scores: ScoreItem[] = sanitisedParse(victoryStorage)
      const converted = scores.map((s: ScoreItem) => {
        const gameLevel = Number(s.code.charAt(2)) * 2
        const newCode = s.code.substring(0,2) + gameLevel.toString(SCORE_RADIX) + s.code.substring(3)
        s.code = newCode
        return s
      })

      localStorage.setItem(`mv-${SCORE_LIST_NAMES[2]}`, JSON.stringify(converted))
      localStorage.removeItem(`mv-${SCORE_LIST_NAMES[1]}`)
      console.log('Scorelist updated to use intermediate levels.')
    }
    catch(e) {
      console.error(e)
      console.log('New scorelist pending. Existing data were kept.')
    }
  }
}

export const removeMaxScores = () => {
  const cfgMaxScoresStorage = localStorage.getItem('mv-config') || '{}'
  if (cfgMaxScoresStorage.indexOf('MAX_SCORES') > 0) {
    try {
      const cfgMaxScoresObject = sanitisedParse(cfgMaxScoresStorage)
      delete cfgMaxScoresObject.MAX_SCORES
      localStorage.setItem('mv-config', JSON.stringify(cfgMaxScoresObject))
      console.log('Configuration cleaned up.')
    }
    catch(e) {
      console.error(e)
      console.log('Configuration cleanup failed. Not problematic.')
    }
  }
}

export const changePlayModeValues = () => {
  const victoriesStorage = localStorage.getItem(`mv-${SCORE_LIST_NAMES[2]}`)
  if (victoriesStorage) {
    const playModeNames = Object.values(PlayMode)

    /* CONFIGURATION */

    const configStorage = localStorage.getItem('mv-config')
    if (configStorage) {
      try {
        const config: AppConfig = { ...sanitisedParse(configStorage), ...DEFAULTS }

        const updPlayMode = capitalise(config.PLAY_MODE)
        config.PLAY_MODE = PlayMode[updPlayMode as keyof typeof PlayMode] || PlayMode.NORMAL

        localStorage.setItem('mv-config', JSON.stringify(config))
        console.log('Configuration updated.')
      }
      catch(e) {
        console.error(e)
        console.log('Configuration update failed. Visit the configuration page change the playmode setting.')
      }
    }

    /* SCORE-LIST */

    try {
      const scores: ScoreItem[] = sanitisedParse(victoriesStorage)
      const converted = scores.map((s: ScoreItem) => {
        // one-bit values in code property
        // @ts-ignore // error TS2339: Property 'playMode' does not exist on type 'GameScore'.
        const playModeString = capitalise(s.game?.playMode) || '--'
        const playModeNumber = playModeNames.indexOf(playModeString as unknown as PlayMode)
        const boundModeNumber = Math.max(playModeNumber, 0)
        const newCode = s.code.substring(0,3) + boundModeNumber + s.code.substring(3)
        s.code = newCode
        // format score items
        if (playModeNumber > 0) {
          s.game.mode = playModeString
        }
        // @ts-ignore // error TS2339: Property 'playMode' does not exist on type 'GameScore'.
        delete s.game?.playMode
        s.game.level = parseInt(s.code.charAt(2), SCORE_RADIX)
        return s
      })

      localStorage.setItem(`mv-${SCORE_LIST_NAMES[3]}`, JSON.stringify(converted))
      localStorage.removeItem(`mv-${SCORE_LIST_NAMES[2]}`)
      console.log('Scorelist updated to replay with right playmode.')
    }
    catch(e) {
      console.error(e)
      console.log('New scorelist pending. Existing data were kept.')
    }
  }
}

export const addBlankFillCount = () => {
  const wonGamesStorage = localStorage.getItem(`mv-${SCORE_LIST_NAMES[3]}`)
  if (wonGamesStorage) {

    try {
      const scores: ScoreItem[] = sanitisedParse(wonGamesStorage)
      const converted = scores.map((s: ScoreItem) => {
        const rgData = rebuildGameData(s.code)
        const flatBoard = rgData.board.flat()
        const countBlanks = flatBoard.filter(c => c.fill === 0).length
        const countPointers = flatBoard.filter(c => c.fill > 0 && c.fill < 9).length

        const calcTotal = countBlanks + countPointers + s.game.mines
        const cfgTotal = Math.pow( rgData.config['BOARD_SIZE'], 2 )
        if (calcTotal !== cfgTotal) {
          throw new Error(`FillType counts do not add up to board-size^2 for score ${s.code}. `)
        }

        s.game.blanks = countBlanks
        return s
      })

      localStorage.setItem(`mv-${SCORE_LIST_NAMES[4]}`, JSON.stringify(converted))
      localStorage.removeItem(`mv-${SCORE_LIST_NAMES[3]}`)
      console.log('Scorelist updated to keep more characteristic game data.')
    }
    catch(e) {
      console.error(e)
      console.log('New scorelist pending. Existing data were kept.')
    }
  }
}

/**
 Add updates at the end
 */
export default {
  doubleGameLevel,
  removeMaxScores,
  changePlayModeValues,
  addBlankFillCount,
}
