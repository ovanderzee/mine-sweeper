import { DEFAULTS } from  './defaults'
import { AppConfig, AppSubConfig } from './app.d'
import { GameState, ScoreItem } from './game.d'
import { refineScores, stripScores } from './scoring'

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
      const updatable: AppSubConfig = stored ? JSON.parse(stored) : {}
      data = { ...DEFAULTS, ...updatable }
    } catch {
      console.error('Invalid configuration found, replace by defaults...')
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

  eraseGame: () => {
    localStorage.removeItem('mv-game')
  },
  get game(): GameState | null {
    const stored = localStorage.getItem('mv-game')
    let data: GameState | null
    try {
      data = stored ? JSON.parse(stored) : null
    } catch {
      console.error('Invalid game found, start new game...')
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
    localStorage.removeItem('mv-victory')
  },
  get scores(): ScoreItem[] {
    const stored = localStorage.getItem('mv-victory')
    let data: ScoreItem[]
    try {
      const bareData = stored ? JSON.parse(stored) : []
      data = refineScores(bareData)
    } catch {
      console.error('Invalid scorelist found, start with new list...')
      data = []
    }
    return data
  },
  set scores(data: ScoreItem[]) {
    if (data?.length) {
      const bareData = stripScores(data)
      const storeable = JSON.stringify(bareData)
      localStorage.setItem('mv-victory', storeable)
    } else {
      this.eraseScores()
    }
  }
}

export default storage
