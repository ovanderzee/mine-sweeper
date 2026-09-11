import { test, expect, Page, Locator } from '@playwright/test'
import { openPlayground, visitHallOfFameScreen, storeScoreData } from '../helpers/run-helpers'
import { liveScores } from '../../src/__mocks__/scores'
import { BareScoreItem } from '../../src/common/game.d'
import { DEFAULTS } from '../../src/common/defaults'

interface EachOption {
  scores?: BareScoreItem[]
  opener?: Locator
}

const beforeIt = async (page: Page, options: EachOption) => {
  const scoresList = options.scores || liveScores
  const openerLocation = options.opener || page.getByRole('list').getByRole('button')
  await openPlayground(page)
  storeScoreData(page, scoresList)
  await visitHallOfFameScreen(page)
  const opener = await openerLocation // button(s)
  const popover = await page.getByRole('status')
  const figure = await page.getByRole('status').getByRole('figure') // sequential content

  return {opener, popover, figure}
}

test.describe('ScorePopover opening', () => {
  test('should show a score popover when clicking a score list item', async ({ page }) => {
    const vars = await beforeIt(page, {})

    await expect(vars.popover).not.toBeVisible()
    await vars.opener.first().click()
    await expect(vars.popover).toBeVisible()
  })

  test('should show a score popover when clicking a score graph item', async ({ page, browserName }, info) => {
    test.skip(browserName === 'firefox', 'problem with click');
    const vars = await beforeIt(page, {opener: page.locator('g.data-point').last().getByRole('button')})

    await page.getByRole('main').getByRole('document').screenshot({ path: `${info.outputDir}/graph.png` });
    await expect(vars.popover).not.toBeVisible()
    await vars.opener.click()
    await expect(vars.popover).toBeVisible()
  })
})

test.describe('ScorePopover main buttons', () => {

  test('should not show same score in the score popover when clicking delete ', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'problem with listItemCount');
    const vars = await beforeIt(page, {scores: [liveScores[0], liveScores[liveScores.length - 1]]})

    // await page.screenshot({ path: `${info.outputDir}/hof-list.png`, fullPage: true });
    const listItems = await page.getByRole('list').getByRole('button')
    const listItemCount = await listItems.count()
    await expect(listItemCount).toBe(2)
    await vars.opener.first().click()
    await expect(vars.popover).toBeVisible()

    // listButton-data === popover-data
    const listDate = await vars.opener.first().locator('header h4').getAttribute('data-date')
    const figDate = await vars.figure.locator('header h4').getAttribute('data-date')
    await expect(figDate).toBe(listDate);

    // delete - data gone
    const deleteButton = await vars.figure.getByRole('button', {name: 'Delete'})
    await deleteButton.click()
    // await page.screenshot({ path: `${info.outputDir}/hof-dialog.png`, fullPage: true });
    const consentButton = await page.getByRole('dialog').getByRole('button').last() // , {name: 'OK'})
    await consentButton.click()

    const figure2 = await page.getByRole('status').getByRole('figure')
    await expect(figure2).not.toBe(vars.figure)

    // delete last score item
    const deleteButton2 = await figure2.getByRole('button', {name: 'Delete'})
    await expect(deleteButton2).not.toBe(deleteButton)
    await deleteButton2.click()
    // await page.screenshot({ path: `${info.outputDir}/hof-dialog2.png`, fullPage: true })
    const consentButton2 = await page.getByRole('dialog').getByRole('button').last() // , {name: 'OK'})
    await consentButton2.click()

    await expect(vars.popover).not.toBeVisible()
    const listItemCount3 = await page.getByRole('list').getByRole('button').count()
    await expect(listItemCount3).toBe(0)
    // await page.screenshot({ path: `${info.outputDir}/hof-empty-hall.png`, fullPage: true });
    await expect(page.getByRole('heading', { name: 'No scores yet' })).toBeVisible()
  })

  const highLevelScore = {
    "code":"9980Aw0RlSuDrn4JGWLG0h5Ig","date":1758554592365,"user":"FareSee",
    "game":{"cells":81,"blanks":29,"mines":11,"level":8,"effort":{"least":10,"most":43}},
    "play":{"moves":12,"duration":47.773},
    "score":{"efficiency":0.8333,"speed":0.2512,"points":209}
  }

  test('should make changes to the app configuration', async ({ page }) => {
    const vars = await beforeIt(page, {scores: [highLevelScore]})
    await page.evaluate((config) => localStorage.setItem('mv-config', JSON.stringify(config)), DEFAULTS)

    await vars.opener.click()
    const replayButton = await vars.figure.getByRole('button', {name: 'Replay'})
    await replayButton.click()
    const currConfig = await page.evaluate(() => localStorage.getItem('mv-config'))
    const adaptedConfig = currConfig ? JSON.parse(currConfig) : DEFAULTS
    expect (adaptedConfig.BOARD_SIZE).not.toBe(DEFAULTS.BOARD_SIZE)
    expect (adaptedConfig.GAME_LEVEL).not.toBe(DEFAULTS.GAME_LEVEL)
  })
})

test.describe('ScorePopover navigation buttons', () => {

  test('should not show same score-points when clicking the Back and Forth buttons', async ({ page }) => {
    const vars = await beforeIt(page, {scores: [liveScores[0], liveScores[9]]})
    await vars.opener.first().click()
    await expect(vars.popover).toBeVisible()

    const figDate = await vars.figure.locator('header h4').getAttribute('data-date')
    expect(figDate).toBe(liveScores[0].date.toString())

    const forthButton = await vars.figure.getByTitle('Forth')
    expect(forthButton).toBeEnabled()

    await forthButton.click()
    const figDate2 = await vars.figure.locator('header h4').getAttribute('data-date')
    expect(figDate2).toBe(liveScores[9].date.toString())

    const backButton = await vars.figure.getByTitle('Back')
    expect(backButton).toBeEnabled()

    await backButton.click()
    const figDate3 = await vars.figure.locator('header h4').getAttribute('data-date')
    expect(figDate3).toBe(figDate) // == liveScores[0].date.toString())
  })
})
