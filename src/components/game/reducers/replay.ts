import { initialGameState, initialCellState } from '../common'

const replayReducer = (state) => {
  const newBoard = state.board.map(row =>
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

export default replayReducer
