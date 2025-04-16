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
import loadReducer from './reducers/load'
import newGameReducer from './reducers/newGame'
import replayReducer from './reducers/replay'
import touchButtonReducer from './reducers/touchButton'
import victoryReducer from './reducers/victory'
import defeatReducer from './reducers/defeat'
import { AppConfig } from '../../common/app-types'
import { GameState, GameStages, GameAction, GameActionType, PayloadAction } from '../../common/game-types'
import './Game.css'

const gameReducer = function (this: AppConfig, state: GameState, action: GameAction) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const config: AppConfig = this

  if (action.type === GameActionType.LOAD) {
    return loadReducer(action as PayloadAction)
  }

  if (action.type === GameActionType.STORE) {
    const currentState = JSON.stringify(state)
    sessionStorage.setItem('mijnenvegerij', currentState)
    return state
  }

  if (action.type === GameActionType.NEW) {
    return newGameReducer(config)
  }

  if (action.type === GameActionType.REPLAY) {
    return replayReducer(state)
  }

  if (action.type === GameActionType.MOVE || action.type === GameActionType.FLAG) {
    return touchButtonReducer(state, action as PayloadAction, config)
  }

  if (action.type === GameActionType.VICTORY) {
    return victoryReducer(state, config)
  }

  if (action.type === GameActionType.DEFEAT) {
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
        const action: GameAction = { type: GameActionType.LOAD, payload: storedState }
        dispatchGameAction(action)
      } else {
        const action: GameAction = { type: GameActionType.NEW}
        dispatchGameAction(action)
      }
    }
    return () => {
      const action: GameAction = { type: GameActionType.STORE}
      dispatchGameAction(action)
    }
  });

  const gameBoard = (
    <article
        id="playground"
        className={`board-size__${BOARD_SIZE}`}
        style={{'--board-size': BOARD_SIZE} as React.CSSProperties}
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
  const gameWasWon = gameState.stage === GameStages.WON
  const gameWasLost = gameState.stage === GameStages.LOST

  useEffect(() => {
    if (gameWasWon) {
      const action: GameAction = { type: GameActionType.VICTORY}
      dispatchGameAction(action)
      setShowWonModal(true)
    } else if (gameWasLost) {
      // blow the untouched mines, odd number of mines will not blow in dev
      const waitTime = 100 + Math.ceil(200 * Math.random())
      const action: GameAction = { type: GameActionType.DEFEAT}
      setTimeout(
        () => dispatchGameAction(action),
        waitTime
      )
    }
  }, [gameWasWon, gameWasLost, gameState.mines])

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
