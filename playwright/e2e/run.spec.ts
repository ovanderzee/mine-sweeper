import { test, expect } from '@playwright/test'
import { openPlayground, visitAboutScreen, visitPlayground } from '../helpers/run-helpers'

test.describe('run integrity', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
  })

  test('should see app running', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Mijnenveger/)
  });

  test('should access game board', async ({ page }) => {
    // Expects page to have a heading with the name of the screen
    await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible()
  });

  test('should access the description screen', async ({ page }) => {
    await visitAboutScreen(page)
    await expect(page.getByRole('heading', {name: 'Description'})).toBeVisible()
  })

  test('should return to the playground screen', async ({ page }) => {
    await visitAboutScreen(page)
    await visitPlayground(page)
    await expect(page.getByRole('heading', {name: 'Playground'})).toBeVisible()
  })
})
