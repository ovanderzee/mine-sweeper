import { useContext, useState, useEffect, useReducer, useRef } from 'react'
import PageContext from '../../store/page-context'
import GameCell from './GameCell'
import GameCellDemoNav from '../meta/GameCellDemo'
import NavOptionsBar from '../nav/NavOptionsBar'
import HiScores from '../nav/HiScores'
import NewGame from '../nav/NewGame'
import Replay from '../nav/Replay'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import { ShieldModal } from '../UI/Modal'
import { initialGameState } from './common'
import { gameReducer } from './game-reducer'
import { GameStages, GameAction, GameActionType } from '../../common/game.d'
import storage from '../../common/storage'
import Tips from './../tips/Tips'
import './Game.css'

const Game = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const { BOARD_SIZE } = pageCtx.config

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

  const playgroundRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)

  const gameBoard = (
    <article
      ref={playgroundRef}
      role="main"
      aria-labelledby="page-heading"
      id="playground"
      className={`board-size__${BOARD_SIZE} ${gameState.stage}`}
      style={{'--board-size': BOARD_SIZE} as React.CSSProperties}
    >
      <h1 className="sr-only" id="page-heading">{text.nav['Playground']}</h1>
      <div id="game-board" role="grid">
        {gameState.board.map((row, index) => <div role="row" key={`row_${index}`}>{
          row.map((cell) => (
            <GameCell
              key={`${cell.row}_${cell.col}`}
              cell={cell}
              onTouch={dispatchGameAction}
            />
          ))
        }</div>)}
      </div>
      <Tips
        game={gameState}
        onNew={dispatchGameAction}
        playgroundRef={playgroundRef}
      />
    </article>
  )

  const gameNavigation = (
    <NavOptionsBar>
      <HiScores />
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
    </NavOptionsBar>
  )

  const [showWonModal, setShowWonModal] = useState(false)
  const gameWasWon = gameState.stage === GameStages.WON
  const gameWasLost = gameState.stage === GameStages.LOST

  useEffect(() => {
    if (gameWasWon) {
      const action: GameAction = { type: GameActionType.VICTORY}
      dispatchGameAction(action)
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const gameWonModal = <ShieldModal
    label={text.game['congrats']
      .replace('%p', gameState.score.score.points.toString())
      .replace('%r', gameState.score.rank.toString())
    }
    message={gameState.score.rank.toString()}
    onConfirm={() => {}}
    isShowModal={showWonModal}
    endShowModal={()=>setShowWonModal(false)}
  />

  return (
    <>
      {gameBoard}
      {gameNavigation}
      {gameWonModal}
    </>
  )
}

export default Game
