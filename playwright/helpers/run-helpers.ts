import { Page } from '@playwright/test'
import { dataPath } from '../_project'
import { AppConfig } from '../../src/common/app.d'
import { GameState } from '../../src/common/game.d'
import { DEFAULTS } from '../../src/common/defaults'

export const testUrl = 'http://localhost:4173'

export const getConfigurationData = async (page: Page): Promise<AppConfig> => {
  const localData = await page.evaluate(() => localStorage.getItem('mv-config'))
  const localCfg = JSON.parse(localData || '')
  return { ...DEFAULTS, ...localCfg }
}

export const getGameData = async (page: Page): Promise<GameState> => {
  const localData = await page.evaluate(() => localStorage.getItem('mv-game'));
  return JSON.parse(localData || '')
}

export const writeStorageState = async (page: Page): Promise<void> => {
  await page.context().storageState({ path: dataPath })
}

export const sleep = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export const openPlayground = async (page: Page): Promise<void> => {
  await page.goto(testUrl)
  // close intro animation
  await page.getByRole('button').click()
}

export const visitAboutScreen = async (page: Page): Promise<void> => {
  await page.getByTitle('Description').click()
  // when click has fully been processed, time can be measured
  await sleep(10)
}

export const visitConfigurationScreen = async (page: Page): Promise<void> => {
  await page.getByTitle('Settings').click()
  // when click has fully been processed, time can be measured
  await sleep(10)
}

export const visitPlayground = async (page: Page): Promise<void> => {
  await page.getByTitle('To Game').click()
  // when click has fully been processed, time can be measured
  await sleep(10)
}
