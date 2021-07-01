const replayReducer = (state) => {
  const newBoard = state.board.map(row =>
    row.map(cell => {
      return {
        row: cell.row,
        col: cell.col,
        fill: cell.fill,
      }
    })
  )

  return {
    stage: 'game-new',
    board: newBoard,
  }
}

export default replayReducer
