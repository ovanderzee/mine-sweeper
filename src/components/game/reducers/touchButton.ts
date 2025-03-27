import { iterateNeighbours } from '../common'

const touchButtonReducer = (state, action, config) => {
  const { BOARD_SIZE, MINE_COUNT } = config
  const { stage, fill, row, col } = action.payload.cell
  const updState = { ...state }

  if (state.stage === 'game-new') {
    updState.stage = 'game-playing'
    updState.begin = Date.now()
  }

  if (
    updState.stage !== 'game-playing' || state.end || stage
  )
    return state

  /*
    Now we are dealing with a just clicked pristine cell in a running game
  */

  const updBoard = state.board.map(row => row.map(cell => cell))
  let updCell = updBoard[row][col]

  /** open cells with digits or pristine cells only */
  const touchCell = (source, entry): CellState =>
    updBoard[source.row][source.col] = {
      ...source,
      ...entry,
    }

  updCell = touchCell(updCell, action.payload.entry)

  if (action.type === 'FLAG') {
    // then entry = {locked: <Boolean>}
    return {
      ...updState,
      board: updBoard,
    }
  }

  /** Followup touches */

  const findPristineCells = () =>
    updBoard
      .map((row) => row.filter((cell) => !cell.stage))
      .flat()

  if (fill === 0) {
    // blank cell touched, touch it's neighbours recursively
    const touchBlankNeighbours = (x, y) => {
      const neighbourCell = updBoard[x][y]
      // do not touch touched or locked cells
      if (neighbourCell.stage || neighbourCell.locked)
        return
      touchCell(neighbourCell, { stage: 'opened' })
      // iterate while being a blank
      if (neighbourCell.fill === 0)
        iterateNeighbours(updBoard[x][y], BOARD_SIZE, touchBlankNeighbours)
    }
    iterateNeighbours(updCell, BOARD_SIZE, touchBlankNeighbours)
  } else if (fill > 8) {
    // mine touched, touch all buttons, game lost
    findPristineCells().forEach((cell) => touchCell(cell, { stage: 'opened' }))
    updState.stage = 'game-lost'
    updState.end = Date.now()
  } else {
    // neighbour of mine touched, show contents
  }

  const pristineCells = findPristineCells()
  if (pristineCells.length === MINE_COUNT) {
    // only mines remain, touch remaining buttons, game won
    pristineCells.forEach((cell) => touchCell(cell, { stage: 'opened' }))
    updState.stage = 'game-won'
    updState.end = Date.now()
  }

  return {
    ...updState,
    board: updBoard,
  }
}

export default touchButtonReducer
