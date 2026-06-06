import { test, expect } from '@playwright/test'
import { openPlayground } from '../helpers/run-helpers'

test.describe('run integrity', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
  })

  test('should see app running', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Mijnenveger/)
  });

  test('should access game board', async ({ page }) => {
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible()
  });

  /*
  test('should flag first cell', async ({ page }) => {
    const leftTopButton = page.getByRole('gridcell').first()
    // set flag
    leftTopButton.click({delay: 500})
    await expect(leftTopButton).toHaveClass(/flag/)
    // remove flag
    leftTopButton.click({delay: 500})
    await expect(leftTopButton).not.toHaveClass(/flag/)
  })
  */
})
