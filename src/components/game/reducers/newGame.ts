import { iterateNeighbours, initialBoard, initialGameState } from '../common'

const newGameReducer = (config) => {
  const { BOARD_SIZE, MINE_COUNT, GAME_LEVEL } = config

  const newBoard = initialBoard(BOARD_SIZE).map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return {
        ...cell,
        row: rowIndex,
        col: colIndex,
      }
    })
  )

  const countNeighbourMines = (x, y) => {
    newBoard[x][y].fill += 1
  }

  const minePick = new Set()

  while (minePick.size < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE)
    const col = Math.floor(Math.random() * BOARD_SIZE)
    minePick.add(newBoard[row][col])
  }

  minePick.forEach((cell) => {
    cell.fill += 9
    iterateNeighbours(cell, BOARD_SIZE, countNeighbourMines)
  })

  return {
    ...initialGameState,
    board: newBoard,
    level: GAME_LEVEL,
  }
}

export default newGameReducer
