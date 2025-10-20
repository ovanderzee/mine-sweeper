import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { FADE_OUT_TIME } from './../../common/constants'
import App from './../../App'

describe('Introduction', () => {
  let
    button: HTMLButtonElement,
    user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    render(<App />)

    button = screen.getByLabelText('skip to play')
  })

  it.skip('should end after any keystroke, since the button has focus', async () => {
    expect(button).toBeInTheDocument()
    expect(button).toHaveFocus()
//     user.click() // user.tab()
    await user.keyboard('{Enter}')
//    await userEvent.type(button, '*')

    vi.advanceTimersByTimeAsync(FADE_OUT_TIME * 1.1)

    expect(button).toHaveFocus()
    // see proof of interaction, but not seeing
    expect(button).toHaveClass('ending')
//     expect(button).not.toBeInTheDocument()
  })
})
