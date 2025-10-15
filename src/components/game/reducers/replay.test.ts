import { replayReducer } from './replay'
import { newGameState, wonGameState } from '../../../__mocks__/game-states'
import { GameState, CellState } from '../../../common/game-types'

it('Whether new or recreated, the cell-values are the same', () => {
  let findEqualValues = true;
  const recreatedGameState: GameState = replayReducer(wonGameState)

  newGameState.board.forEach((row, r) =>
    row.forEach((cell: CellState, c) => {
      const recreatedCell = recreatedGameState.board[r][c]
      findEqualValues = findEqualValues
        && cell.stage === recreatedCell.stage
        && cell.fill === recreatedCell.fill
        && cell.row === recreatedCell.row
        && cell.col === recreatedCell.col
    })
  )

  expect(findEqualValues).toBe(true)
})
