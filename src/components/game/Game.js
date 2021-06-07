import { BOARD_SIZE, GAME_LEVEL } from '../../constants'
import GameCell from './GameCell'
import HiScores from '../nav/HiScores'
import NewGame from '../nav/NewGame'
import Replay from '../nav/Replay'
import Flagging from '../nav/Flagging'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
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

  const mineCount = Math.ceil(GAME_LEVEL * (1 / 30) * BOARD_SIZE * BOARD_SIZE)

  const minePick = new Set()

  while (minePick.size < mineCount) {
    const row = Math.floor(Math.random() * BOARD_SIZE)
    const col = Math.floor(Math.random() * BOARD_SIZE)
    minePick.add(newBoard[row][col])
  }

  minePick.forEach((cell) => {
    cell.fill += 9
    for (let x = cell.row - 1; x < cell.row + 2; x++) {
      if (x >= 0 && x < BOARD_SIZE) {
        for (let y = cell.col - 1; y < cell.col + 2; y++) {
          if (y >= 0 && y < BOARD_SIZE) {
            newBoard[x][y].fill += 1
          }
        }
      }
    }
  })

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

  const gameNavigation = (
    <nav>
      {/* <HiScores label={'&times;'} /> */}
      <HiScores label={`${mineCount}\u00d7`} />
      <NewGame />
      <Replay />
      <Flagging />
      <Help />
      <Settings />
    </nav>
  )

  return (
    <section id="game" className="screen">
      {gameBoard}
      {gameNavigation}
    </section>
  )
}

export default Game
