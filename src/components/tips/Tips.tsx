import { RefObject } from 'react'
import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import FullscreenPlay from './FullscreenPlay'
import NewGame from '../nav/NewGame'
import { GameState, GameAction } from '../../common/game.d'
import '../nav/NavOptionButton.css'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

interface TipsProps extends TipProps {
  onNew: (action: GameAction) => void
  playgroundRef: RefObject<HTMLDivElement>
}

const Tips = (props: TipsProps) => (
  <aside className="tips" role="presentation">
    <TimeTracker game={props.game} />
    <MineTracker game={props.game} />
    <section id="tip-action" className="tip">
      <NewGame onNew={props.onNew} stage={props.game.stage} appearance="tip" />
    </section>
    <FullscreenPlay playgroundRef={props.playgroundRef} />
  </aside>
)

export default Tips
