
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NewGame from './NewGame'
import { GameStages } from './../../common/game.d'
import { renderWithContext } from './../../__mocks__/aat-helpers'

describe('NewGame Component', () => {
  let dispatcher: () => void

  beforeEach(() => {
    dispatcher = vi.fn()
  })

  it('should display the "Start Playing" sign', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)

    expect(screen.getByTitle('New Game')).toBeInTheDocument()
    expect(screen.getByLabelText('play')).toBeInTheDocument()

  })

  it('should renew game when clicked while game is new', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.NEW} />)
    await screen.getByTitle('New Game').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should renew game when clicked while game is lost', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.LOST} />)
    await screen.getByTitle('New Game').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should renew game when clicked while game is won', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.WON} />)
    await screen.getByTitle('New Game').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should renew game when clicked while game is playing', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('New Game')
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
