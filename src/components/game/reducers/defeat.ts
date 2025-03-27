const defeatReducer = (state) => {

  const mines: CellState[] = state.board
    .flat()
    .filter(cell => cell.stage === 'opened' && cell.fill > 8)

  if (mines.length) {
    // trigger next mine in next effect
    const pickOne = Math.floor(mines.length * Math.random())
    state.board[mines[pickOne].row][mines[pickOne].col] = {
      ...mines[pickOne],
      stage: 'clicked'
    }
    state.board = [...state.board]

    return {
      ...state,
      mines
    }
  }

  return state
}

export default defeatReducer
