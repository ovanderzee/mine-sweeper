import { BOARD_SIZE } from '../../common/constants'

/**
 * Do something to neighbour cells
 * @param {Object} cell
 * @param {Function} callback with (x, y) arguments
 */
const iterateNeighbours = (cell, callback) => {
  for (let x = cell.row - 1; x < cell.row + 2; x++) {
    if (x >= 0 && x < BOARD_SIZE) {
      for (let y = cell.col - 1; y < cell.col + 2; y++) {
        const isSelf = x === cell.row && y === cell.col
        if (y >= 0 && y < BOARD_SIZE && !isSelf) {
          callback(x, y)
        }
      }
    }
  }
}

/** Initial cell data */
const initialCellState = {
  fill: 0,
}

/** The right board dimensions */
const initialBoard = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(initialCellState))

/** Complete data model */
const initialGameState = {
  stage: 'game-new',
  board: [],
}

export { iterateNeighbours, initialBoard, initialGameState }
