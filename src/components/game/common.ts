import { CellState, CellStateStage, GameState, GameStages } from '../../common/game-types'

/**
 * Do something to neighbour cells
 * @param {Object} cell
 * @param {Number} BOARD_SIZE
 * @param {Function} callback with (x, y) arguments
 */
export const iterateNeighbours = (cell: CellState, BOARD_SIZE: number, callback: (x: number, y: number) => void) => {
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
export const initialCellState: CellState = {
  stage: CellStateStage.HIDDEN,
  fill: 0,
  row: -1,
  col: -1
}

/** The right board dimensions */
export const initialBoard = (BOARD_SIZE: number) =>
  Array(BOARD_SIZE).fill(
    Array(BOARD_SIZE).fill(initialCellState)
  )

/** Complete data model */
export const initialGameState: GameState = {
  // new
  stage: GameStages.NEW,
  board: [[]],
  // playing:
  begin: 0,
  // over:
  end: 0,
  rank: 0,
  score: 0,
  mines: []
}
