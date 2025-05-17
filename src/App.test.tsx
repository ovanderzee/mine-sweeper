import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('The app initially', () => {
  beforeEach(() => {
    render(<App />)
  })

  test("should show intro animation", () => {
    const skip = screen.getByText(/skip to game/i)
    expect(skip).toBeTruthy()
    const heading = screen.getByText(/mine.{0,0}sweeper/i)
    expect(heading).toBeTruthy()
  })

  test("should end intro animation by click and show game", () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const cells = document.querySelectorAll('button.pristine')
    expect(cells.length).toBe(36)
  })

  test("should end intro animation by animationEnd and show game", () => {
    const button = screen.getByRole('button')
    fireEvent.animationEnd(button)

    const cells = document.querySelectorAll('button.pristine')
    expect(cells.length).toBe(36)
  })
})

