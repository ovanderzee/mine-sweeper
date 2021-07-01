import { BOARD_SIZE } from '../../constants'

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
  row: -1,
  col: -1,
  fill: 0,
  done: false,
}

/** The right board dimensions */
const boardTemplate = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill({}))

/** Complete data model */
const defaultGameState = {
  stage: 'game-new',
  board: [],
  start: 0,
}

export { iterateNeighbours, initialCellState, boardTemplate, defaultGameState }
