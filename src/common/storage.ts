import DEFAULTS from './defaults'
import { AppConfig, AppSubConfig } from './app-types'

/*
  Interface for data storage.
  Store and retrieve object literals
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
  }
}

export default storage
