import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './../../App'

describe('Introduction', () => {
  let
    button: HTMLButtonElement

  beforeEach(() => {
    render(<App />)
    button = screen.getByLabelText('skip to play')
  })

  afterEach(() => {
    vi.runAllTimers()
  })

  it('should end after any keystroke, since the button has focus',  () => {
    expect(button).toHaveFocus()
    expect(button).not.toHaveClass('ending')
    fireEvent.keyDown(button, {key: '*'})

    vi.advanceTimersByTimeAsync(20)
    expect(button).toHaveClass('ending')
  })

  it('should end after click', async () => {
    expect(button).not.toHaveClass('ending')
    fireEvent.click(button)

    vi.advanceTimersByTimeAsync(20)
    expect(button).toHaveClass('ending')
  })

  it('should end after animation ending', async () => {
    expect(button).not.toHaveClass('ending')
    fireEvent.animationEnd(button);

    vi.advanceTimersByTimeAsync(20)
    expect(button).toHaveClass('ending')
  })
})
