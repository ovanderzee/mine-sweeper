import React, { useContext, useState } from 'react'
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
  const text = pageCtx.text

  const rawScores = storage.scores
  const latest = [...rawScores].sort((a:ScoreItem, b:ScoreItem) => b.date - a.date)[0]

  const [scores, setScores] = useState(rawScores)
  const [sortLabel, setSortLabel] = useState('points')

  const eraseScores = () => {
    setScores(storage.scores)
  }

  const methodsByKind: Record<string, () => ScoreItem[]> = {
    'user': () => {
      const byRank = (a: ScoreItem, b: ScoreItem) => a.rank - b.rank
      rawScores.sort(byRank)
      const rankedUsers = [...new Set(rawScores.map((rs) => rs.user))]
      const userSort: ScoreItem[] = []
      rankedUsers.forEach((user) => {
        userSort.push(...rawScores.filter((rs) => rs.user === user))
      })
      return userSort
    },
    'date': () => {
      const byDate = (a: ScoreItem, b: ScoreItem) => b.date - a.date
      return rawScores.sort(byDate)
    },
    'points': () => {
      const byPoints = (a:ScoreItem, b:ScoreItem) => b.score.points - a.score.points
      return rawScores.sort(byPoints)
    },
    'efficiency': () => {
      const byEfficiency = (a:ScoreItem, b:ScoreItem) => b.score.efficiency - a.score.efficiency
      return rawScores.sort(byEfficiency)
    },
    'speed': () => {
      const bySpeed = (a:ScoreItem, b:ScoreItem) => b.score.speed - a.score.speed
      return rawScores.sort(bySpeed)
    },
    'mines': () => {
      const byMines = (a:ScoreItem, b:ScoreItem) => a.game.mines - b.game.mines
      return rawScores.sort(byMines)
    },
    'cells': () => {
      const byCells = (a:ScoreItem, b:ScoreItem) => a.game.cells - b.game.cells
      return rawScores.sort(byCells)
    },
    'moves': () => {
      const byMoves = (a:ScoreItem, b:ScoreItem) => a.play.moves - b.play.moves
      return rawScores.sort(byMoves)
    },
    'duration': () => {
      const byDuration = (a:ScoreItem, b:ScoreItem) => a.play.duration - b.play.duration
      return rawScores.sort(byDuration)
    }
  }

  const sortByKind = function (event: React.UIEvent): void {
    const label = (event.target as HTMLElement).className
    setSortLabel(label)
    setScores(methodsByKind[label]())
    window.scrollTo({top: 0, left: 0})
  }

  const fameContent = (
    <article>
      <h2>{text.nav['Hall of Fame']}</h2>
      <table className={`legend ${sortLabel}`}><tbody><tr>
        <td></td>
        <td><a className="user" onClick={sortByKind}>{text.fame['user']}</a></td>
        <td></td>
        <td></td>
        <td><a className="date" onClick={sortByKind}>{text.fame['date']}</a></td>
      </tr><tr>
        <td><a className="points" onClick={sortByKind}>{text.fame['points']}</a></td>
        <td><a className="efficiency" onClick={sortByKind}>{text.fame['efficiency']}</a></td>
        <td><a className="mines" onClick={sortByKind}>{text.fame['mines']}</a></td>
        <td><a className="moves" onClick={sortByKind}>{text.fame['moves']}</a></td>
        <td><a className="duration" onClick={sortByKind}>{text.fame['duration']}</a></td>
      </tr><tr>
        <td></td>
        <td><a className="speed" onClick={sortByKind}>{text.fame['speed']}</a></td>
        <td><a className="cells" onClick={sortByKind}>{text.fame['cells']}</a></td>
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
    <>
      {fameContent}
      {fameNavigation}
    </>
  )
}

export default HallOfFame
