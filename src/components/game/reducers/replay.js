const replayReducer = (state) => {
  const newBoard = state.board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return {
        ...cell,
        done: false,
      }
    })
  )

  return {
    stage: 'game-new',
    board: newBoard,
    start: 0,
    end: 0,
  }
}

export default replayReducer
