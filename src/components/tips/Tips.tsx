import { RefObject } from 'react'
import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import BoardFitter from './BoardFitter'
import { GameState } from '../../common/game.d'
import './Tips.css'

interface TipsProps {
  game: GameState;
  playgroundRef: RefObject<HTMLElement | null>;
}

export interface TipProps {
  game: GameState;
}

const Tips = (props: TipsProps) => (
  <aside className="tips">
    <TimeTracker game={props.game} />
    <MineTracker game={props.game} />
    <BoardFitter playgroundRef={props.playgroundRef} />
  </aside>
)

export default Tips
