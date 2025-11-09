import { ScoreItem } from '../../common/game.d'
import { ShieldByRank } from './Shield'

const ScorePopover = (props: {score: ScoreItem | null}) => {
  const log = props.score

  return log && (
    <li
      className={`${log.rank <= 10 ? 'super' : ''} latest`}
      key={`${log.rank}_${log.score.points}`}
    >
      <header>
        <h2 className="rank">
          {log.rank <= 10 ? <ShieldByRank rank={log.rank} /> : log.rank}
        </h2>
      </header>
      <footer>
        <button type="button"
          onClick={() => alert(`rank ${log.rank}`)}
        >{log.user}</button>
      </footer>
    </li>
  )

}

export default ScorePopover
