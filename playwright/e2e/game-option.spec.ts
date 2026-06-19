import { test, expect, Page } from '@playwright/test'
import { openPlayground } from '../helpers/run-helpers'
import { applyNewGame, applyReplayGame } from '../helpers/game-helpers'


test.describe('new game and replay', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
    const firstCell = await page.getByRole('gridcell').first()
    await expect(firstCell).toHaveClass(/pristine/)
    await firstCell.click()
    await expect(firstCell).toHaveClass(/touched/)
  })

  const proceed = async (page: Page): Promise<void> => {
    const consentBtn = await page.getByRole('dialog').getByRole('button', {name: 'OK'})
    await consentBtn.click()
  }

  test('should start a new game on the playground', async ({ page }) => {
    await applyNewGame(page)
    await proceed(page)

    const firstCell2 = await page.getByRole('gridcell').first()
    await expect(firstCell2).toHaveClass(/pristine/)
  })

  test('should restart the game on the playground', async ({ page }) => {
    await applyReplayGame(page)
    await proceed(page)

    const firstCell2 = await page.getByRole('gridcell').first()
    await expect(firstCell2).toHaveClass(/pristine/)
  })
})
