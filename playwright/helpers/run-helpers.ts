import { dataPath } from '../_project'

export const testUrl = 'http://localhost:4173'

export const writeStorageState = async (page): void => {
  await page.context().storageState({ path: dataPath })
}

export const openPlayground = async (page): void => {
  await page.goto(testUrl)
  // close intro animation
  await page.getByRole('button').click()
}

export const visitAboutScreen = async (page): void => await page.getByTitle('Description').click()

export const visitPlayground = async (page): void => await page.getByTitle('Return to Game').click()
