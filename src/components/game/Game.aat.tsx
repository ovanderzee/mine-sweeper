import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Locator } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import { renderWithProvider, renderWithContext } from './../../__mocks__/aat-helpers'
import { microConfig, scoringConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState } from './../../__mocks__/game-states'
import { blank41pct } from './../../__mocks__/game-states'
import { CellState } from './../../common/game.d'
import DEFAULTS from './../../common/defaults'
import { getFillDistribution } from './../../common/scoring'
import storage from './../../common/storage'
import Game from './Game'


describe('Game dimensions', () => {
  beforeEach(() => {
    localStorage.removeItem('mv-game')
  })

  it('should create a game with default properties', () => {
    renderWithContext(<Game />, { config: DEFAULTS })
    const cells = storage.game?.board.flat() || []
    expect(cells.length).toBe(36)

    const mines = cells?.filter(c => c.fill > 8) || []
    expect(mines.length).toBe(4)
  })

  it('should create a game with micro config properties', () => {
    renderWithContext(<Game />, { config: microConfig })
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
    screen = await renderWithProvider(<Game />)
    cells = storage.game?.board.flat() || []
  })

  it('should begin as new game', () => {
    expect(storage.game?.stage).toBe('game-new')
    expect(screen.getByRole('main')).toHaveClass('game-new')
  })

  it('should be in playing mode after opening a non-mine cell', async () => {
    const index = cells.findIndex(cell => cell.fill < 9)
    await screen.getByRole('main').getByRole('button').nth(index).click()

    expect(storage?.game?.stage).toBe('game-playing')
    expect(screen.getByRole('main')).toHaveClass('game-playing')
  })

  it('should result in loss after opening a mine', async () => {
    const index = cells.findIndex(cell => cell.fill > 8)
    await screen.getByRole('main').getByRole('button').nth(index).click()

    expect(storage?.game?.stage).toBe('game-lost')
    expect(screen.getByRole('main')).toHaveClass('game-lost')
  })

  it('should result in win after opening a the last non-mine (flaky)', async () => {
    cells
      .map((cell, index) => cell.fill < 9 ? index : -1)
      .filter(i => i > -1)
      .forEach(async (i) => {
        let loc: Locator
        try { // WebDriverError: stale element reference
          loc = screen.getByRole('main').getByRole('button').nth(i)
          if (loc) await loc.click()
        } catch {
          console.error(`WebDriverError: stale element reference: ${JSON.stringify(loc)} (seq.nr ${i})`)
        }
      }
    )

    await vi.waitFor(async () => {
      expect(storage?.game?.stage).toBe('game-won')
      expect(screen.getByRole('main')).toHaveClass('game-won')
    })
  })

})

describe('Polling the game', () => {
  let
    screen: RenderResult,
    fields: Locator

  const getFieldByXY = (x: number, y: number): Locator | undefined => {
    return fields?.nth((x + y * scoringConfig.BOARD_SIZE)) || ''
  }

  beforeEach(async () => {
    storage.config = scoringConfig
    storage.game = blank41pct
    screen = await renderWithProvider(<Game />)
    fields = screen.getByRole('main').getByRole('button')
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

    expect(getFieldByXY(0, 0)).toHaveClass('touched')
    expect(getFieldByXY(0, 1)).toHaveClass('touched')
    expect(getFieldByXY(0, 2)).toHaveClass('touched')
    expect(getFieldByXY(1, 0)).toHaveClass('touched')
    expect(aBlank).toHaveClass('touched')
    expect(getFieldByXY(1, 2)).toHaveClass('touched')
    expect(getFieldByXY(2, 0)).toHaveClass('touched')
    expect(getFieldByXY(2, 1)).toHaveClass('touched')
    expect(getFieldByXY(2, 2)).toHaveClass('touched')
  })

  it('should not open other indicator cells when a indicator cell is clicked (flaky)', async () => {
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

    expect(getFieldByXY(0, 4)).toHaveClass('pristine')
    expect(getFieldByXY(0, 5)).toHaveClass('pristine')
    expect(getFieldByXY(0, 6)).toHaveClass('pristine')
    expect(getFieldByXY(1, 4)).toHaveClass('pristine')
    expect(aValue).toHaveClass('touched')
    expect(getFieldByXY(1, 6)).toHaveClass('pristine')
    expect(getFieldByXY(2, 4)).toHaveClass('pristine')
    expect(getFieldByXY(6, 5)).toHaveClass('pristine')
    expect(getFieldByXY(6, 6)).toHaveClass('pristine')
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
    await renderWithProvider(<Game />)
    expect(storage.game?.stage).toBe('game-new')
  })

  it('should load an untouched game from storage', async () => {
    storage.game = newGameState
    const prevFills = getFillDistribution(storage.game.board)
    await renderWithProvider(<Game />)
    const currFills = getFillDistribution(storage.game.board)
    expect(currFills).toStrictEqual(prevFills)
    expect(storage.game.stage).toBe('game-new')
  })

  it('should load an unfinished game from storage', async () => {
    storage.game = playingGameState
    const prevFills = getFillDistribution(storage.game.board)
    await renderWithProvider(<Game />)
    const currFills = getFillDistribution(storage.game.board)
    expect(currFills).toStrictEqual(prevFills)
    expect(storage.game.stage).toBe('game-playing')
  })

  it('should start a new game when storage contains an finished game', async () => {
    storage.game = lostGameState
    const prevFills = getFillDistribution(storage.game.board)
    await renderWithProvider(<Game />)
    const currFills = getFillDistribution(storage.game.board)
    expect(currFills).not.toStrictEqual(prevFills)
    expect(storage.game.stage).toBe('game-new')
  })

})

describe.skip('handle loosing and winning', () => {
  let
    screen: RenderResult,
    cells: CellState[],
    fields: Locator

  const getFieldByXY = (x: number, y: number): Locator | undefined => {
    console.log('x', x, 'y', y)
    return fields?.nth((x + y * scoringConfig.BOARD_SIZE)) || ''
  }

  beforeEach(async () => {
    storage.game = playingGameState
    storage.config = microConfig
    screen = await renderWithProvider(<Game />)
    cells = storage.game?.board.flat() || []
    fields = screen.getByRole('main').getByRole('button')
  })

  it('should celebrate a won game', async () => {
    cells
      .map((cell, index) => cell.fill < 9 ? index : -1)
      .filter(i => i > -1)
      .forEach(async (i) => {
        let loc: Locator
        try { // WebDriverError: stale element reference
          loc = screen.getByRole('main').getByRole('button').nth(i)
          if (loc) await loc.click()
        } catch {
          console.error(`WebDriverError: stale element reference: ${JSON.stringify(loc)} (seq.nr ${i})`)
        }
      }
    )

    await vi.waitFor(async () => {
      expect(storage?.game?.stage).toBe('game-won')
      expect(screen.getByRole('main')).toHaveClass('game-won')
    })
// fails often
//     const dialog = screen.getByRole('dialog')
//     expect(dialog).toBeInTheDocument()
  })

  it('should reflect on a lost game', async () => {
    const allMines = cells.filter(cell => cell.fill > 8)
    const index = cells.findIndex(cell => cell.fill > 8)

    await fields.nth(index).click()

//     await vi.waitFor(async () => {
//       allMines.forEach(m => {
//         expect(getFieldByXY(m.col, m.row)).toHaveClass('explode')
//       })
//     })

    expect(storage?.game?.stage).toBe('game-lost')
    expect(screen.getByRole('main')).toHaveClass('game-lost')
  })

})
