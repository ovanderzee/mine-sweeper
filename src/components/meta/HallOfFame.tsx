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
  const latest = [...rawScores].sort((a:ScoreItem, b:ScoreItem) => b.time - a.time)[0]

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

        {scores.map((play: ScoreItem, index: number) => (
          <li
            className={`${index < 10 ? 'super' : ''} ${play.time === latest.time ? 'latest' : ''}`}
            key={`${index + 1}_${play.score}`}
          >
            <header>
              <h2 className="rank">
                {index < 10 && <ShieldByRank rank={index + 1} />}
                {index >= 10 && index + 1}
              </h2>
              <h4 className="user">{play.user}</h4>
              <h4 className="date">
                {(new Date(play.time)).toLocaleDateString()}<br/>
                {(new Date(play.time)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </h4>
            </header>
            <footer>
              <div className="score">{play.score}</div>
              <div className="mines-cells">{play.mines}&thinsp;/&thinsp;{play.cells}</div>
              <div className="moves">{play.least}&#8239;&lt;&#8239;<b>{play.moves}</b>&#8239;&lt;&#8239;{play.most} </div>
              <div className="duration">{Math.round(play.duration / 1000)}s</div>
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
