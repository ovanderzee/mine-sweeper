
import Replay from './Replay'
import { GameStages } from './../../common/game.d'
import { renderWithContext } from './../../__mocks__/aat-helpers'

describe('Replay Component', () => {
  let dispatcher: () => void

  beforeEach(() => {
    dispatcher = vi.fn()
  })

  it('should display the "Redo" sign', async () => {
    const screen = await renderWithContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)

    await expect.element(screen.getByTitle('Replay')).toBeInTheDocument()
    await expect.element(screen.getByLabelText('clockwise revolving arrow')).toBeInTheDocument()
  })

  it('should reset game when clicked while game is new', async () => {
    const screen = await renderWithContext(<Replay onReplay={dispatcher} stage={GameStages.NEW} />)
    await screen.getByTitle('Replay').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is lost', async () => {
    const screen = await renderWithContext(<Replay onReplay={dispatcher} stage={GameStages.LOST} />)
    await screen.getByTitle('Replay').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is won', async () => {
    const screen = await renderWithContext(<Replay onReplay={dispatcher} stage={GameStages.WON} />)
    await screen.getByTitle('Replay').click()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should leave game in progress as is when clicked "Cancel" in modal', async () => {
    const screen = await renderWithContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('Replay')
    await button.click()

    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Cancel').click()

    expect(dialog).toBeInTheDocument()
    await vi.runAllTimersAsync()
    expect(dialog).not.toBeInTheDocument()
    expect(dispatcher).toHaveBeenCalledTimes(0)
  })

  it('should reset game in progress when clicked "Ok" in modal', async () => {
    const screen = await renderWithContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('Replay')
    await button.click()

    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Ok').click()

    expect(dialog).toBeInTheDocument()
    await vi.runAllTimersAsync()
    expect(dialog).not.toBeInTheDocument()
    expect(dispatcher).toHaveBeenCalledTimes(1)
    // expect(button.element().className).toContain('active') // hard to catch
  })

})
