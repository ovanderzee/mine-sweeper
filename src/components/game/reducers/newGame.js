import { BOARD_SIZE, MINE_COUNT } from '../../../constants'
import { iterateNeighbours, initialCellState, boardTemplate, defaultGameState } from '../common'

const newGameReducer = (state) => {
  const newBoard = boardTemplate.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return {
        ...initialCellState,
        row: rowIndex,
        col: colIndex,
      }
    })
  )

  const minePick = new Set()

  while (minePick.size < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE)
    const col = Math.floor(Math.random() * BOARD_SIZE)
    minePick.add(newBoard[row][col])
  }

  minePick.forEach((cell) => {
    cell.fill += 9
    const countNeighbourMines = (x, y) => {
      newBoard[x][y].fill += 1
    }
    iterateNeighbours(cell, countNeighbourMines)
  })

  return {
    ...defaultGameState,
    board: newBoard,
  }
}

export default newGameReducer
