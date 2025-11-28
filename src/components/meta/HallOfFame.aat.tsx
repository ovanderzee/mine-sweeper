import { beforeEach, describe, expect, it } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { renderInApp } from './../../__mocks__/aat-helpers'
import { liveScores } from './../../__mocks__/scores'
import storage from './../../common/storage'

import HallOfFame from './HallOfFame'

describe('The hall-of-fame page sidebar', () => {

  it('should offer navigation to About page', async () => {
    const screen = await renderInApp(<HallOfFame/>)
    const navButton = screen.getByTitle('Description')

    await expect.element(navButton).toBeInTheDocument()
  })

  it('should offer navigation to Configure page', async () => {
    const screen = await renderInApp(<HallOfFame/>)
    const navButton = screen.getByTitle('Settings')

    await expect.element(navButton).toBeInTheDocument()
  })

  it('should offer navigation to Game page', async () => {
    const screen = await renderInApp(<HallOfFame/>)
    const navButton = screen.getByTitle('Return to Game')

    await expect.element(navButton).toBeInTheDocument()
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

  it('should show details in a popover, with a livecycle', async () => {
    const buttons = screen.getByRole('list').getByRole('button')
    const popover = screen.getByRole('status')

    // hidden initially
    expect(popover).not.toBeInTheDocument()

    // appear
    const firstButton = buttons.first()
    await firstButton.click()
    const popoverIdentifier = popover.getByText(/required turns/i)
    const firstRank = firstButton.getByRole('img').getByText('1', { exact: true })

    expect(popover).toBeInTheDocument()
    expect(popoverIdentifier).toBeInTheDocument()
    expect(firstRank).toBeInTheDocument()

    // overwrite
    const lastButton = buttons.last()
    await lastButton.click()
    const popoverIdentifier2 = popover.getByText(/required turns/i)
    const lastRank = lastButton.getByText(String(buttons.length), { exact: true })

    expect(popover).toBeInTheDocument()
    expect(popoverIdentifier2).toBeInTheDocument()
    expect(lastRank).toBeInTheDocument()

    // dismiss
    await screen.getByRole('heading').click()

    expect(popover).not.toBeInTheDocument()
  })
})
