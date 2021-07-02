import { MINE_COUNT } from '../../../common/constants'
import { iterateNeighbours } from '../common'

const touchButtonReducer = (state, action) => {
  const updState = { ...state }
  
  if (state.stage === 'game-new') {
    updState.stage = 'game-playing'
    updState.begin = Date.now()
  }

  if (
    updState.stage !== 'game-playing' ||
    state.end ||
    state.board[action.row][action.col].done
  )
    return state

  const updBoard = state.board.map(row => row.map(cell => cell))
  let updCell = updBoard[action.row][action.col]

  /** All-purpose cell updater */
  const touchCell = (source, entry = { done: true }) => {
    return updBoard[source.row][source.col] = {
      ...source,
      ...entry,
    }
  }

  updCell = touchCell(updCell, action.entry)

  if (state.flagging) {
    // then entry = {locked: <Boolean>}
    return {
      ...updState,
      board: updBoard,
    }
  }

  /** Followup touches */

  const findPristineCells = () =>
    updBoard
      .map((row) => row.filter((cell) => !cell.done))
      .flat()

  if (updCell.fill === 0) {
    // blank cell touched, touch it's neighbours recursively
    const touchBlankNeighbours = (x, y) => {
      const neighbourCell = updBoard[x][y]
      if (neighbourCell.done) return
      touchCell(neighbourCell)
      if (neighbourCell.fill === 0)
        iterateNeighbours(updBoard[x][y], touchBlankNeighbours)
    }
    iterateNeighbours(updCell, touchBlankNeighbours)
  } else if (updCell.fill > 8) {
    // mine touched, touch all buttons, game lost
    findPristineCells().forEach((cell) => touchCell(cell))
    updState.stage = 'game-lost'
    updState.end = Date.now()
  } else {
    // neighbour of mine touched, show contents
  }

  const pristineCells = findPristineCells()
  if (pristineCells.length === MINE_COUNT) {
    // only mines remain, touch remaining buttons, game won
    pristineCells.forEach((cell) => touchCell(cell))
    updState.stage = 'game-won'
    updState.end = Date.now()
  }

  return {
    ...updState,
    board: updBoard,
  }
}

export default touchButtonReducer
