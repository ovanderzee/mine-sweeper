import { Locator, userEvent } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import { renderWithProvider, renderWithContext } from './../../__mocks__/aat-helpers'
import { microConfig, scoringConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState, decidedGameState, decidedSharpGameState } from './../../__mocks__/game-states'
import { blank41pct } from './../../__mocks__/game-states'
import { PlayMode } from './../../common/app.d'
import { CellState } from './../../common/game.d'
import { DEFAULTS, NORMAL } from  './../../common/defaults'
import storage from './../../common/storage'
import Game from './Game'

vi.setConfig({
  testTimeout: 10_000,
})

describe('Game dimensions', () => {
  beforeEach(() => {
    localStorage.removeItem('mv-game')
  })

  it('should create a game with default properties', async () => {
    await renderWithContext(<Game />, { config: DEFAULTS, session: NORMAL })
    const cells = storage.game?.board.flat() || []
    expect(cells.length).toBe(36)

    const mines = cells?.filter(c => c.fill > 8) || []
    expect(mines.length).toBe(4)
  })

  it('should create a game with micro config properties', async () => {
    await renderWithContext(<Game />, { config: microConfig, session: NORMAL })
    const cells = storage.game?.board.flat() || []
    expect(cells.length).toBe(9)

    const mines = cells?.filter(c => c.fill > 8) || []
    expect(mines.length).toBe(2)
  })
})

describe('Game lifecycle', () => {
  let
    screen: RenderResult,
    cells: CellState[]

  beforeEach(async () => {
    localStorage.removeItem('mv-game')
    screen = await renderWithContext(<Game />, { config: microConfig })
    cells = storage.game?.board.flat() || []
  })

  it('should begin as new game', async () => {
    await expect.element(screen.getByRole('main')).toHaveClass('game-new')
    expect(storage.game?.stage).toBe('game-new')
  })

  it('should be in playing mode after opening a non-mine cell', async () => {
    const index = cells.findIndex(cell => cell.fill < 9)
    await screen.getByRole('gridcell').nth(index).click()

    await expect.element(screen.getByRole('main')).toHaveClass('game-playing')
    expect(storage.game?.stage).toBe('game-playing')
  })

  it('should result in loss after opening a mine', async () => {
    const index = cells.findIndex(cell => cell.fill > 8)
    await screen.getByRole('gridcell').nth(index).click()

    await expect.element(screen.getByRole('main')).toHaveClass('game-lost')
    expect(storage.game?.stage).toBe('game-lost')
  })

  it('should result in win after opening a the last non-mine', async () => {
    cells.forEach(async (cell, index) => {
      if (cell.fill < 9) {
        await screen.getByRole('gridcell').nth(index).click()
      }
    })

    await expect.element(screen.getByRole('main')).toHaveClass('game-won')
    expect(storage.game?.stage).toBe('game-won')
  })

})

describe('Polling the game', () => {
  let
    screen: RenderResult,
    fields: Locator

  const getFieldByXY = (x: number, y: number): Locator => {
    return fields?.nth(x + (y * scoringConfig.BOARD_SIZE))
  }

  // const cellState = (x: number, y: number): CellState | undefined => storage.game?.board[y][x]

  beforeEach(async () => {
    storage.config = scoringConfig
    storage.game = blank41pct
    screen = await renderWithProvider(<Game />)
    fields = screen.getByRole('gridcell')
  })

  it('should open neighbouring blanks and indicators when a blank is clicked', async () => {
    expect(getFieldByXY(0, 0)).toHaveClass('pristine')
    expect(getFieldByXY(0, 1)).toHaveClass('pristine')
    expect(getFieldByXY(0, 2)).toHaveClass('pristine')
    expect(getFieldByXY(1, 0)).toHaveClass('pristine')
    const aBlank = getFieldByXY(1, 1)
    expect(aBlank).toHaveClass('pristine')
    expect(getFieldByXY(1, 2)).toHaveClass('pristine')
    expect(getFieldByXY(2, 0)).toHaveClass('pristine')
    expect(getFieldByXY(2, 1)).toHaveClass('pristine')
    expect(getFieldByXY(2, 2)).toHaveClass('pristine')

    await aBlank?.click()

    await expect.element(getFieldByXY(0, 0)).toHaveClass('touched')
    await expect.element(getFieldByXY(0, 1)).toHaveClass('touched')
    await expect.element(getFieldByXY(0, 2)).toHaveClass('touched')
    await expect.element(getFieldByXY(1, 0)).toHaveClass('touched')
    await expect.element(aBlank).toHaveClass('touched')
    await expect.element(getFieldByXY(1, 2)).toHaveClass('touched')
    await expect.element(getFieldByXY(2, 0)).toHaveClass('touched')
    await expect.element(getFieldByXY(2, 1)).toHaveClass('touched')
    await expect.element(getFieldByXY(2, 2)).toHaveClass('touched')
  })

  it('should not open other indicator cells when a indicator cell is clicked', async () => {
    expect(getFieldByXY(0, 4)).toHaveClass('pristine')
    expect(getFieldByXY(0, 5)).toHaveClass('pristine')
    expect(getFieldByXY(0, 6)).toHaveClass('pristine')
    expect(getFieldByXY(1, 4)).toHaveClass('pristine')
    const aValue = getFieldByXY(1, 5)
    expect(aValue)?.toHaveClass('pristine')
    expect(getFieldByXY(1, 6)).toHaveClass('pristine')
    expect(getFieldByXY(2, 4)).toHaveClass('pristine')
    expect(getFieldByXY(2, 5)).toHaveClass('pristine')
    expect(getFieldByXY(2, 6)).toHaveClass('pristine')

    await aValue?.click()

    // await expect.element to allow processing time to pass
    await expect.element(getFieldByXY(0, 4)).toHaveClass('pristine')
    await expect.element(getFieldByXY(0, 5)).toHaveClass('pristine')
    await expect.element(getFieldByXY(0, 6)).toHaveClass('pristine')
    await expect.element(getFieldByXY(1, 4)).toHaveClass('pristine')
    await expect.element(aValue).toHaveClass('touched')
    await expect.element(getFieldByXY(1, 6)).toHaveClass('pristine')
    await expect.element(getFieldByXY(2, 4)).toHaveClass('pristine')
    await expect.element(getFieldByXY(6, 5)).toHaveClass('pristine')
    await expect.element(getFieldByXY(6, 6)).toHaveClass('pristine')
  })

  it('should open all cells when a mine is clicked', async () => {
    const size = storage.config.BOARD_SIZE
    const aMine = getFieldByXY(4, 4)

    for (let x=0; x<size; x++)
      for (let y=0; y<size; y++)
        expect(getFieldByXY(x, y)).toHaveClass('pristine')

    await aMine?.click()

    for (let x=0; x<size; x++)
      for (let y=0; y<size; y++)
        expect(getFieldByXY(x, y)).toHaveClass('touched')
  })
})

describe('Loading the Game', () => {
  beforeEach(() => {
    storage.config = microConfig
  })

  it('should start a new game when storage is empty', async () => {
    storage.eraseGame()
    expect(storage.game?.stage).toBe(undefined)
    await renderWithProvider(<Game />)
    expect(storage.game?.stage).toBe('game-new')
  })

  it('should load an untouched game from storage', async () => {
    storage.game = newGameState
    await renderWithProvider(<Game />)
    expect(storage.game.stage).toBe('game-new')
  })

  it('should load an unfinished game from storage', async () => {
    storage.game = playingGameState
    await renderWithProvider(<Game />)
    expect(storage.game.stage).toBe('game-playing')
  })

  it('should start a new game when storage contains an finished game', async () => {
    storage.game = lostGameState
    expect(storage.game.stage).toBe('game-lost')
    await renderWithProvider(<Game />)
    expect(storage.game.stage).toBe('game-new')
  })

})

describe('Handle loosing and winning', () => {

  it('should celebrate a won game', async () => {
    storage.game = decidedGameState
    const screen = await renderWithContext(<Game />, { config: microConfig })
    const gameCells = screen.getByRole('gridcell')
    await gameCells.nth(6).click()

    expect(storage.game?.stage).toBe('game-won')
    await expect.element(screen.getByRole('main')).toHaveClass('game-won')

    const dialog = screen.getByRole('dialog')
    await expect.element(dialog).toBeInTheDocument()
    await expect.element(dialog).toHaveClass('shield-modal')
  })

  it('should reflect on a lost game', async () => {
    // unlocked mine to test with same game
    decidedGameState.board[2][2].locked = false
    storage.game = decidedGameState
    const screen = await renderWithContext(<Game />, { config: microConfig })
    const gameCells = screen.getByRole('gridcell')
    await gameCells.nth(0).click()

    expect(storage.game?.stage).toBe('game-lost')
    await expect.element(screen.getByRole('main')).toHaveClass('game-lost')
    expect(gameCells.nth(0)).toHaveClass('explode')
    expect(gameCells.nth(8)).not.toHaveClass('explode')

    await expect.element(gameCells.nth(8)).toHaveClass('explode')
  })

})

describe('Handle loosing and winning in sharp play-mode', () => {
  // document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }))
  const sharpMicroConfig = { ...microConfig, PLAY_MODE: PlayMode.SHARP }

  beforeEach(() => {
    storage.game = decidedSharpGameState
    storage.config = sharpMicroConfig
  })

  it('should celebrate a won game in sharp play-mode', async () => {
    const screen = await renderWithProvider(<Game />)
    const gameCells = screen.getByRole('gridcell')
    await gameCells.nth(0).element().focus()
    await userEvent.keyboard('{Space}')

    expect(storage.game?.stage).toBe('game-won')
    await expect.element(screen.getByRole('main')).toHaveClass('game-won')

    const dialog = screen.getByRole('dialog')
    await expect.element(dialog).toBeInTheDocument()
    await expect.element(dialog).toHaveClass('shield-modal')
  })

  it('should reflect on a lost game in sharp play-mode', async () => {
    const screen = await renderWithProvider(<Game />)
    const gameCells = screen.getByRole('gridcell')
    await gameCells.nth(2).element().focus()
    await userEvent.keyboard('{Space}')

    expect(storage.game?.stage).toBe('game-lost')
    await expect.element(screen.getByRole('main')).toHaveClass('game-lost')

    await expect.element(gameCells.nth(0)).toHaveClass('explode')
    await expect.element(gameCells.nth(2)).not.toHaveClass('explode')
    await expect.element(gameCells.nth(8)).toHaveClass('explode')
  })
})
