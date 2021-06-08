import { useRef } from 'react'
import { BOARD_SIZE, MINE_COUNT } from '../../constants'
import GameCell from './GameCell'
import HiScores from '../nav/HiScores'
import NewGame from '../nav/NewGame'
import Replay from '../nav/Replay'
import Flagging from '../nav/Flagging'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import './Game.css'

/**
 * Trigger onClick listener of a button
 * @param {HTMLButtonElement} btn
 */
const dispatchButtonHandler = (btn) => {
  const clickEvent = new Event('click', { bubbles: true })
  btn.dispatchEvent(clickEvent)
}

/**
 * Do something to neighbouring cells
 * @param {Object} cell
 * @param {Function} callback with (x, y) arguments
 */
const iterateNeighbours = (cell, callback) => {
  for (let x = cell.row - 1; x < cell.row + 2; x++) {
    if (x >= 0 && x < BOARD_SIZE) {
      for (let y = cell.col - 1; y < cell.col + 2; y++) {
        if (y >= 0 && y < BOARD_SIZE) {
          callback(x, y)
        }
      }
    }
  }
}

const boardTemplate = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill({}))

const Game = () => {
  const gameStage = useRef('game-playing')
  const changeGameStage = (stateLabel) => {
    document.getElementById('game').classList.remove(gameStage.current)
    gameStage.current = stateLabel
    document.getElementById('game').classList.add(gameStage.current)
  }

  const newBoard = boardTemplate.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return {
        row: rowIndex,
        col: colIndex,
        fill: 0,
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
    const countNeighbouringMines = (x, y) => {
      newBoard[x][y].fill += 1
    }
    iterateNeighbours(cell, countNeighbouringMines)
  })

  const touchBoardHandler = (row, col) => {
    if (gameStage.current !== 'game-playing') return
    if (newBoard[row][col].fill === 0) {
      // emptiness touched, touch neighbouring empties
      const virtualClickNeighbouringEmpties = (x, y) => {
        const neighbouringButton = document.querySelector(
          `#row${x}col${y}.pristine`
        )
        console.log('virtualClickNeighbouringEmpties', x, y, neighbouringButton)
        neighbouringButton && dispatchButtonHandler(neighbouringButton)
      }
      iterateNeighbours(newBoard[row][col], virtualClickNeighbouringEmpties)
    } else if (newBoard[row][col].fill > 8) {
      // mine touched, touch all buttons, game lost
      const allButtons = document.querySelectorAll(
        '#playground button.pristine'
      )
      allButtons.forEach((btn) => dispatchButtonHandler(btn))
      changeGameStage('game-lost')
    }
    const pristines = document.querySelectorAll('#playground .pristine')
    if (pristines.length === MINE_COUNT) {
      // only mines remain, touch remaining buttons, game won
      pristines.forEach((btn) => dispatchButtonHandler(btn))
      changeGameStage('game-won')
    }
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
            onTouch={touchBoardHandler}
          />
        ))
      )}
    </article>
  )

  const gameNavigation = (
    <nav>
      {/* <HiScores label={'&times;'} /> */}
      <HiScores label={`${MINE_COUNT}\u00d7`} />
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
