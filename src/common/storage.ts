import { DEFAULTS, NORMAL } from  './defaults'
import { AppConfig, AppSubConfig, AppSession, AppSubSession } from './app.d'
import { GameState, BareScoreItem, ScoreItem } from './game.d'
import { refineScores, stripScores } from './scoring'
import { sanitisedParse } from './functions'
import { SCORE_LIST_NAME } from './constants'


/*
  Interface for data storage.
  Store and retrieve object literals
  Config is always needed
  Game and Scores can be emptied
*/

const storage = {
  get config(): AppConfig {
    const stored = localStorage.getItem('mv-config')
    let data: AppConfig
    try {
      const updatable: AppSubConfig = stored ? sanitisedParse(stored) : {}
      data = { ...DEFAULTS, ...updatable }
    } catch {
      console.error('Invalid configuration found, use defaults...')
      data = DEFAULTS
    }
    return data
  },
  set config(data: AppSubConfig) {
    if (data) {
      const complete = { ...this.config, ...data }
      const storeable = JSON.stringify(complete)
      localStorage.setItem('mv-config', storeable)
    }
  },

  get session(): AppSession {
    const stored = sessionStorage.getItem('mv-session')
    let data: AppSession
    try {
      const updatable: AppSubSession = stored ? sanitisedParse(stored) : {}
      data = { ...NORMAL, ...updatable }
    } catch {
      console.error('Invalid session found, use normal view values...')
      data = NORMAL
    }
    return data
  },
  set session(data: AppSubSession) {
    if (data) {
      const complete = { ...this.session, ...data }
      const storeable = JSON.stringify(complete)
      sessionStorage.setItem('mv-session', storeable)
    }
  },

  eraseGame: () => {
    localStorage.removeItem('mv-game')
  },
  get game(): GameState | null {
    const stored = localStorage.getItem('mv-game')
    let data: GameState | null
    try {
      data = stored ? sanitisedParse(stored) : null
    } catch {
      console.error('Invalid game found, use a new game...')
      data = null
    }
    return data
  },
  set game(data: GameState | null) {
      if (data) {
        const storeable = JSON.stringify(data)
        localStorage.setItem('mv-game', storeable)
      } else {
        this.eraseGame()
      }
  },

  eraseScores: () => {
    localStorage.removeItem(`mv-${SCORE_LIST_NAME}`)
  },
  get scores(): ScoreItem[] {
    const stored = localStorage.getItem(`mv-${SCORE_LIST_NAME}`)
    let data: ScoreItem[]
    try {
      const bareData: BareScoreItem[] = stored ? sanitisedParse(stored) : []
      data = refineScores(bareData)
    } catch {
      console.error('Invalid scorelist found, use a new list...')
      data = []
    }
    return data
  },
  set scores(data: ScoreItem[]) {
    if (data?.length) {
      const bareData: BareScoreItem[] = stripScores(data)
      const storeable = JSON.stringify(bareData)
      localStorage.setItem(`mv-${SCORE_LIST_NAME}`, storeable)
    } else {
      this.eraseScores()
    }
  }
}

export default storage
