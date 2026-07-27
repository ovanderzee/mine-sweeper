import { test, expect } from '@playwright/test'
import { openPlayground, visitHallOfFameScreen, storeScoreData} from '../helpers/run-helpers'
import { liveScores } from '../../src/__mocks__/scores'

test.describe('HallOfFame screen', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
    await visitHallOfFameScreen(page)
  })

  test('should land on scorelist screen', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hall of Fame' })).toBeVisible()
  })
})

test.describe('HallOfFame interaction', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
    storeScoreData(page, liveScores)
    await visitHallOfFameScreen(page)
  })

  test('should show a score popover when clicking a score list item', async ({ page }) => {
    const listButton = await page.getByRole('list').getByRole('button').first()
    const popover = page.getByRole('status')

    await expect(popover).not.toBeVisible()
    await listButton.click()
    await expect(popover).toBeVisible()
  })

  test('should show a score popover when clicking a score graph item', async ({ page }) => {
    const graphButton = page.locator('g.data-point').last().getByRole('button')
    const popover = page.getByRole('status')

    await expect(popover).not.toBeVisible()
    await graphButton.click()
    await expect(popover).toBeVisible()
  })

})
