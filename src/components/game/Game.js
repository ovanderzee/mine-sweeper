import { useContext, useState, useEffect, useReducer } from 'react'
import PageContext from '../../store/page-context'
import GameCell from './GameCell'
import HiScores from '../nav/HiScores'
import NewGame from '../nav/NewGame'
import Replay from '../nav/Replay'
import Flagging from '../nav/Flagging'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import Modal from '../UI/Modal'
import { initialGameState } from './common'
import newGameReducer from './reducers/newGame'
import replayReducer from './reducers/replay'
import touchButtonReducer from './reducers/touchButton'
import flaggingReducer from './reducers/flagging'
import victoryReducer from './reducers/victory'
import './Game.css'

const gameReducer = function (state, action) {
  action.config = this

  if (action.type === 'LOAD') {
    return JSON.parse(action.stateString)
  }

  if (action.type === 'STORE') {
    const currentState = JSON.stringify(state)
    sessionStorage.setItem('mijnenvegerij', currentState)
    return state;
  }

  if (action.type === 'NEW') {
    return newGameReducer(action)
  }

  if (action.type === 'REPLAY') {
    return replayReducer(state)
  }

  if (action.type === 'TOUCH') {
    return touchButtonReducer(state, action)
  }

  if (action.type === 'FLAGGING') {
    return flaggingReducer(state, action)
  }

  if (action.type === 'VICTORY') {
    return victoryReducer(state, action)
  }

  return initialGameState
}

const Game = () => {
  const pageCtx = useContext(PageContext)
  const { BOARD_SIZE, MINE_COUNT, FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const [gameState, dispatchGameAction] = useReducer(
    gameReducer.bind(pageCtx.config),
    initialGameState
  )

  useEffect(() => {
    if (gameState === initialGameState) {
      const storedState = sessionStorage.getItem('mijnenvegerij')
      const gameHasEnded = storedState && (
        storedState.includes('"game-won"') ||
        storedState.includes('"game-lost"')
      )
      if (storedState && !gameHasEnded) {
        dispatchGameAction({ type: 'LOAD', stateString: storedState })
      } else {
        dispatchGameAction({ type: 'NEW' })
      }
    }
    return () => {
      dispatchGameAction({ type: 'STORE' })
    }
  });

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
            locked={cell.locked}
            flagging={gameState.flagging}
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
      <NewGame
        onNew={dispatchGameAction}
        stage={gameState.stage}
      />
      <Replay
        onReplay={dispatchGameAction}
        stage={gameState.stage}
      />
      <Flagging
        onFlagging={dispatchGameAction}
        flagging={gameState.flagging}
      />
      <Help />
      <Settings />
    </nav>
  )

  const [showWonModal, setShowWonModal] = useState(false)
  const gameWasWon = gameState.stage === 'game-won'

  useEffect(() => {
    if (gameWasWon) {
      dispatchGameAction({
        type: 'VICTORY'
      })
      setShowWonModal(true)
    }
  }, [gameWasWon])

  const gameWonModal = <Modal
    onConfirm={() => {}}
    onClose={() => setShowWonModal(false)}
    className={gameState.stage}
    textBefore={gameState.rank}
    textAfter={gameState.score}
  >
    {text.game['You Won!']}
  </Modal>

  return (
    <section
      id="game"
      className={`screen ${gameState.stage} ${gameState.flagging ? 'flagging' : ''}`}
      style={{fontSize: `${FONT_SIZE}px`}}
    >
      {gameBoard}
      {gameNavigation}
      {showWonModal && gameWonModal}
    </section>
  )
}

export default Game
