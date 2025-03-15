const defeatReducer = (state, action) => {

  const mines = state.board.map(row => row.map(
    cell => cell.done === 'opened' && cell.fill > 8 && cell)
  ).flat().filter(c => c)

  if (mines.length) {
    // trigger next mine in next effect
    state.board[mines[0].row][mines[0].col] = { ...mines[0], done: 'clicked' }
    state.board = [...state.board]

    return {
      ...state,
      mines
    }
  }

  return state
}

export default defeatReducer
