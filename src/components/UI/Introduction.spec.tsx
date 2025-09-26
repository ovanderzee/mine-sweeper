import { act } from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { FADE_OUT_TIME } from './../../common/constants'
import App from './../../App'

describe('Introduction', () => {
  let button!: HTMLButtonElement,
    user: UserEvent

  beforeEach(() => {
    render(<App />)
    user = userEvent.setup()
    button = screen.getByLabelText('skip to play')
  })

  it('should end after any keystroke, since the button has focus', async () => {
    await waitFor(() => user.keyboard('*'))
    act(() => {
      jest.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    })

    expect(button).not.toBeInTheDocument()
  })

  it('would not end after any keystroke, when the button had no focus', async () => {
    button.blur()
    await waitFor(() => user.keyboard('*'))
    act(() => {
      jest.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    })

    expect(button).toBeInTheDocument()
  })

  it('should end after a left click, not a touch ', async () => {
    await waitFor(() => user.pointer({keys: '[MouseLeft]', target: button}))
    act(() => {
      jest.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    })

    expect(button).not.toBeInTheDocument()
  })

  it('should end after a right click, not a touch ', async () => {
    await waitFor(() => user.pointer({keys: '[MouseLeft]', target: button}))
    act(() => {
      jest.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    })

    expect(button).not.toBeInTheDocument()
  })

  it('should end after a touch, not a click ', async () => {
    await waitFor(() => user.pointer([
      {keys: '[TouchA]', target: button},
    ]))

    act(() => {
      jest.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    })

    expect(button).not.toBeInTheDocument()
  })

  it('should end after animation ending', async () => {
    fireEvent.animationEnd(button);
    act(() => {
      jest.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    })

    expect(button).not.toBeInTheDocument()
  })
})
