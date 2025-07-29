import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import EraseScores from '../nav/EraseScores'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { ShieldByRank } from '../UI/Shield'
import { ScoreItem } from '../../common/game-types'
import storage from '../../common/storage'
import './Meta.css'
import './HallOfFame.css'

const HallOfFame = () => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const rawScores = storage.scores
  const latest = [...rawScores].sort((a:ScoreItem, b:ScoreItem) => b.date - a.date)[0]

  const [scores, setScores] = useState(rawScores)

  const eraseScores = () => {
    setScores(storage.scores)
  }

  const fameContent = (
    <article>
      <h2>{text.nav['Hall of Fame']}</h2>
      <ol>
        <li>
          <footer>
            <div className="score">{text.fame['score']}</div>
            <div className="mines-cells">{text.fame['mines']} / {text.fame['cells']}</div>
            <div className="moves">{text.fame['moves']}</div>
            <div className="duration">{text.fame['duration']}</div>
          </footer>
        </li>

        {!scores.length && (
          <li>
            <header>
              <h4>{text.fame['Nothing Yet']}</h4>
            </header>
          </li>
        )}

        {scores.map((log: ScoreItem, index: number) => (
          <li
            className={`${index < 10 ? 'super' : ''} ${log.date === latest.date ? 'latest' : ''}`}
            key={`${index + 1}_${log.score}`}
          >
            <header>
              <h2 className="rank">
                {index < 10 && <ShieldByRank rank={index + 1} />}
                {index >= 10 && index + 1}
              </h2>
              <h4 className="user">{log.user}</h4>
              <h4 className="date">
                {(new Date(log.date)).toLocaleDateString()}<br/>
                {(new Date(log.date)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </h4>
            </header>
            <footer>
              <div className="score">{log.score.points}</div>
              <div className="mines-cells">{log.game.mines}&thinsp;/&thinsp;{log.game.cells}</div>
              <div className="moves">{log.game.effort.least}&#8239;&lt;&#8239;<b>{log.play.moves}</b>&#8239;&lt;&#8239;{log.game.effort.most} </div>
              <div className="duration">{Math.round(log.play.duration)}s</div>
            </footer>
          </li>
        ))}
      </ol>
    </article>
  )

/*
&#8239; narrow non-breaking space
&thinsp; half space
*/

  const fameNavigation = (
    <nav>
      <EraseScores onErase={eraseScores} />
      {/*<HiScores />*/}
      <Help />
      <Settings />
      <GoBack />
    </nav>
  )

  return (
    <section
      className="screen"
      style={{fontSize: `${FONT_SIZE}px`}}
    >
      {fameContent}
      {fameNavigation}
    </section>
  )
}

export default HallOfFame
