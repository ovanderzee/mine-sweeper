import { test, expect } from '@playwright/test'
import { openPlayground, visitHallOfFameScreen } from '../helpers/run-helpers'

test.describe('HallOfFame screen', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
    await visitHallOfFameScreen(page)
  })

  test('should land on scorelist screen', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hall of Fame' })).toBeVisible()
  })
})
