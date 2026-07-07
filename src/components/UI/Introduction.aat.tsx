import { RenderResult } from 'vitest-browser-react'
import { userEvent, Locator } from 'vitest/browser'
import { renderWithProvider } from './../../__mocks__/aat-helpers'
import Introduction from './Introduction'
import update from '../../common/update'

describe('Introduction ends automatically', () => {
  let
    screen: RenderResult,
    skipButton: Locator,
    doOnEnd: () => void

  beforeEach(async () => {
    doOnEnd = vi.fn()
    screen = await renderWithProvider(<Introduction onEnd={doOnEnd} />)
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

describe('Introduction performs update', () => {

  it('should execute each update', async () => {
    const updateKeys = Object.keys(update)
    type UpdateKeyType = "changePlayModeValues" | "removeMaxScores" | "doubleGameLevel"

    const spies = updateKeys.map(
      (key) => vi.spyOn(update, key as UpdateKeyType)
    )

    await renderWithProvider(<Introduction onEnd={()=>{}} />)
    vi.advanceTimersByTime(200)

    expect(spies[0]).toHaveBeenCalled()
    expect(spies[1]).toHaveBeenCalled()
    expect(spies[2]).toHaveBeenCalled()
  })

})
