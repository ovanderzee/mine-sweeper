import { defeatReducer } from './defeat'
import { vi } from 'vitest'
import { CellStateStage, CellState } from '../../../common/game.d'
import { playingGameState, lostGameState } from '../../../__mocks__/game-states'
import storage from '../../../common/storage'
import { sequenceFillData } from '../../../common/scoring'

describe('defeatReducer is called in repetition', () => {
  it('should return declining number of untouched mines', () => {
    // all cells at least opened like in a lost stage
    playingGameState.board
      .forEach(
        (r: CellState[]) => r.forEach(
          (c: CellState) => c.stage = CellStateStage.RELEASED
        )
      )

    const gameState2 = defeatReducer(playingGameState)
    const gameState3 = defeatReducer(gameState2)

    vi.runAllTimers()
    const allMines: CellState[] = gameState3.board
      .flat()
      .filter(cell => cell.fill > 8)

    const clickedMines: CellState[] = gameState3.board
      .flat()
      .filter(cell => cell.stage === CellStateStage.TESTED && cell.fill > 8)

    expect(clickedMines.length).toBe(allMines.length)
  })

  test('should animate in about 13 batches', () => {
    let
      times = 0,
      releasedMines: number,
      gameState = { ...playingGameState }
    const [board, config] = sequenceFillData('kk4Aw2iMaS1styvRK7kgiz32pmqWi+BK+GhySxaZp9ljNV1j5tTDdJ2rnf1HB36F0eLpyFggA')
    storage.config = { ...storage.config, ...config }
    const findReleasedMines = () => gameState.board
      .flat()
      .filter(cell => cell.stage === CellStateStage.RELEASED && cell.fill > 8)
      .length
    gameState.board = board
    gameState.board.forEach(
      (r: CellState[]) => r.forEach(
        (c: CellState) => c.stage = CellStateStage.RELEASED
      )
    )

    const initialReleasedMines = findReleasedMines()
    do {
      gameState = defeatReducer(gameState)
      releasedMines = findReleasedMines()
      times++
    } while (releasedMines > 0 )

    expect(initialReleasedMines).toBeGreaterThan(releasedMines)
    expect(releasedMines).toBe(0)

    expect(times).toBeGreaterThan(11)
    expect(times).toBeLessThan(15)

    const bursts = gameState.board
      .flat()
      .filter(cell => cell.burst)
      .length

    // bursts includes one more: the original misclick
    // times includes one more: the last iteration does nothing
    expect(bursts).toBe(times)
  })

  it('should return unchanged state when no untouched mines were found', () => {
    const gameStateOut = defeatReducer(lostGameState)
    expect(gameStateOut.mines.length).toBe(0)

    expect(gameStateOut).toBe(lostGameState)
  })
})
