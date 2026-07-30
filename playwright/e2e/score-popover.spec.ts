import { test, expect, Page, Locator } from '@playwright/test'
import { openPlayground, visitHallOfFameScreen, storeScoreData} from '../helpers/run-helpers'
import { liveScores } from '../../src/__mocks__/scores'
import { BareScoreItem } from '../../src/common/game.d'
import { DEFAULTS } from '../../src/common/defaults'

interface EachOption {
 scores?: BareScoreItem[]
 opener?: Locator
}

const beforeIt = async (page: Page, options: EachOption) => {
  const scoresList = options.scores || liveScores
  const openerLocation = options.opener || page.getByRole('list').getByRole('button').first()
  await openPlayground(page)
  storeScoreData(page, scoresList)
  await visitHallOfFameScreen(page)
  const openerButton = await openerLocation
  const scorePopover = await page.getByRole('status')
  return [openerButton, scorePopover]
}

test.describe('ScorePopover opening', () => {
  test('should show a score popover when clicking a score list item', async ({ page }) => {
    const [listButton, popover] = await beforeIt(page, {})

    await expect(popover).not.toBeVisible()
    await listButton.click()
    await expect(popover).toBeVisible()
  })

  test('should show a score popover when clicking a score graph item', async ({ page }) => {
    const [graphButton, popover] = await beforeIt(page, {opener: page.locator('g.data-point').last().getByRole('button')})

    await expect(popover).not.toBeVisible()
    await graphButton.click()
    await expect(popover).toBeVisible()
  })
})

test.describe('ScorePopover main buttons', () => {

  test('should not show same score in the score popover when clicking delete ', async ({ page }) => {
    const [listButton, popover] = await beforeIt(page, {scores: [liveScores[1], liveScores[liveScores.length - 1]]})
    const listButtonDateValue = await listButton.locator('header h4').getAttribute('data-date')

    await listButton.click()
    await expect(popover).toBeVisible()

    // listButton-data === popover-data
    const popoverDateValue = await popover.locator('header h4').getAttribute('data-date')
    await expect(popoverDateValue).toBe(listButtonDateValue);

    // delete - data gone
    const deleteButton = await popover.getByRole('button', {name: 'Delete'})
    await deleteButton.click()

    const popoverDateValue2 = await popover.locator('header h4').getAttribute('data-date')
    await expect(popoverDateValue).not.toBe(popoverDateValue2)

    // delete last score item
    await deleteButton.click()
    await expect(popover).not.toBeVisible()
    await expect(page.getByRole('heading', { name: 'No scores yet' })).toBeVisible()
  })

  const highLevelScore = {
    "code":"9980Aw0RlSuDrn4JGWLG0h5Ig","date":1758554592365,"user":"FareSee",
    "game":{"cells":81,"mines":11,"effort":{"least":10,"most":43},"level":8},
    "play":{"moves":12,"duration":47.773},
    "score":{"efficiency":0.8333,"speed":0.2512,"points":209}
  }

  test('should make changes to the app configuration', async ({ page }) => {
    const [listButton, popover] = await beforeIt(page, {scores: [highLevelScore]})
    await page.evaluate((DEFAULTS) => localStorage.setItem('mv-config', JSON.stringify(DEFAULTS)), DEFAULTS)

    await listButton.click()
    const replayButton = await popover.getByRole('button', {name: 'Replay'})
    await replayButton.click()
    const currConfig = await page.evaluate(() => localStorage.getItem('mv-config'))
    const adaptedConfig = currConfig ? JSON.parse(currConfig) : DEFAULTS
    expect (adaptedConfig.BOARD_SIZE).not.toBe(DEFAULTS.BOARD_SIZE)
    expect (adaptedConfig.GAME_LEVEL).not.toBe(DEFAULTS.GAME_LEVEL)
  })
})

test.describe('ScorePopover navigation buttons', () => {

  test('should not show same score-points when clicking the Back and Forth buttons', async ({ page }) => {
    const [listButton, popover] = await beforeIt(page, {scores: [liveScores[0], liveScores[9]]})
    await listButton.click()
    await expect(popover).toBeVisible()

    const dateValue = await popover.locator('header h4').getAttribute('data-date')
    expect(dateValue).toBe(liveScores[0].date.toString())

    const forthButton = await popover.getByTitle('Forth')
    expect(forthButton).toBeEnabled()

    await forthButton.click()
    const dateValue2 = await popover.locator('header h4').getAttribute('data-date')
    expect(dateValue2).toBe(liveScores[9].date.toString())

    const backButton = await popover.getByTitle('Back')
    expect(backButton).toBeEnabled()

    await backButton.click()
    const dateValue3 = await popover.locator('header h4').getAttribute('data-date')
    expect(dateValue3).toBe(liveScores[0].date.toString())

  })
})
