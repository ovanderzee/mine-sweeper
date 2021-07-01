import { useReducer } from 'react'
import { BOARD_SIZE, MINE_COUNT } from '../../constants'
import GameCell from './GameCell'
import HiScores from '../nav/HiScores'
import NewGame from '../nav/NewGame'
import Replay from '../nav/Replay'
import Flagging from '../nav/Flagging'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import { defaultGameState } from './common'
import newGameReducer from './reducers/newGame'
import replayReducer from './reducers/replay'
import touchButtonReducer from './reducers/touchButton'
import './Game.css'

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
