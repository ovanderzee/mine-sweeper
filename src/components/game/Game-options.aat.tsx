import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { renderWithProvider } from './../../__mocks__/aat-helpers'
import { playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'
import { getFillDistribution } from './../../common/scoring'
import storage from './../../common/storage'
import Game from './Game'

describe('The game page sidebar', () => {
  let screen: RenderResult

  beforeEach(async () => screen = await renderWithProvider(<Game/>))

  it('should offer navigation to About page', () => {
    expect(screen.getByTitle('Description')).toBeInTheDocument()
  })

  it('should offer navigation to HallOfFame page', () => {
    expect(screen.getByTitle('Hall of Fame')).toBeInTheDocument()
  })

  it('should offer navigation to Configure page', () => {
    expect(screen.getByTitle('Settings')).toBeInTheDocument()
  })

})

describe('The game start button', () => {
  let
    screen: RenderResult

  beforeEach(() => {
    storage.config = microConfig
  })

  it('should start a new game when game ended', async () => {
    storage.game = playingGameState
    screen = await renderWithProvider(<Game/>)

    expect(storage.game.stage).toBe('game-playing')

    const mineIndex = storage.game.board.flat().findIndex(c => c.fill > 8 && !c.stage)
    await screen.getByRole('main').getByRole('button').nth(mineIndex).click()

    await vi.waitFor(async () => {
      expect(storage.game?.stage).toBe('game-lost')
      expect(screen.getByRole('main')).toHaveClass('game-lost')
    })

    await screen.getByRole('navigation').getByTitle('New Game').click()

    await vi.waitFor(async () => {
      expect(storage.game?.stage).toBe('game-new')
      expect(screen.getByRole('main')).toHaveClass('game-new')
    })
  })

  it("should start a new game depending permission when a game is in progress", async () => {
    storage.game = playingGameState
    screen = await renderWithProvider(<Game/>)

    expect(storage.game.stage).toBe('game-playing')

    await screen.getByRole('navigation').getByTitle('New Game').click()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    await dialog.getByText('Cancel').click()
    expect(storage.game.stage).toBe('game-playing')

    await dialog.getByText('Ok').click()
    expect(storage.game.stage).toBe('game-new')
  })

})

describe('The replay button', () => {
  let
    screen: RenderResult

  beforeEach(() => {
    storage.config = microConfig
  })

  it("should restart a lost game", async () => {
    storage.game = playingGameState
    screen = await renderWithProvider(<Game/>)
    const initialFilling = getFillDistribution(storage.game?.board)

    const mineIndex = storage.game.board.flat().findIndex(c => c.fill > 8 && !c.stage)
    await screen.getByRole('main').getByRole('button').nth(mineIndex).click()

    await vi.waitFor(async () => {
      expect(storage.game?.stage).toBe('game-lost')
      expect(screen.getByRole('main')).toHaveClass('game-lost')
    })

    await screen.getByRole('navigation').getByTitle('Replay').click()

    await vi.waitFor(async () => {
      expect(storage.game?.stage).toBe('game-new')
      expect(screen.getByRole('main')).toHaveClass('game-new')
    })

    const latterFilling = getFillDistribution(storage.game?.board)
    expect(initialFilling).toStrictEqual(latterFilling)
  })

  it("should replay a game depending permission when a game is in progress", async () => {
    storage.game = playingGameState
    screen = await renderWithProvider(<Game/>)
    const initialFilling = getFillDistribution(storage.game?.board)

    await vi.waitFor(async () => {
      expect(storage.game?.stage).toBe('game-playing')
      expect(screen.getByRole('main')).toHaveClass('game-playing')
    })

    await screen.getByRole('navigation').getByTitle('Replay').click()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    await dialog.getByText('Cancel').click()
    expect(storage.game.stage).toBe('game-playing')
    expect(getFillDistribution(storage.game?.board)).toStrictEqual(initialFilling)

    await dialog.getByText('Ok').click()
    expect(storage.game.stage).toBe('game-new')
    expect(getFillDistribution(storage.game?.board)).toStrictEqual(initialFilling)
  })
})
