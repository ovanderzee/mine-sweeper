import { useReducer } from 'react'
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

/** INITIALS, TEMPLATES & DEFAULTS  */

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

/** REDUCE */

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

const replayReducer = (state) => {
  const newBoard = state.board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return {
        ...cell,
        done: false,
      }
    })
  )

  return {
    stage: 'game-new',
    board: newBoard,
    start: 0,
    end: 0,
  }
}

const touchButtonReducer = (state, action) => {
  if (state.stage === 'game-new') {
    state.stage = 'game-playing'
    state.start = Date.now()
  }

  const updBoard = state.board
  const cell = updBoard[action.row][action.col]

  if (
    state.stage !== 'game-playing' ||
    state.end ||
    cell.done
  )
    return state

  /** All-purpose cell updater */
  const touchCell = (source) => {
    updBoard[source.row][source.col] = {
      ...source,
      done: true,
    }
  }

  touchCell(cell)

  const findPristineCells = () =>
    updBoard
      .map((row) => row.filter((cell) => !cell.done))
      .flat()

  /** Followup touches */
  if (cell.fill === 0) {
    // blank cell touched, touch it's neighbours recursively
    const touchBlankNeighbours = (x, y) => {
      const neighbourCell = updBoard[x][y]
      if (neighbourCell.done) return
      touchCell(neighbourCell)
      if (neighbourCell.fill === 0)
        iterateNeighbours(updBoard[x][y], touchBlankNeighbours)
    }
    iterateNeighbours(cell, touchBlankNeighbours)
  } else if (cell.fill > 8) {
    // mine touched, touch all buttons, game lost
    findPristineCells().forEach((cell) => touchCell(cell))
    state.stage = 'game-lost'
    state.end = Date.now()
  } else {
    // neighbour of mine touched, show contents
  }

  const pristineCells = findPristineCells()
  if (pristineCells.length === MINE_COUNT) {
    // only mines remain, touch remaining buttons, game won
    pristineCells.forEach((cell) => touchCell(cell))
    state.stage = 'game-won'
    state.end = Date.now()
  }

  return {
    ...state,
    board: updBoard,
  }
}

const gameReducer = (state, action) => {
  if (action.type === 'NEW') {
    return newGameReducer(state)
  }

  if (action.type === 'REPLAY') {
    return replayReducer(state)
  }

  if (action.type === 'TOUCH') {
    return touchButtonReducer(state, action)
  }

  return defaultGameState
}

const Game = () => {
  const [gameState, dispatchGameAction] = useReducer(
    gameReducer,
    defaultGameState
  )

  if (gameState === defaultGameState) {
    dispatchGameAction({ type: 'NEW' })
  }

  const gameBoard = (
    <article id="playground" className={`board-size__${BOARD_SIZE}`}>
      {gameState.board.map((row) =>
        row.map((cell) => (
          <GameCell
            key={`${cell.row}_${cell.col}`}
            row={cell.row}
            col={cell.col}
            fill={cell.fill}
            done={cell.done}
            onTouch={dispatchGameAction}
          />
        ))
      )}
    </article>
  )

  const gameNavigation = (
    <nav>
      {/* <HiScores label={'&times;'} /> */}
      <HiScores label={`${MINE_COUNT}\u00d7`} />
      <NewGame onNew={dispatchGameAction} />
      <Replay onReplay={dispatchGameAction} />
      <Flagging />
      <Help />
      <Settings />
    </nav>
  )

  return (
    <section id="game" className={`screen ${gameState.stage}`}>
      {gameBoard}
      {gameNavigation}
    </section>
  )
}

export default Game
