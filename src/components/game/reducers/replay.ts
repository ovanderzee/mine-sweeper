import { initialGameState, initialCellState } from '../common'
import { GameState, CellState } from '../../../common/game-types'

export const replayReducer = (state: GameState): GameState => {
  const newBoard: CellState[][] = state.board.map(row =>
    row.map(cell => {
      return {
        ...initialCellState,
        row: cell.row,
        col: cell.col,
        fill: cell.fill,
      }
    })
  )

  return {
    ...initialGameState,
    board: newBoard,
  }
}
