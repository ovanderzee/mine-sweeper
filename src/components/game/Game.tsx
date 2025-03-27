import { useContext, useState, useEffect, useReducer } from 'react'
import PageContext from '../../store/page-context'
import GameCell from './GameCell'
import GameCellDemoNav from './GameCellDemo'
import HiScores from '../nav/HiScores'
import NewGame from '../nav/NewGame'
import Replay from '../nav/Replay'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GameWonModal from './GameWonModal'
import { initialGameState } from './common'
import newGameReducer from './reducers/newGame'
import replayReducer from './reducers/replay'
import touchButtonReducer from './reducers/touchButton'
import victoryReducer from './reducers/victory'
import defeatReducer from './reducers/defeat'
import './Game.css'

const gameReducer = function (state, action) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const config = this

  if (action.type === 'LOAD') {
    const parsedState = JSON.parse(action.payload)
    return parsedState
  }

  if (action.type === 'STORE') {
    const currentState = JSON.stringify(state)
    sessionStorage.setItem('mijnenvegerij', currentState)
    return state
  }

  if (action.type === 'NEW') {
    return newGameReducer(config)
  }

  if (action.type === 'REPLAY') {
    return replayReducer(state)
  }

  if (action.type === 'MOVE' || action.type === 'FLAG') {
    return touchButtonReducer(state, action, config)
  }

  if (action.type === 'VICTORY') {
    return victoryReducer(state, config)
  }

  if (action.type === 'DEFEAT') {
    return defeatReducer(state)
  }

  return initialGameState
}

const Game = () => {
  const pageCtx = useContext(PageContext)
  const { BOARD_SIZE, MINE_COUNT, FONT_SIZE } = pageCtx.config

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
        const action = { type: 'LOAD', payload: storedState }
        dispatchGameAction(action)
      } else {
        const action = { type: 'NEW' }
        dispatchGameAction(action)
      }
    }
    return () => {
      const action = { type: 'STORE' }
      dispatchGameAction(action)
    }
  });

  const gameBoard = (
    <article
        id="playground"
        className={`board-size__${BOARD_SIZE}`}
        style={{'--board-size': BOARD_SIZE}}
    >
      {gameState.board.map((row) =>
        row.map((cell) => (
          <GameCell
            key={`${cell.row}_${cell.col}`}
            cell={cell}
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
      <Help />
      <Settings />
      <GameCellDemoNav />
    </nav>
  )

  const [showWonModal, setShowWonModal] = useState(false)
  const gameWasWon = gameState.stage === 'game-won'
  const gameWasLost = gameState.stage === 'game-lost'

  useEffect(() => {
    if (gameWasWon) {
      const action = { type: 'VICTORY' }
      dispatchGameAction(action)
      setShowWonModal(true)
    } else if (gameWasLost) {
      // blow the untouched mines, odd number of mines will not blow in dev
      const waitTime = 100 + Math.ceil(200 * Math.random())
      const action = { type: 'DEFEAT' }
      setTimeout(
        () => dispatchGameAction(action),
        waitTime
      )
    }
  }, [gameWasWon, gameWasLost])

  const gameWonModal = <GameWonModal
    close={setShowWonModal}
    state={gameState}
  />

  return (
    <section
      id="game"
      className={`screen ${gameState.stage}`}
      style={{fontSize: `${FONT_SIZE}px`}}
    >
      {gameBoard}
      {gameNavigation}
      {showWonModal && gameWonModal}
    </section>
  )
}

export default Game
