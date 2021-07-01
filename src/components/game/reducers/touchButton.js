import { MINE_COUNT } from '../../../constants'
import { iterateNeighbours } from '../common'

const touchButtonReducer = (state, action) => {
  if (state.stage === 'game-new') {
    state.stage = 'game-playing'
    state.start = Date.now()
  }

  const updBoard = state.board
  const cell = updBoard[action.row][action.col]

  if (
    state.stage !== 'game-playing' ||
    state.end ||
    cell.done
  )
    return state

  /** All-purpose cell updater */
  const touchCell = (source) => {
    updBoard[source.row][source.col] = {
      ...source,
      done: true,
    }
  }

  touchCell(cell)

  const findPristineCells = () =>
    updBoard
      .map((row) => row.filter((cell) => !cell.done))
      .flat()

  /** Followup touches */
  if (cell.fill === 0) {
    // blank cell touched, touch it's neighbours recursively
    const touchBlankNeighbours = (x, y) => {
      const neighbourCell = updBoard[x][y]
      if (neighbourCell.done) return
      touchCell(neighbourCell)
      if (neighbourCell.fill === 0)
        iterateNeighbours(updBoard[x][y], touchBlankNeighbours)
    }
    iterateNeighbours(cell, touchBlankNeighbours)
  } else if (cell.fill > 8) {
    // mine touched, touch all buttons, game lost
    findPristineCells().forEach((cell) => touchCell(cell))
    state.stage = 'game-lost'
    state.end = Date.now()
  } else {
    // neighbour of mine touched, show contents
  }

  const pristineCells = findPristineCells()
  if (pristineCells.length === MINE_COUNT) {
    // only mines remain, touch remaining buttons, game won
    pristineCells.forEach((cell) => touchCell(cell))
    state.stage = 'game-won'
    state.end = Date.now()
  }

  return {
    ...state,
    board: updBoard,
  }
}

export default touchButtonReducer
