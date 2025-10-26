import '@testing-library/jest-dom'
import { fireEvent, screen, getByText } from '@testing-library/react'
import storage from '../../common/storage'
import { startHonourPageTesting, referAndNavigateTo } from './../../__mocks__/specification-helpers'
import { newPortalLayer } from '../../__mocks__/render-helpers'
import { liveScores } from './../../__mocks__/scores'

describe('The hall-of-fame page sidebar', () => {
  beforeEach(() => {
    newPortalLayer('modal')
    startHonourPageTesting()
  })

  it('should navigate to About page', () => {
    referAndNavigateTo.about()
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  it('should navigate to Configure page', () => {
    referAndNavigateTo.config()
    const heading = screen.getByText(/The Challenge.../i)
    expect(heading).toBeTruthy()
  })

  it('should navigate to Game board', () => {
    referAndNavigateTo.gameBoard()
    const cells = document.querySelectorAll('#game-board button')
    expect(cells.length).toBe(36)
  })
})

describe('The hall-of-fame-page scores', () => {
  beforeEach(() => {
    storage.scores = liveScores
    startHonourPageTesting()
  })

  it('should show the best scores with a badge', () => {
    const theBest = document.querySelectorAll('li svg')
    expect(theBest.length).toBe(10)
  })

  it('should classify the most recent score with "latest"', () => {
    const theLatest = document.querySelectorAll('li.latest')
    expect(theLatest.length).toBe(1)
  })
})

describe('The hall-of-fame-page clear list button', () => {
  beforeEach(() => {
    storage.scores = liveScores
    startHonourPageTesting()
  })

  it('should instantaneously remove scores when confirmed', () => {
    expect(storage.scores.length).toBe(liveScores.length)

    const button = screen.getByTitle('Clear List')
    fireEvent.click(button)

    const dialog = screen.getByText(/Do you want to clear the score list\?/i)
    expect(dialog).toBeInTheDocument()
    const confirmBtn = document.querySelector('dialog button.confirm') as HTMLButtonElement
    fireEvent.click(confirmBtn)

    expect(storage.scores.length).toBe(0)
  })

  it('should not remove scores when cancelled', () => {
    expect(storage.scores.length).toBe(liveScores.length)

    const button = screen.getByTitle('Clear List')
    fireEvent.click(button)

    const dialog = screen.getByText(/Do you want to clear the score list\?/i)
    expect(dialog).toBeInTheDocument()
    const cancelBtn = document.querySelector('dialog button.cancel') as HTMLButtonElement
    fireEvent.click(cancelBtn)

    expect(storage.scores.length).toBe(liveScores.length)
  })
})

describe('The hall-of-fame-page list sorting', () => {
  let container: HTMLElement
  const firstItem = (qs: string): HTMLElement | null => document.querySelector(`li:first-of-type ${qs}`)
  const lastItem = (qs: string): HTMLElement | null => document.querySelector(`li:last-of-type ${qs}`)

  const firstEntry = (qs: string): string => {
    const elem = firstItem(qs)
    if (elem) return elem.textContent; else throw 'first element not found'
  }
  const lastEntry = (qs: string): string => {
    const elem = lastItem(qs)
    if (elem) return elem.textContent; else throw 'last element not found'
  }

  beforeEach(() => {
    storage.scores = liveScores
    startHonourPageTesting()
    container = document.querySelector('.legend')!
  })

  it('should sort on user-points descending', () => {
    const scoreUsers = liveScores.map(ls => ls.user)
    const uniqueUsers = [...new Set(scoreUsers)]
    const worstUser = uniqueUsers[uniqueUsers.length - 1]

    const button = getByText(container, 'user')
    fireEvent.click(button)

    const bestUserBest = firstEntry('.points')
    const worstUserItems: HTMLElement[] = screen.getAllByText(worstUser)
    const worstUserBestItem: HTMLElement | null | undefined = worstUserItems[0]?.parentElement?.parentElement
    const worstUserBest = worstUserBestItem?.querySelector('.points')?.textContent || NaN

    expect(Number(bestUserBest)).toBeGreaterThan(Number(worstUserBest))
  })

  it('should sort on date descending', () => {
    const button = getByText(container, 'date')
    fireEvent.click(button)

    const best = firstItem('.date')?.dataset.date
    const worst = lastItem('.date')?.dataset.date

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on rank ascending', () => {
    const button = getByText(container, 'rank')
    fireEvent.click(button)

    const best = firstEntry('.rank')
    const worst = lastEntry('.rank')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on efficiency descending', () => {
    const button = getByText(container, 'efficiency')
    fireEvent.click(button)

    const best = firstEntry('.efficiency')
    const worst = lastEntry('.efficiency')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on speed descending', () => {
    const button = getByText(container, 'speed')
    fireEvent.click(button)

    const best = firstEntry('.speed')
    const worst = lastEntry('.speed')

    expect(Number(best)).toBeGreaterThan(Number(worst))
  })

  it('should sort on mines ascending', () => {
    const button = getByText(container, 'mines')
    fireEvent.click(button)

    const best = firstEntry('.mines')
    const worst = lastEntry('.mines')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on fields ascending', () => {
    const button = getByText(container, 'fields')
    fireEvent.click(button)

    const best = firstEntry('.cells')
    const worst = lastEntry('.cells')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on turns ascending', () => {
    const button = getByText(container, 'turns')
    fireEvent.click(button)

    const best = firstEntry('.moves')
    const worst = lastEntry('.moves')

    expect(Number(best)).toBeLessThan(Number(worst))
  })

  it('should sort on duration ascending', () => {
    const button = getByText(container, 'duration')
    fireEvent.click(button)

    const best = firstEntry('.duration')
    const worst = lastEntry('.duration')

    expect(parseInt(best)).toBeLessThan(parseInt(worst))
  })

})
