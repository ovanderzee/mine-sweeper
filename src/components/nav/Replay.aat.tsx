
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Replay from './Replay'
import { GameStages } from './../../common/game.d'
import { renderInPage } from './../../__mocks__/aat-helpers'

describe('Replay Component', () => {
  let dispatcher: () => void

  beforeEach(() => {
    dispatcher = vi.fn()
  })

  it('should display the "Redo" sign', async () => {
    const screen = await renderInPage(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)

    expect(screen.getByTitle('Replay')).toBeInTheDocument()
    expect(screen.getByLabelText('clockwise revolving arrow')).toBeInTheDocument()
  })

  it('should reset game when clicked while game is new', async () => {
    const screen = await renderInPage(<Replay onReplay={dispatcher} stage={GameStages.NEW} />)
    await screen.getByTitle('Replay').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is lost', async () => {
    const screen = await renderInPage(<Replay onReplay={dispatcher} stage={GameStages.LOST} />)
    await screen.getByTitle('Replay').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is won', async () => {
    const screen = await renderInPage(<Replay onReplay={dispatcher} stage={GameStages.WON} />)
    await screen.getByTitle('Replay').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is playing and a modal is shown', async () => {
    const screen = await renderInPage(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('Replay')
    await button.click()

    const cancelDialog = screen.getByText(/Cancel/i)
    await cancelDialog.click()
    expect(dispatcher).toHaveBeenCalledTimes(0)
    expect(button.element().className).not.toContain('active')

    const confirmDialog = screen.getByText(/Ok/i)
    await confirmDialog.click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
    expect(button.element().className).toContain('active')
  })

})
