
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

    await expect.element(screen.getByTitle('New Game')).toBeInTheDocument()
    await expect.element(screen.getByLabelText('play')).toBeInTheDocument()

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

  it('should leave game in progress as is when clicked "Cancel" in modal', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('New Game')
    await button.click()

    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Cancel').click()

    expect(dialog).toBeInTheDocument()
    await vi.runAllTimersAsync()
    expect(dialog).not.toBeInTheDocument()
    expect(dispatcher).toHaveBeenCalledTimes(0)
  })

  it('should renew game in progress when clicked "Ok" in modal', async () => {
    const screen = await renderWithContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('New Game')
    await button.click()

    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Ok').click()

    expect(dialog).toBeInTheDocument()
    await vi.runAllTimersAsync()
    // expect(button.element().className).toContain('active') // hard to catch
    expect(dialog).not.toBeInTheDocument()
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

})
