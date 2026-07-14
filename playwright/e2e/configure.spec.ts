import { test, expect } from '@playwright/test'
import { openPlayground, visitConfigurationScreen, getConfigurationData } from '../helpers/run-helpers'

test.describe('Configure form controls', () => {
  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
    await visitConfigurationScreen(page)
  })

  test('should land on config screen', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  })

  test('should specify info about the boardsize', async ({ page }) => {
    await page.getByLabel('Gameboard dimensions').fill('8')
    await expect(page.getByText('64 fields')).toBeVisible()
    await page.getByLabel('Gameboard dimensions').fill('12')
    await expect(page.getByText('144 fields')).toBeVisible()
  })

  test('should specify info about the gamelevel and mines', async ({ page }) => {
    await page.getByLabel('Gameboard dimensions').fill('9')
    await page.getByLabel('Gamelevel').fill('9')
    await expect(page.getByText(/one mine to 6.7 fields/i)).toBeVisible()
    await expect(page.getByText(/game with 13 mines/i)).toBeVisible()
  })

  test('should specify info about the playmode', async ({ page }) => {
    const normalMode = await page.getByLabel(/Normal/i)
    await normalMode.check()
    await expect(normalMode).toBeChecked()

    const bareMode = await page.getByLabel(/Bare/i)
    await bareMode.check();
    await expect(normalMode).not.toBeChecked()
    await expect(bareMode).toBeChecked()

    const sharpMode = await page.getByLabel(/Sharp/i)
    await sharpMode.check();
    await expect(normalMode).not.toBeChecked()
    await expect(bareMode).not.toBeChecked()
    await expect(sharpMode).toBeChecked()
  })

  test('should specify info about the translations', async ({ page }) => {
    const languageSelect = await page.getByLabel('Translations')
    await expect(languageSelect).toBeAttached()
    await expect(page.getByText(/choose your language/)).toBeVisible()

    await languageSelect.selectOption('Nederlands')
    await expect(page.getByText(/kies een taal/)).toBeVisible()
    await expect(languageSelect).not.toBeAttached()

    await page.getByLabel('Vertalingen').selectOption({value: 'en'})
    await expect(page.getByText(/choose your language/)).toBeVisible()
  })

  test('should specify info about the font-size', async ({ page }) => {
    await page.getByLabel('Zoom display').fill('15')
    await expect(page.getByText('font-size 15 pixels')).toBeVisible()
    await page.getByLabel('Zoom display').fill('27')
    await expect(page.getByText('font-size 27 pixels')).toBeVisible()
  })

  test('should find proof of changing the username', async ({ page }) => {
    await page.getByLabel('Name in scores').fill(`It's me!`)
    const cfg = await getConfigurationData(page)
    await expect(cfg.PLAYER_NAME).toBe(`It's me!`)
  })

  test('should find proof of verbosity on buttons', async ({ page }) => {
    // execute in landscape mode
    const verboseSwitch = await page.getByRole('checkbox', { name: 'verbose' })
    await expect(verboseSwitch).toBeVisible()
    await expect(verboseSwitch).toBeChecked()

    const useDefaultsOption = await page.getByTitle('Use Defaults')
    await expect(useDefaultsOption).toBeVisible()
    const verboseOnBB = await useDefaultsOption.boundingBox()

    await verboseSwitch.uncheck()
    await expect(useDefaultsOption).toBeVisible()
    await expect(verboseSwitch).toBeVisible()
    await expect(verboseSwitch).not.toBeChecked()
    const verboseOffBB = await useDefaultsOption.boundingBox()

    await verboseSwitch.check()
    await expect(verboseSwitch).toBeChecked()

    const verboseOnHeight = verboseOnBB?.height || 0
    const verboseOffHeight = verboseOffBB?.height || 0
    await expect(verboseOnHeight - verboseOffHeight).toBeGreaterThan(0)
  })

})
