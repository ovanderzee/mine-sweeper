import DEFAULTS from './defaults'
import { AppConfig, AppSubConfig } from './app-types'
import { GameState, ScoreItem } from './game-types'

/*
  Interface for data storage.
  Store and retrieve object literals
  Config always exists and can be a change
  Game and Scores can be emptied
*/

const storage = {
  get config(): AppConfig {
      const stored = localStorage.getItem('mv-config')
      const data: AppSubConfig = stored ? JSON.parse(stored) : {}
      return { ...DEFAULTS, ...data }
  },
  set config(data: AppSubConfig) {
    if (data) {
      const complete = { ...this.config, ...data }
      const storeable = JSON.stringify(complete)
      localStorage.setItem('mv-config', storeable)
    }
  },
  eraseGame: () => {
    sessionStorage.removeItem('mv-game')
  },
  get game(): GameState | null {
      const stored = sessionStorage.getItem('mv-game')
      const data: GameState = stored ? JSON.parse(stored) : null
      return data
  },
  set game(data: GameState | null) {
      if (data) {
        const storeable = JSON.stringify(data)
        sessionStorage.setItem('mv-game', storeable)
      } else {
        this.eraseGame()
      }
  },
  eraseScores: () => {
    localStorage.removeItem('mv-scores')
  },
  get scores(): ScoreItem[] {
      const stored = localStorage.getItem('mv-scores')
      const data: ScoreItem[] = stored ? JSON.parse(stored) : []
      return data
  },
  set scores(data: ScoreItem[]) {
      if (data?.length) {
        const storeable = JSON.stringify(data)
        localStorage.setItem('mv-scores', storeable)
      } else {
        this.eraseScores()
      }
  }
}

export default storage
