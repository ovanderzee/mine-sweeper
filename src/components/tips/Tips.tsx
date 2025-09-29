import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import BoardFitter from './BoardFitter'
import { GameState } from '../../common/game-types'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

const Tips = (props: TipProps) => (
  <aside className="tips">
    <TimeTracker game={props.game} />
    <MineTracker game={props.game} />
    <BoardFitter />
  </aside>
)

export default Tips
