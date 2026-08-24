import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../../__mocks__/aat-helpers'
import { playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'
import { getFillDistribution } from './../../common/scoring'
import { FADE_OUT_TIME } from '../../common/constants'
import storage from './../../common/storage'

describe('The game page sidebar', () => {
  let screen: RenderResult

  beforeEach(async () => screen = await renderWithApp())

  it('should offer navigation to About page', async () => {
    const navBtn = screen.getByRole('navigation').getByTitle('Description')
    expect(navBtn).toBeInTheDocument()
    await navBtn.click()

    await expect.element(navBtn).not.toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Defuse all mines' })).toBeInTheDocument()
  })

  it('should offer navigation to HallOfFame page', async () => {
    const navBtn = screen.getByRole('navigation').getByTitle('Hall of Fame')
    expect(navBtn).toBeInTheDocument()
    await navBtn.click()

    await expect.element(navBtn).not.toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Hall of Fame' })).toBeInTheDocument()
  })

  it('should offer navigation to Configure page', async () => {
    const navBtn = screen.getByRole('navigation').getByTitle('Settings')
    expect(navBtn).toBeInTheDocument()
    await navBtn.click()

    await expect.element(navBtn).not.toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })
})

describe('The game start button', () => {
  let
    screen: RenderResult

  beforeEach(async () => {
    storage.config = microConfig
    storage.game = playingGameState
    screen = await renderWithApp()
  })

  it('should start a new game when game ended', async () => {
    const mineIndex = storage.game?.board.flat().findIndex(c => c.fill > 8 && !c.stage)
    await screen.getByRole('gridcell').nth(mineIndex || 0).click()

    await expect.element(screen.getByRole('main')).toHaveClass('game-lost')

    await screen.getByRole('navigation').getByTitle('New Game').click()

    await expect.element(screen.getByRole('main')).toHaveClass('game-new')
  })

  it('should continue game in progress when "Cancel" is clicked', async () => {
    await screen.getByRole('navigation').getByTitle('New Game').click()
    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Cancel').click()

    expect(dialog).toBeInTheDocument()
    vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    // await vi.runAllTimersAsync() // Error: Test timed out in 15000ms.
    expect(dialog).not.toBeInTheDocument()
    expect(storage.game?.stage).toBe('game-playing')
  })

  it('should replace game in progress by new game when "Ok" is clicked', async () => {
    await screen.getByRole('navigation').getByTitle('New Game').click()
    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Ok').click()

    expect(dialog).toBeInTheDocument()
    await vi.runAllTimersAsync()
    expect(dialog).not.toBeInTheDocument()
    expect(storage.game?.stage).toBe('game-new')
  })

})

describe('The replay button', () => {
  it("should restart a lost game", async () => {
    storage.config = microConfig
    storage.game = playingGameState
    const screen = await renderWithApp()
    const initialFilling = getFillDistribution(storage.game.board)

    const mineIndex = storage.game.board.flat().findIndex(c => c.fill > 8 && !c.stage)
    await screen.getByRole('gridcell').nth(mineIndex || 0).click()

    await expect.element(screen.getByRole('main')).toHaveClass('game-lost')

    await screen.getByRole('navigation').getByTitle('Replay').click()

    await expect.element(screen.getByRole('main')).toHaveClass('game-new')

    const latterFilling = getFillDistribution(storage.game.board)
    expect(initialFilling).toStrictEqual(latterFilling)
  })

  it('should restart a game in progress when clicking "Cancel"', async () => {
    storage.config = microConfig
    storage.game = playingGameState
    const screen = await renderWithApp()
    const initialFilling = getFillDistribution(storage.game.board)

    await screen.getByRole('navigation').getByTitle('Replay').click()
    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Cancel').click()

    expect(dialog).toBeInTheDocument()
    vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)
    // await vi.runAllTimersAsync() // Error: Test timed out in 15000ms.
    expect(dialog).not.toBeInTheDocument()
    expect(storage.game.stage).toBe('game-playing')
    expect(initialFilling).toStrictEqual(getFillDistribution(storage.game.board))
  })

  it('should continue game in process when clicking "Ok"', async () => {
    storage.config = microConfig
    storage.game = playingGameState
    const screen = await renderWithApp()
    const initialFilling = getFillDistribution(storage.game.board)

    await screen.getByRole('navigation').getByTitle('Replay').click()
    const dialog = screen.getByRole('dialog')
    await dialog.getByText('Ok').click()

    expect(dialog).toBeInTheDocument()
    await vi.runAllTimersAsync()
    expect(dialog).not.toBeInTheDocument()
    expect(storage.game.stage).toBe('game-new')
    expect(initialFilling).toStrictEqual(getFillDistribution(storage.game.board))
  })
})
