import { CellState, CellStateStage, GameState, GameStages, ScoreItem } from '../../common/game-types'

/**
 * Do something to neighbour cells
 * @param {Object} cell
 * @param {Number} BOARD_SIZE
 * @param {Function} callback with (x, y) arguments
 */
export const iterateNeighbours = (cell: CellState, BOARD_SIZE: number, callback: (x: number, y: number) => void) => {
  const { row, col } = cell
  const rowStart = row > 0 ? row - 1 : 0
  const rowEnd   = row < BOARD_SIZE - 1 ? row + 1 : row
  const colStart = col > 0 ? col - 1 : 0
  const colEnd   = col < BOARD_SIZE - 1 ? col + 1 : col

  for (let x = rowStart; x <= rowEnd; x++) {
    for (let y = colStart; y <= colEnd; y++) {
      if (x !== row || y !== col) {
        callback(x, y)
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

export const initialScore: ScoreItem = {
  code: '', date: 0, user: '', rank: 0,
  game: {cells: 0, mines: 0, effort: {least: 0, most: 0}},
  play: {moves: 0, duration: 0},
  score: {efficiency: 0, speed: 0, points: 0}
}

/** Complete data model */
export const initialGameState: GameState = {
  // new
  stage: GameStages.NEW,
  board: [[]],
  // playing:
  tZero: 0,
  tShift: 0,
  // over:
  score: initialScore,
  mines: []
}
