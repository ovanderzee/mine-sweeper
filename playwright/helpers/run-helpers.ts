import { dataPath } from '../_project'

export const testUrl = 'http://localhost:4173'

export const writeStorageState = async (page): void => {
  await page.context().storageState({ path: dataPath })
}

export const sleep = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export const openPlayground = async (page): void => {
  await page.goto(testUrl)
  // close intro animation
  await page.getByRole('button').click()
}

export const visitAboutScreen = async (page): void => {
  await page.getByTitle('Description').click()
  // when click has fully been processed, time can be measured
  await sleep(10)
}

export const visitPlayground = async (page): void => {
  await page.getByTitle('Return to Game').click()
  // when click has fully been processed, time can be measured
  await sleep(10)
}
