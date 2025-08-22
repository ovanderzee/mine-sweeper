import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import EraseScores from '../nav/EraseScores'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { ShieldByRank } from '../UI/Shield'
import { ScoreItem } from '../../common/game-types'
import storage from '../../common/storage'
import { precise } from '../game/scoring'
import './Meta.css'
import './HallOfFame.css'

const HallOfFame = () => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const rawScores = storage.scores
  const latest = [...rawScores].sort((a:ScoreItem, b:ScoreItem) => b.date - a.date)[0]

  const [scores, setScores] = useState(rawScores)
  const [sortLabel, setSortLabel] = useState('points')

  const eraseScores = () => {
    setScores(storage.scores)
  }

  const sortByUser = () => {
    setSortLabel('user')
    const byRank = (a: ScoreItem, b: ScoreItem) => a.rank - b.rank
    rawScores.sort(byRank)
    const rankedUsers = [...new Set(rawScores.map((rs) => rs.user))]
    const userSort: ScoreItem[] = []
    rankedUsers.forEach((user) => {
      userSort.push(...rawScores.filter((rs) => rs.user === user))
    })
    setScores(userSort)
  }

  const sortByDate = () => {
    setSortLabel('date')
    const byDate = (a: ScoreItem, b: ScoreItem) => b.date - a.date
    setScores(rawScores.sort(byDate))
  }

  const sortByPoints = () => {
    setSortLabel('points')
    const byPoints = (a:ScoreItem, b:ScoreItem) => b.score.points - a.score.points
    setScores(rawScores.sort(byPoints))
  }

  const sortByEfficiency = () => {
    setSortLabel('efficiency')
    const byEfficiency = (a:ScoreItem, b:ScoreItem) => b.score.efficiency - a.score.efficiency
    setScores(rawScores.sort(byEfficiency))
  }

  const sortBySpeed = () => {
    setSortLabel('speed')
    const bySpeed = (a:ScoreItem, b:ScoreItem) => b.score.speed - a.score.speed
    setScores(rawScores.sort(bySpeed))
  }

  const sortByMines = () => {
    setSortLabel('mines')
    const byMines = (a:ScoreItem, b:ScoreItem) => a.game.mines - b.game.mines
    setScores(rawScores.sort(byMines))
  }

  const sortByCells = () => {
    setSortLabel('cells')
    const byCells = (a:ScoreItem, b:ScoreItem) => a.game.cells - b.game.cells
    setScores(rawScores.sort(byCells))
  }

  const sortByMoves = () => {
    setSortLabel('moves')
    const byMoves = (a:ScoreItem, b:ScoreItem) => a.play.moves - b.play.moves
    setScores(rawScores.sort(byMoves))
  }

  const sortByDuration = () => {
    setSortLabel('duration')
    const byDuration = (a:ScoreItem, b:ScoreItem) => a.play.duration - b.play.duration
    setScores(rawScores.sort(byDuration))
  }

  const fameContent = (
    <article>
      <h2>{text.nav['Hall of Fame']}</h2>
      <table className={`legend ${sortLabel}`}><tbody><tr>
        <td></td>
        <td><a className="user" onClick={sortByUser}>{text.fame['user']}</a></td>
        <td></td>
        <td></td>
        <td><a className="date" onClick={sortByDate}>{text.fame['date']}</a></td>
      </tr><tr>
        <td><a className="points" onClick={sortByPoints}>{text.fame['points']}</a></td>
        <td><a className="efficiency" onClick={sortByEfficiency}>{text.fame['efficiency']}</a></td>
        <td><a className="mines" onClick={sortByMines}>{text.fame['mines']}</a></td>
        <td><a className="moves" onClick={sortByMoves}>{text.fame['moves']}</a></td>
        <td><a className="duration" onClick={sortByDuration}>{text.fame['duration']}</a></td>
      </tr><tr>
        <td></td>
        <td><a className="speed" onClick={sortBySpeed}>{text.fame['speed']}</a></td>
        <td><a className="cells" onClick={sortByCells}>{text.fame['cells']}</a></td>
        <td></td>
        <td></td>
      </tr></tbody></table>
      <ol>
        {!scores.length && (
          <li>
            <header>
              <h4>{text.fame['Nothing Yet']}</h4>
            </header>
          </li>
        )}

        {scores.map((log: ScoreItem, index) => (
          <li
            className={`${log.rank <= 10 ? 'super' : ''} ${log.date === latest.date ? 'latest' : ''}`}
            key={`${log.rank}_${log.score.points}`}
          >
            <header>
              <h2 className="rank" title={'#' + index}>
                {log.rank <= 10 ? <ShieldByRank rank={log.rank} /> : log.rank}
              </h2>
              <h4 className="user">{log.user}</h4>
              <h4 className="date" data-date={log.date}>
                {(new Date(log.date)).toLocaleDateString()}<br/>
                {(new Date(log.date)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </h4>
            </header>
            <footer>
              <div className="points">{log.score.points}</div>
              <div className="efficiency-speed">{precise(log.score.efficiency, 2)}&thinsp;/&thinsp;{precise(log.score.speed, 2)}</div>
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
    <NavOptionsBar>
      <EraseScores onErase={eraseScores} />
      <Help />
      <Settings />
      <GoBack />
    </NavOptionsBar>
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
