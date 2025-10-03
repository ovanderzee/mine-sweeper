import { RefObject } from 'react'
import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import BoardFitter from './BoardFitter'
import NewGame from '../nav/NewGame'
import { GameState, GameAction } from '../../common/game-types'
import '../nav/NavOptionButton.css'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

interface TipsProps extends TipProps {
  onNew: (action: GameAction) => void
  playgroundRef: RefObject<HTMLElement | null>;
}

const Tips = (props: TipsProps) => (
  <aside className="tips">
    <TimeTracker game={props.game} />
    <MineTracker game={props.game} />
    <section id="new-game-tip" className="tip">
      <NewGame onNew={props.onNew} stage={props.game.stage} appearance="tip" />
    </section>
    <BoardFitter playgroundRef={props.playgroundRef} />
  </aside>
)

export default Tips
