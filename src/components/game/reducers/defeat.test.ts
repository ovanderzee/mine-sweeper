import { defeatReducer } from './defeat'
import { CellStateStage, CellState } from '../../../common/game-types'
import { playingGameState, lostGameState } from '../../../__mocks__/game-states'

describe('defeatReducer is called in repetition', () => {
  test('should return declining number of untouched mines', () => {
    // all cells at least opened like in a lost stage
    playingGameState.board
      .forEach(
        (r: CellState[]) => r.forEach(
          (c: CellState) => c.stage = CellStateStage.RELEASED
        )
      )

    const gameState2 = defeatReducer(playingGameState)
    expect(gameState2.mines.length).toBe(1)

    const gameState3 = defeatReducer(gameState2)
    expect(gameState3.mines.length).toBe(0)

    expect(gameState3.board).toStrictEqual(lostGameState.board)
  })

  test('should return unchanged state when no untouched mines were found', () => {
    const gameStateOut = defeatReducer(lostGameState)
    expect(gameStateOut.mines.length).toBe(0)

    expect(gameStateOut).toBe(lostGameState)
  })
})
