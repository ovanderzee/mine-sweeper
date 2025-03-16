const defeatReducer = (state, action) => {

  const mines = state.board.map(row => row.map(
    cell => cell.done === 'opened' && cell.fill > 8 && cell)
  ).flat().filter(c => c)

  if (mines.length) {
    // trigger next mine in next effect
    const pickOne = Math.floor(mines.length * Math.random())
    state.board[mines[pickOne].row][mines[pickOne].col] = { ...mines[pickOne], done: 'clicked' }
    state.board = [...state.board]

    return {
      ...state,
      mines
    }
  }

  return state
}

export default defeatReducer
