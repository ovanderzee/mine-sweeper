import { beforeEach, describe, expect, it } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { Locator } from 'vitest/browser'
import { renderInApp } from './../../__mocks__/aat-helpers'
import { liveScores } from './../../__mocks__/scores'
import storage from './../../common/storage'

import HallOfFame from './HallOfFame'

describe('The hall-of-fame page sidebar', () => {
  let screen: RenderResult

  beforeEach(async () => screen = await renderInApp(<HallOfFame/>))

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
    storage.scores = liveScores
    screen = await renderInApp(<HallOfFame/>)
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
    storage.scores = liveScores
    screen = await renderInApp(<HallOfFame/>)
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
    const popoverIdentifier = popover.getByText(/required turns/i)
    const firstPoints = storage.scores[0].score.points.toString()
    const firstText = firstButton.getByText(firstPoints, { exact: true })

    expect(popover).toBeInTheDocument()
    expect(popoverIdentifier).toBeInTheDocument()
    expect(firstText).toBeInTheDocument()

    // overwrite
    const lastButton = buttons.last()
    await lastButton.click()
    const popoverIdentifier2 = popover.getByText(/required turns/i)
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
    panel: Locator,
    items: Locator

  const firstItem = (qs: string): HTMLElement | null | undefined => items.first().query()?.querySelector(qs)
  const lastItem = (qs: string): HTMLElement | null | undefined => items.last().query()?.querySelector(qs)

  const firstEntry = (qs: string): string | undefined => firstItem(qs)?.textContent
  const lastEntry = (qs: string): string | undefined => lastItem(qs)?.textContent

  beforeEach(async () => {
    storage.scores = liveScores
    screen = await renderInApp(<HallOfFame/>)
    panel = screen.getByRole('table')
    items = screen.getByRole('list').getByRole('button')
  })

  it('should sort on user-points descending', async () => {
    // liveScores is sorted by rank
    const scoreUsers = liveScores.map(ls => ls.user)
    const uniqueUsers = [...new Set(scoreUsers)]
    const worstUser = uniqueUsers[uniqueUsers.length - 1]

    await panel.getByText('user').click()

    const bestUser = firstEntry('.user')
    const bestUserBest = firstEntry('.points')
    const worstUserBestItem = items.filter({ hasText: worstUser }).first().query()!
    const worstUserBest = worstUserBestItem.querySelector('.points')?.textContent

    expect(bestUser).not.toBe(worstUser)
    expect(Number(bestUserBest)).toBeGreaterThan(Number(worstUserBest))
  })

  it('should sort on date descending', async () => {
    await panel.getByText('date').click()

    const recent = firstItem('.date')?.dataset.date
    const early = lastItem('.date')?.dataset.date

    expect(Number(recent)).toBeGreaterThan(Number(early))
  })

  it('should sort on rank ascending', async () => {
    await panel.getByText('rank').click()

    const best = items.first().getByRole('heading').getByRole('img').getByText('1')
    const worst = items.last().getByRole('heading', { name: liveScores.length.toString() })

    expect(best).toBeInTheDocument()
    expect(worst).toBeInTheDocument()
  })

  it.skip('should sort on efficiency descending', async () => {
    await panel.getByText('efficiency').click()

    const best = firstEntry('.efficiency')
    const worst = lastEntry('.efficiency')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })


  it.skip('should sort on speed descending', async () => {
    await panel.getByText('speed').click()

    const best = firstEntry('.speed')
    const worst = lastEntry('.speed')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on level descending', async () => {
    await panel.getByText('level').click()

    const best = firstEntry('.level')
    const worst = lastEntry('.level')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on mines ascending', async () => {
    await panel.getByText('mines').click()

    const best = firstEntry('.mines')
    const worst = lastEntry('.mines')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on fields ascending', async () => {
    await panel.getByText('fields').click()

    const best = firstEntry('.cells')
    const worst = lastEntry('.cells')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on turns ascending', async () => {
    await panel.getByText('turns').click()

    const best = firstEntry('.moves')
    const worst = lastEntry('.moves')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on duration ascending', async () => {
    await panel.getByText('duration').click()

    const best = firstEntry('.duration')
    const worst = lastEntry('.duration')

    expect(parseFloat(best || '0')).toBeLessThan(parseFloat(worst || '0'))
  })

})
