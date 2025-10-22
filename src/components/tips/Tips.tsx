import { RefObject } from 'react'
import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import FullscreenPlay from './FullscreenPlay'
import NewGame from '../nav/NewGame'
import { isFullscreenAble } from '../../common/screenfull'
import { GameState, GameAction } from '../../common/game.d'
import '../nav/NavOptionButton.css'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

interface TipsProps extends TipProps {
  onNew: (action: GameAction) => void
  playgroundRef: RefObject<HTMLElement | null>
  setPlaygroundFit: (arg: string) => void
}

const Tips = (props: TipsProps) => (
  <aside className="tips">
    <TimeTracker game={props.game} />
    <MineTracker game={props.game} />
    <section id="tip-action" className="tip">
      <NewGame onNew={props.onNew} stage={props.game.stage} appearance="tip" />
    </section>
    {isFullscreenAble() && <FullscreenPlay
      playgroundRef={props.playgroundRef}
      setPlaygroundFit={props.setPlaygroundFit}
    />}
  </aside>
)

export default Tips
