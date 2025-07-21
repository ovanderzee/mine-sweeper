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
import { gameReducer } from './game-reducer'
import { GameStages, GameAction, GameActionType } from '../../common/game-types'
import storage from '../../common/storage'
import TimeTracker from './TimeTracker'
import './Game.css'

const Game = () => {
  const pageCtx = useContext(PageContext)
  const { BOARD_SIZE, FONT_SIZE } = pageCtx.config

  const [gameState, dispatchGameAction] = useReducer(
    gameReducer.bind(pageCtx.config),
    initialGameState
  )

  useEffect(() => {
    if (gameState === initialGameState) {
      const storedState = storage.game
      const storedGameHasEnded = storedState && (
        storedState.stage === GameStages.WON || storedState.stage === GameStages.LOST
      )
      if (storedState && !storedGameHasEnded) {
        const action: GameAction = { type: GameActionType.LOAD, payload: JSON.stringify(storedState) }
        dispatchGameAction(action)
      } else {
        const action: GameAction = { type: GameActionType.NEW }
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
      <aside>
        <TimeTracker game={gameState} />
      </aside>
    </article>
  )

  const gameNavigation = (
    <nav>
      <HiScores board={gameState.board} />
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
