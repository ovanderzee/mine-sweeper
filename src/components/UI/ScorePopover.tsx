import { useContext } from 'react'
import PageContext from '../../store/page-context'

import { ScoreItem } from '../../common/game.d'
import { ShieldByRank } from './Shield'
import ElasticBrace from './ElasticBrace'
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
      <article className="functional-grid">
        <section className="group">
          <h5>{text.VAR['efficiency']}</h5>
          <div className="abstract">
            <code>&fnof;(</code>
            <div className="unit">
              <small>{text.fame['least']}</small>
              <span className="moves">{log.game.effort.least} &le;</span>
            </div>
            <div className="unit">
              <small>{text.VAR['moves']}</small>
              <span className="moves">{log.play.moves}</span>
            </div>
            <div className="unit">
              <small>{text.fame['most']}</small>
              <span className="moves">&le; {log.game.effort.most}</span>
            </div>
            <code>)</code>
            <code className="xl">&rArr;</code>
            <div className="unit">
              <small>{text.VAR['efficiency']}</small>
              <span className="efficiency">{precise(log.score.efficiency, 3)}</span>
            </div>
          </div>
        </section>

        <section className="group">
          <h5>{text.VAR['speed']}</h5>
          <div className="abstract">
            <code>&fnof;(</code>
            <div className="unit">
              <small>{text.VAR['moves']}</small>
              <span className="moves">{log.play.moves}</span>
            </div>
            <code className="s">/</code>
            <div className="unit">
              <small>{text.VAR['duration']}</small>
              <span className="duration">{precise(log.play.duration, 3)}s</span>
            </div>
            <code>)</code>
            <code className="xl">&rArr;</code>
            <div className="unit">
              <small>{text.VAR['speed']}</small>
              <span className="speed">{precise(log.score.speed, 3)}/s</span>
            </div>
          </div>
        </section>

        <section className="result">
          <ElasticBrace />

          <div className="unit">
            <small>{text.VAR['points']}</small>
            <span className="points">{log.score.points}</span>
          </div>
        </section>

      </article>
      <article>
        <section className="group">
          <h5>{text.fame['characteristics']}</h5>
          <div className="unit">
            <small>{text.fame['effort']}</small>
            <span>{log.game.effort.least} - {log.game.effort.most}</span>
          </div>
        </section>

        <section className="group">
          <h5>{text.fame['configuration']}</h5>
          <code>&fnof;(</code>
          <div className="unit">
            <small>{text.VAR['level']}</small>
            <span className="level">{log.level}</span>
          </div>
          <code className="s">&</code>
          <div className="unit">
            <small>{text.VAR['cells']}</small>
            <span className="cells">{log.game.cells}</span>
          </div>
          <code>)</code>
          <code className="xl">&rArr;</code>
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
