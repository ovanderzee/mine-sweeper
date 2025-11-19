import { useContext } from 'react'
import PageContext from '../../store/page-context'

import { ScoreItem } from '../../common/game.d'
import { ShieldByRank } from './Shield'
import { precise } from '../../common/scoring'
import './ScorePopover.css'

const ScorePopover = (props: {score: ScoreItem | null}) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const log = props.score

  if (!log) return

  const loggedDate = new Date(log.date)

  return (
    <figure
      className={`${log.rank <= 10 ? 'super' : ''} latest`}
      key={`${log.rank}_${log.score.points}`}
    >
      <header>
        <h2 className="rank">
          {log.rank <= 10 ? <ShieldByRank rank={log.rank} /> : log.rank}
        </h2>
        <h3 className="user">{log.user}</h3>
        <h4 className="date" data-date={log.date}>
          {loggedDate.toLocaleDateString()}<br/>
          {loggedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </h4>
      </header>
      <article>
        <section className="group">
          <h5>{text.fame['result']}</h5>
          <div className="unit">
            <small>{text.VAR['efficiency']}</small>
            <span className="efficiency">{precise(log.score.efficiency, 3)}</span>
          </div>
          <big>&times;</big>
          <div className="unit">
            <small>{text.VAR['speed']}</small>
            <span className="speed">{precise(log.score.speed, 3)}/s</span>
          </div>
          <big>&rarr;</big>
          <div className="unit">
            <small>{text.VAR['points']}</small>
            <span className="points">{log.score.points}</span>
          </div>
        </section>

        <section className="group">
          <h5>{text.fame['game-play']}</h5>
          <div className="unit">
            <small>{text.VAR['moves']}</small>
            <span className="moves">{log.play.moves}</span>
          </div>
          <big>|</big>
          <div className="unit">
            <small>{text.VAR['duration']}</small>
            <span className="duration">{precise(log.play.duration, 3)}s</span>
          </div>
        </section>

        <section className="group">
          <h5>{text.fame['characteristics']}</h5>
          <div className="unit">
            <small>{text.fame['effort']}</small>
            <span>{log.game.effort.least} - {log.game.effort.most}</span>
          </div>
        </section>

        <section className="group">
          <h5>{text.fame['configuration']}</h5>
          <div className="unit">
            <small>{text.VAR['level']}</small>
            <span className="level">{log.level}</span>
          </div>
          <big>&</big>
          <div className="unit">
            <small>{text.VAR['cells']}</small>
            <span className="cells">{log.game.cells}</span>
          </div>
          <big style={{transform: 'scaley(1.25)'}}>&rarr;</big>
          <div className="unit">
            <small>{text.VAR['mines']}</small>
            <span className="mines">{log.game.mines}</span>
          </div>
        </section>
      </article>
      <footer>
        <button type="button"
          onClick={() => alert(`rank ${log.rank}`)}
        >{log.user}</button>
      </footer>
    </figure>
  )

}

export default ScorePopover
