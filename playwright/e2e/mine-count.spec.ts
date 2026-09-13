import { test, expect } from '@playwright/test'
import { openApp, exitIntroScreen, openPlayground, visitConfigurationScreen, sleep } from '../helpers/run-helpers'
import { DEFAULTS } from  '../../src/common/defaults'
import { CellState } from '../../src/common/game.d'


/**
  mine-count must be right when:
  - change of configuration
  - retrieved from storage
  - defaults used as-is

  now:
  configuration is stored when it is changed
  configuration is used from context
  mine-count is calculated when context receives configuration change
 */


test.describe('different ways to receive the configuration', async () => {

  test('should show an implicit default', async ({ page }) => {
    await openApp(page)
    await page.evaluate(() => localStorage.removeItem('mv-config'))
    await exitIntroScreen(page)
    // to render playground
    sleep(10)

    const storedConfig = await page.evaluate(() => localStorage.getItem('mv-config'))
    const initialConfig = storedConfig && JSON.parse(storedConfig)
    expect(initialConfig).toBe(null)

    const storedGame = await page.evaluate(() => localStorage.getItem('mv-game'))
    const initialGame = storedGame && JSON.parse(storedGame)
    expect(initialGame.board.length).toBe(DEFAULTS.BOARD_SIZE)

    const minesCounted = initialGame.board.flat().filter((c: CellState) => c.fill > 8).length
    expect(minesCounted).toBe(DEFAULTS.MINE_COUNT)
  })

  test('should show a stored value', async ({ page }) => {
    const nineForConfig = {...DEFAULTS, BOARD_SIZE: 9, GAME_LEVEL: 9}

    await openApp(page)
    await page.evaluate(cfg => localStorage.setItem('mv-config', cfg), JSON.stringify(nineForConfig))
    await exitIntroScreen(page)
    // to render playground
    sleep(10)

    const storedConfig = await page.evaluate(() => localStorage.getItem('mv-config'))
    const revivedConfig = storedConfig && JSON.parse(storedConfig)
    expect(revivedConfig.BOARD_SIZE).toBe(nineForConfig.BOARD_SIZE)
    expect(revivedConfig.GAME_LEVEL).toBe(nineForConfig.GAME_LEVEL)
    expect(revivedConfig.MINE_COUNT).toBe(DEFAULTS.MINE_COUNT)

    const storedGame = await page.evaluate(() => localStorage.getItem('mv-game'))
    const newGame = storedGame && JSON.parse(storedGame)
    expect(newGame.board.length).toBe(DEFAULTS.BOARD_SIZE)

    const minesCounted = newGame.board.flat().filter((c: CellState) => c.fill > 8).length
    expect(minesCounted).toBe(DEFAULTS.MINE_COUNT)
  })

  test('should work by context', async ({ page }) => {
    await openPlayground(page)
    await visitConfigurationScreen(page)

    // duplicate for completeness here
    await page.getByLabel('Gameboard dimensions').fill('9')
    await page.getByLabel('Gamelevel').fill('9')
    await expect(page.getByText(/one mine to 6.7 fields/i)).toBeVisible()
    await expect(page.getByText(/game with 13 mines/i)).toBeVisible()
  })
})
