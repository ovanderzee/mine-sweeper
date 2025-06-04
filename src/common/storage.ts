import DEFAULTS from './defaults'
import { AppConfig, AppSubConfig } from './app-types'
import { GameState } from './game-types'

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
      const complete = { ...this.config, ...data }
      const storeable = JSON.stringify(complete)
      localStorage.setItem('mv-config', storeable)
  },
  get game(): GameState | null {
      const stored = sessionStorage.getItem('mv-game')
      const data: GameState = stored ? JSON.parse(stored) : null
      return data
  },
  set game(data: GameState | null) {
      if (data) {
        const stored = JSON.stringify(data)
        sessionStorage.setItem('mv-game', stored)
      } else {
        sessionStorage.removeItem('mv-game')
      }
  }
}

export default storage
