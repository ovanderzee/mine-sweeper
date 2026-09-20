import { Page } from '@playwright/test'
import { dataPath } from '../_project'
import { AppConfig } from '../../src/common/app.d'
import { GameState } from '../../src/common/game.d'
import { DEFAULTS } from '../../src/common/defaults'
import { SCORE_LIST_NAME } from '../../src/common/constants'

export const testUrl = 'http://localhost:4173'

export const getConfigurationData = async (page: Page): Promise<AppConfig> => {
  const localData = await page.evaluate(() => localStorage.getItem('mv-config'))
  const localCfg = JSON.parse(localData || '')
  return { ...DEFAULTS, ...localCfg }
}

export const getGameData = async (page: Page): Promise<GameState> => {
  const localData = await page.evaluate(() => localStorage.getItem('mv-game'))
  return JSON.parse(localData || '')
}

export const writeStorageState = async (page: Page): Promise<void> => {
  await page.context().storageState({ path: dataPath })
}

export const storeScoreData = async (page: Page, data: any): Promise<void> => {
  const box = {data, SCORE_LIST_NAME}
  await page.evaluate(box => {
    localStorage.setItem(`mv-${box.SCORE_LIST_NAME}`, JSON.stringify(box.data))
  }, box)
}

export const sleep = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export const openApp = async (page: Page): Promise<void> => {
  await page.goto(testUrl)
  // follow up using exitIntroScreen later on
}

export const exitIntroScreen = async (page: Page): Promise<void> => {
  // close intro animation, bridge crossfade
  await page.getByRole('button').click()
  await sleep(600)
}

export const openPlayground = async (page: Page): Promise<void> => {
  await openApp(page)
  await exitIntroScreen(page)
}

export const visitAboutScreen = async (page: Page): Promise<void> => {
  await page.getByTitle('Description').click()
  await sleep(10)
}

export const visitHallOfFameScreen = async (page: Page): Promise<void> => {
  await page.getByTitle('Hall of Fame').click()
  await sleep(10)
}

export const visitConfigurationScreen = async (page: Page): Promise<void> => {
  await page.getByTitle('Settings').click()
  await sleep(10)
}

export const visitPlayground = async (page: Page): Promise<void> => {
  await page.getByTitle('To Game').click()
  // when click has fully been processed, time can be measured
  await sleep(10)
}
