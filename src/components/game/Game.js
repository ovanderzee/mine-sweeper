import { BOARD_SIZE } from '../../constants'
import GameCell from './GameCell'
import './Game.css'

const Game = () => {
  const boardTemplate = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill({}))

  const newBoard = boardTemplate.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return {
        row: rowIndex,
        col: colIndex,
        fill: 0,
      }
    })
  )

  const evaluateGame = (row, col) => {
    console.log(`touched at ${row}, ${col}`)
  }

  const gameBoard = (
    <article id="playground" className={`board-size__${BOARD_SIZE}`}>
      {newBoard.map((row) =>
        row.map((cell) => (
          <GameCell
            key={`${cell.row}_${cell.col}`}
            row={cell.row}
            col={cell.col}
            fill={cell.fill}
            onTouch={evaluateGame}
          />
        ))
      )}
    </article>
  )

  return (
    <section id="game" className="screen">
      {gameBoard}
    </section>
  )
}

export default Game
