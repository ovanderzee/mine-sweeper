import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { userEvent, Locator } from 'vitest/browser'
import { renderInApp } from './../../__mocks__/aat-helpers'
import Introduction from './Introduction'

describe('Introduction', () => {
  let
    screen: RenderResult,
    skipButton: Locator,
    doOnEnd: () => void

  beforeEach(async () => {
    doOnEnd = vi.fn()
    screen = await renderInApp(<Introduction onEnd={doOnEnd} />)
    skipButton = screen.getByLabelText('skip to play')
  })

  it('should end after any keystroke, since the button has focus', async () => {
    expect(skipButton).toHaveFocus()
    expect(skipButton).not.toHaveClass('ending')
    await userEvent.keyboard('*')

    vi.advanceTimersByTimeAsync(20)
    expect(skipButton).toHaveClass('ending')
  })

  it('should end after click', async () => {
    expect(skipButton).not.toHaveClass('ending')
    await skipButton.click()

    vi.advanceTimersByTimeAsync(20)
    expect(skipButton).toHaveClass('ending')
  })

  it('should end after animation ending', async () => {
    expect(skipButton).not.toHaveClass('ending')
    await vi.waitFor(doOnEnd)

    expect(doOnEnd).toHaveBeenCalled()
  })

})
