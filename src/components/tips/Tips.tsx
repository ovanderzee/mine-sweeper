import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import { GameState } from '../../common/game-types'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

const Tips = (props: TipProps) => (
  <aside className="tips">
    <TimeTracker game={props.game} />
    <MineTracker game={props.game} />
  </aside>
)

export default Tips
