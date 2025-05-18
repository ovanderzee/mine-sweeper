import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import { startPageTesting } from './../../__mocks__/helpers'

describe('The meta pages', () => {
  beforeEach(() => {
    startPageTesting()
  })

  test("should navigate to About page", () => {
    const icon = screen.getByText(/\?/i)
    fireEvent.click(icon)
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to Configure page", () => {
    const icon = screen.getByText(/⚙/i)
    fireEvent.click(icon)
    const heading = screen.getByText(/General Settings/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to HallOfFame page", () => {
    const icon = screen.getByText(/\d×/i)
    fireEvent.click(icon)
    const heading = screen.getByText(/Hall of Fame/i)
    expect(heading).toBeTruthy()
  })
})
