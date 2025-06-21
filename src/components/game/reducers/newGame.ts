import { iterateNeighbours, initialBoard, initialGameState } from '../common'
import { AppConfig } from '../../../common/app-types'
import { GameState, CellState } from '../../../common/game-types'

export const newGameReducer = (config: AppConfig): GameState => {
  const { BOARD_SIZE, MINE_COUNT } = config

  const newBoard = initialBoard(BOARD_SIZE).map((row, rowIndex) =>
    row.map((cell: CellState, colIndex: number) => {
      return {
        ...cell,
        row: rowIndex,
        col: colIndex,
      }
    })
  )

  const minePick: Set<CellState> = new Set()

  while (minePick.size < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE)
    const col = Math.floor(Math.random() * BOARD_SIZE)
    minePick.add(newBoard[row][col])
  }

  const countNeighbourMines = (x: number, y: number) => {
    newBoard[x][y].fill += 1
  }

  minePick.forEach(cell => {
    cell.fill += 9
    iterateNeighbours(cell, BOARD_SIZE, countNeighbourMines)
  })

  return {
    ...initialGameState,
    board: newBoard,
  }
}
