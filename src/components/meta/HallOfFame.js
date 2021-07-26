import { useState } from 'react'
import EraseScores from '../nav/EraseScores'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import text from '../../common/i18n'
import './Meta.css'
import './HallOfFame.css'

const HallOfFame = (props) => {
  const rawScores = localStorage.getItem('mijnengeveegd') || '[]'
  const [scores, setScores] = useState(JSON.parse(rawScores))

  const eraseScores = () => {
    localStorage.setItem('mijnengeveegd', '[]')
    setScores([])
  }

  const fameContent = (
    <article>
      <h2>{text.nav['Hall of Fame']}</h2>
      <ol>
        <li>
          <footer>
            <div className="score">{text.fame['score']}</div>
            <div className="cells">{text.fame['cells']}</div>
            <div className="mines">{text.fame['mines']}</div>
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

        {scores.map((play, index) => (
          <li key={`${index + 1}_${play.score}`}>
            <header>
              <h2 className="rank">{index + 1}</h2>
              <h4 className="user">{play.user}</h4>
              <h4 className="date">{(new Date(play.begin)).toLocaleDateString()}</h4>
            </header>
            <footer>
              <div className="score">{play.score}</div>
              <div className="cells">{play.cells}</div>
              <div className="mines">{play.mines}</div>
              <div className="moves">{play.moves}</div>
              <div className="duration">{Math.round(play.duration / 1000)}s</div>
            </footer>
          </li>
        ))}
      </ol>
    </article>
  )

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
    <section className="screen">
      {fameContent}
      {fameNavigation}
    </section>
  )
}

export default HallOfFame
