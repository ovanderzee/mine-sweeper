import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import { startHonourPageTesting, referAndNavigateTo, getStoredScores} from './../../__mocks__/helpers'
import { liveScores } from './../../__mocks__/scores'

describe('The hall-of-fame page sidebar', () => {
  beforeEach(() => {
    startHonourPageTesting()
  })

  test("should navigate to About page", () => {
    referAndNavigateTo.about()
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to Configure page", () => {
    referAndNavigateTo.config()
    const heading = screen.getByText(/The Challenge.../i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to Game board", () => {
    referAndNavigateTo.gameBoard()
    const cells = document.querySelectorAll('#playground button')
    expect(cells.length).toBe(36)
  })
})

describe('The hall-of-fame-page clear list button', () => {
  beforeEach(() => {
    startHonourPageTesting()
  })

  test("should instantaneously remove scores when confirmed", () => {
    localStorage.setItem('mv-scores', JSON.stringify(liveScores))
    expect(getStoredScores().length).toBe(liveScores.length)

    const button = screen.getByText(/⊘/i)
    fireEvent.click(button)

    const dialog = screen.getByText(/Do you want to clear the score list\?/i)
    expect(dialog).toBeInTheDocument()
    const confirmBtn = document.querySelector('dialog button.confirm') as HTMLButtonElement
    fireEvent.click(confirmBtn)

    expect(getStoredScores().length).toBe(0)
  })

  test("should not remove scores when cancelled", () => {
    localStorage.setItem('mv-scores', JSON.stringify(liveScores))
    expect(getStoredScores().length).toBe(liveScores.length)

    const button = screen.getByText(/⊘/i)
    fireEvent.click(button)

    const dialog = screen.getByText(/Do you want to clear the score list\?/i)
    expect(dialog).toBeInTheDocument()
    const cancelBtn = document.querySelector('dialog button.cancel') as HTMLButtonElement
    fireEvent.click(cancelBtn)

    expect(getStoredScores().length).toBe(liveScores.length)
  })
})
