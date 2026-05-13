import { test as setup, expect } from '@playwright/test'
import { testUrl, writeStorageState } from '../helpers/run-helpers'

setup('generated game and config', async ({ page }) => {
  await page.clock.install()
  // Perform steps generating data
  await page.goto(testUrl)
  // Wait for button for 3 seconds
  await page.clock.fastForward('00:03')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await page.getByRole('button').click()
  // Wait for button for 1 second
  // await page.clock.fastForward('00:01')
  // Store it.
  await writeStorageState(page)
});
