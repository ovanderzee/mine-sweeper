import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { startPageTesting, referAndNavigateTo } from './../../__mocks__/specification-helpers'

describe('The meta pages', () => {
  beforeEach(() => {
    startPageTesting()
  })

  test("should navigate to About page", () => {
    referAndNavigateTo.about()
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to Configure page", () => {
    referAndNavigateTo.config()
    const heading = screen.getByText(/General Settings/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to HallOfFame page", () => {
    referAndNavigateTo.hallOfFame()
    const heading = screen.getByText(/Hall of Fame/i)
    expect(heading).toBeTruthy()
  })
})
