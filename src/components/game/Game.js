import { BOARD_SIZE } from '../../constants'
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
      <HiScores label={'\u00d7'} />
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
