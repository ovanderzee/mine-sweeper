import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { Locator, userEvent } from 'vitest/browser'
import { renderWithProvider, renderWithContext, renderWithApp } from './../../__mocks__/aat-helpers'
import { liveScores } from './../../__mocks__/scores'
import storage from './../../common/storage'
import { preventReloadByEnter } from './../../common/functions'
import { sequenceFillData } from './../../common/scoring'
import { ScoreItem } from './../../common/game.d'
import HallOfFame from './HallOfFame'

describe('The hall-of-fame page sidebar', () => {
  let screen: RenderResult

  beforeEach(async () => screen = await renderWithProvider(<HallOfFame/>))

  it('should offer navigation to About page', () => {
    expect(screen.getByTitle('Description')).toBeInTheDocument()
  })

  it('should offer navigation to Configure page', () => {
    expect(screen.getByTitle('Settings')).toBeInTheDocument()
  })

  it('should offer navigation to Game page', () => {
    expect(screen.getByTitle('Return to Game')).toBeInTheDocument()
  })

})

describe('The hall-of-fame-page clear list button', () => {
  let screen: RenderResult

  beforeEach(async () => {
    storage.scores = liveScores as ScoreItem[]
    screen = await renderWithProvider(<HallOfFame/>)
  })

  it('should instantaneously remove scores when confirmed', async () => {
    const button = screen.getByTitle('Clear List')
    await button.click()

    const dialog = screen.getByText(/Do you want to clear the score list\?/i)
    expect(dialog).toBeInTheDocument()
    const confirmBtn = screen.getByText('OK')
    await confirmBtn.click()

    expect(storage.scores.length).toBe(0)
  })

  it('should not remove scores when cancelled', async () => {
    const button = screen.getByTitle('Clear List')
    await button.click()

    const dialog = screen.getByText(/Do you want to clear the score list\?/i)
    expect(dialog).toBeInTheDocument()
    const cancelBtn = screen.getByText('Cancel')
    await cancelBtn.click()

    expect(storage.scores.length).toBe(liveScores.length)
  })

})

describe('The hall-of-fame-page scores', () => {
  let screen: RenderResult

  beforeEach(async () => {
    storage.scores = liveScores as ScoreItem[]
    screen = await renderWithProvider(<HallOfFame/>)
  })

  it('should show the best scores with a badge', () => {
    const theBest = screen.getByRole('list').getByRole('img')
    expect(theBest.length).toBe(10)
  })

  it('should classify the most recent score with "latest"', () => {
    const theLatest = screen.getByRole('list').getByLabelText('latest')
    expect(theLatest.length).toBe(1)
  })

  it('should show details in popover lifecycle', async () => {
    const buttons = screen.getByRole('list').getByRole('button')
    const popover = screen.getByRole('status')

    // hidden initially
    expect(popover).not.toBeInTheDocument()

    // appear
    const firstButton = buttons.first()
    await firstButton.click()
    const popoverIdentifier = popover.getByText(/req\. turns/i)
    const firstPoints = storage.scores[0].score.points.toString()
    const firstText = firstButton.getByText(firstPoints, { exact: true })

    expect(popover).toBeInTheDocument()
    expect(popoverIdentifier).toBeInTheDocument()
    expect(firstText).toBeInTheDocument()

    // overwrite
    const lastButton = buttons.last()
    await lastButton.click()
    const popoverIdentifier2 = popover.getByText(/req\. turns/i)
    const lastPoints = storage.scores[buttons.length - 1].score.points.toString()
    const lastText = lastButton.getByText(lastPoints, { exact: true })

    expect(popover).toBeInTheDocument()
    expect(popoverIdentifier2).toBeInTheDocument()
    expect(lastText).toBeInTheDocument()

    // dismiss by clicking somewhere else
    await screen.getByRole('heading').click()

    expect(popover).not.toBeInTheDocument()
  })
})

describe('The hall-of-fame-page list sorting', () => {
  let screen: RenderResult,
    selectX: Locator,
    items: Locator

  const firstItem = (qs: string): HTMLElement | null | undefined => items.first().query()?.querySelector(qs)
  const lastItem = (qs: string): HTMLElement | null | undefined => items.last().query()?.querySelector(qs)

  const firstEntry = (qs: string): string | undefined => firstItem(qs)?.textContent
  const lastEntry = (qs: string): string | undefined => lastItem(qs)?.textContent

  beforeEach(async () => {
    storage.scores = liveScores as ScoreItem[]
    screen = await renderWithProvider(<HallOfFame/>)
    selectX = screen.getByLabelText('show')
    items = screen.getByRole('list').getByRole('button')
  })

  it('should sort on user-points descending', async () => {
    // liveScores is sorted by rank
    const scoreUsers = liveScores.map(ls => ls.user)
    const uniqueUsers = [...new Set(scoreUsers)]
    const worstUser = uniqueUsers[uniqueUsers.length - 1]

    await userEvent.selectOptions(selectX, 'user')

    const bestUser = firstEntry('.user')
    const bestUserBest = firstEntry('.points')
    const worstUserBestItem = items.filter({ hasText: worstUser }).first().query()!
    const worstUserBest = worstUserBestItem.querySelector('.points')?.textContent

    expect(bestUser).not.toBe(worstUser)
    expect(Number(bestUserBest)).toBeGreaterThan(Number(worstUserBest))
  })

  it('should sort on date descending', async () => {
    await userEvent.selectOptions(selectX, 'date')

    const recent = firstItem('.date')?.dataset.date
    const early = lastItem('.date')?.dataset.date

    expect(Number(recent)).toBeGreaterThan(Number(early))
  })

  it('should sort on rank ascending', async () => {
    await userEvent.selectOptions(selectX, 'rank')

    const best = items.first().getByRole('heading').getByRole('img').getByText('1')
    const worst = items.last().getByRole('heading', { name: liveScores.length.toString() })

    expect(best).toBeInTheDocument()
    expect(worst).toBeInTheDocument()
  })

  it('should sort on efficiency descending', async () => {
    await userEvent.selectOptions(selectX, 'efficiency')

    const best = firstEntry('.efficiency :last-child')
    const worst = lastEntry('.efficiency :last-child')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on speed descending', async () => {
    await userEvent.selectOptions(selectX, 'speed')

    const best = firstEntry('.speed :last-child')
    const worst = lastEntry('.speed :last-child')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on level descending', async () => {
    await userEvent.selectOptions(selectX, 'level')

    const best = firstEntry('.level :last-child')
    const worst = lastEntry('.level :last-child')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on mines ascending', async () => {
    await userEvent.selectOptions(selectX, 'mines')

    const best = firstEntry('.mines :last-child')
    const worst = lastEntry('.mines :last-child')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on fields ascending', async () => {
    await userEvent.selectOptions(selectX, 'fields')

    const best = firstEntry('.cells :last-child')
    const worst = lastEntry('.cells :last-child')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on turns ascending', async () => {
    await userEvent.selectOptions(selectX, 'turns')

    const best = firstEntry('.moves :last-child')
    const worst = lastEntry('.moves :last-child')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on duration ascending', async () => {
    await userEvent.selectOptions(selectX, 'duration')

    const best = firstEntry('.duration :last-child')
    const worst = lastEntry('.duration :last-child')

    expect(parseFloat(best || '0')).toBeLessThan(parseFloat(worst || '0'))
  })

})

describe('The hall-of-fame-page popover buttons', () => {

  it('should delete one score with button in popover', async () => {
    const screen = await renderWithProvider(<HallOfFame/>)
    const scoresCount = storage.scores.length

    const firstListButton = screen.getByRole('list').getByRole('button').first()
    await firstListButton.click()
    const popover = screen.getByRole('status')
    const deleteButton = popover.getByRole('button').getByText('Delete')
    await deleteButton.click()

    expect(popover).not.toBeInTheDocument()
    expect(storage.scores.length).toBe(scoresCount - 1)
  })

  it('should replay with button in popover', async () => {
    const screen = await renderWithApp('HallOfFame')

    const firstListButton = screen.getByRole('list').getByRole('button').first()
    await firstListButton.click()
    const popover = screen.getByRole('status')
    const replayButton = popover.getByRole('button').getByText('Replay')
    await replayButton.click()

    expect(popover).not.toBeInTheDocument()
    expect(firstListButton).not.toBeInTheDocument()
    // arrive at game
    const gridArea = screen.getByRole('grid')
    expect(gridArea).toBeInTheDocument()

    const boardFromScore = sequenceFillData(storage.scores[0].code)[0]
    const boardFromGame = storage.game!.board ? storage.game!.board : null
    expect(boardFromScore).toStrictEqual(boardFromGame)
  })
})

describe('Marking data', () => {

  it('should accept numbers broken with dot as input', async () => {
    const screen = await renderWithContext(<HallOfFame/>)
    const inputField = screen.getByTitle('Mark value').query()
    await inputField?.focus()

//     await userEvent.clear(inputField), werkt niet
    await userEvent.keyboard('12')
    await expect.element(inputField).toHaveDisplayValue('12')

    await userEvent.keyboard('.')
    await expect.element(inputField).toHaveDisplayValue('12.')

    await userEvent.keyboard('3')
    await expect.element(inputField).toHaveDisplayValue('12.3')
  })

  it('should accept numbers broken with comma as input', async () => {
    const screen = await renderWithContext(<HallOfFame/>)
    const inputField = screen.getByTitle('Mark value').query()
    await inputField?.focus()

    await userEvent.keyboard('12')
    await expect.element(inputField).toHaveDisplayValue('12')

    await userEvent.keyboard(',')
    await expect.element(inputField).toHaveDisplayValue('12.')

    await userEvent.keyboard('3')
    await expect.element(inputField).toHaveDisplayValue('12.3')
  })

  it('should call function to prevent submitting by text-inputs', async () => {
    // https://vitest.dev/guide/browser/#limitations
    vi.mock('./../../common/functions', { spy: true })
    const screen = await renderWithProvider(<HallOfFame/>)
    const formField = screen.getByTitle('Mark value').query()

    await formField?.focus()
    await userEvent.keyboard('{Enter}')

    expect(formField).toBeInTheDocument()
    expect(preventReloadByEnter).toHaveBeenCalled()
    expect(preventReloadByEnter).toHaveReturnedWith(true)
  })
})
