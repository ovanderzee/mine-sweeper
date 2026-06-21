import { test, expect } from '@playwright/test'
import { openPlayground, visitAboutScreen, visitPlayground, sleep } from '../helpers/run-helpers'

test.describe('run integrity', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
  })

  test('should see app running', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/MineSweep/)
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

test('should waste some milliseconds to allow things to happen in the website', async () => {
  const wait = 12
  const t0 = Date.now()
  await sleep(wait)
  const tDiff = Date.now() - t0
  const lag = 3

  await expect(tDiff).toBeGreaterThanOrEqual(wait)
  await expect(tDiff).toBeLessThan(wait + lag)
})
