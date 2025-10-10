import { defeatReducer } from './defeat'
import { CellStateStage, CellState } from '../../../common/game-types'
import { playingGameState, lostGameState } from '../../../__mocks__/game-states'

describe('defeatReducer is called in repetition', () => {
  test('should end with all mines .clicked (CellStateStage.TESTED)', () => {
    // all cells at least opened like in a lost stage
    playingGameState.board
      .forEach(
        (r: CellState[]) => r.forEach(
          (c: CellState) => c.stage = CellStateStage.RELEASED
        )
      )

    const gameState2 = defeatReducer(playingGameState)
    const gameState3 = defeatReducer(gameState2)

    jest.runAllTimers()
    const allMines: CellState[] = gameState3.board
      .flat()
      .filter(cell => cell.fill > 8)

    const clickedMines: CellState[] = gameState3.board
      .flat()
      .filter(cell => cell.stage === CellStateStage.TESTED && cell.fill > 8)

    expect(clickedMines.length).toBe(allMines.length)
  })

  test('should return unchanged state when no untouched mines were found', () => {
    const gameStateOut = defeatReducer(lostGameState)
    expect(gameStateOut.mines.length).toBe(0)

    expect(gameStateOut).toBe(lostGameState)
  })
})
