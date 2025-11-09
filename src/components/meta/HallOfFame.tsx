import React, { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import EraseScores from '../nav/EraseScores'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { ShieldByRank } from '../UI/Shield'
import Diagram from '../UI/Diagram'
import { ScoreItem, ScoreParam } from '../../common/game.d'
import storage from '../../common/storage'
import { precise } from '../game/scoring'
import { SHOW_SORT_THRESHOLD, SHOW_DIAGRAM_THRESHOLD } from '../../common/constants'
import ScorePopover from '../UI/ScorePopover'
import './Meta.css'
import './HallOfFame.css'

const HallOfFame = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const rawScores = storage.scores.map(s => {
    return { ...s, level: +s.code.charAt(2) } as ScoreItem
  })
  const latest = [...rawScores].sort((a:ScoreItem, b:ScoreItem) => b.date - a.date)[0]

  const [scores, setScores] = useState(rawScores)
  const [sortLabel, setSortLabel] = useState<ScoreParam>('rank')

  const eraseScores = () => {
    setScores([])
  }

  const methodsByKind: Record<string, () => ScoreItem[]> = {
    'rank': () => {
      const byRank = (a:ScoreItem, b:ScoreItem) => a.rank - b.rank
      return rawScores.sort(byRank)
    },
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
  /*
    'points': () => {
      const byPoints = (a:ScoreItem, b:ScoreItem) => b.score.points - a.score.points
      return rawScores.sort(byPoints)
    },
  */
    'efficiency': () => {
      const byEfficiency = (a:ScoreItem, b:ScoreItem) => b.score.efficiency - a.score.efficiency
      return rawScores.sort(byEfficiency)
    },
    'speed': () => {
      const bySpeed = (a:ScoreItem, b:ScoreItem) => b.score.speed - a.score.speed
      return rawScores.sort(bySpeed)
    },
    'level': () => {
      const byLevel = (a: ScoreItem, b: ScoreItem) => (b?.level || 0) - (a?.level || 0)
      return rawScores.sort(byLevel)
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
    setSortLabel(label as ScoreParam)
    setScores(methodsByKind[label]())
    window.scrollTo({top: 0, left: 0})
  }

  const scoreSorting = (
    <table className={`legend ${sortLabel}`}><tbody><tr>
      <td></td>
      <td><button type="button" className="user" onClick={sortByKind}>{text.fame['user']}</button></td>
      <td><button type="button" className="level" onClick={sortByKind}>{text.fame['level']}</button></td>
      <td></td>
      <td><button type="button" className="date" onClick={sortByKind}>{text.fame['date']}</button></td>
    </tr><tr>
      <td><button type="button" className="rank" onClick={sortByKind}>{text.fame['rank']}</button></td>
      <td><button type="button" className="efficiency" onClick={sortByKind}>{text.fame['efficiency']}</button></td>
      <td><button type="button" className="mines" onClick={sortByKind}>{text.fame['mines']}</button></td>
      <td><button type="button" className="moves" onClick={sortByKind}>{text.fame['moves']}</button></td>
      <td><button type="button" className="duration" onClick={sortByKind}>{text.fame['duration']}</button></td>
    </tr><tr>
      <td></td>
      <td><button type="button" className="speed" onClick={sortByKind}>{text.fame['speed']}</button></td>
      <td><button type="button" className="cells" onClick={sortByKind}>{text.fame['cells']}</button></td>
      <td></td>
      <td></td>
    </tr></tbody></table>
  )

  const scoreDiagram = <Diagram scores={scores} xParam={sortLabel} yParam="points" />

  const [popScore, setPopScore] = useState<ScoreItem | null>(null)

  const fameContent = (
    <article
      role="main"
      aria-label={text.nav['Hall of Fame']}
    >
      <h1 className="h2">{text.nav['Hall of Fame']}</h1>

      {scores.length > SHOW_SORT_THRESHOLD && scoreSorting}
      {scores.length > SHOW_DIAGRAM_THRESHOLD && scoreDiagram}

      <ol>
        {!scores.length && (
          <li>
            <header>
              <h4>{text.fame['Nothing Yet']}</h4>
            </header>
          </li>
        )}
        {scores.map((log: ScoreItem, index) => (
          <button type="button" popoverTarget="score-popover" popoverTargetAction="show"
            className={`${log.rank <= 10 ? 'super' : ''} ${log.date === latest.date ? 'latest' : ''}`}
            key={`${log.rank}_${log.score.points}`}
            onClick={() => setPopScore(log)}
          >
            <header>
              <h2 className="rank" title={'#' + index}>
                {log.rank <= 10 ? <ShieldByRank rank={log.rank} /> : log.rank}
              </h2>
              <h3 className="user">{log.user}</h3>
              <h4 className="date" data-date={log.date}>
                {(new Date(log.date)).toLocaleDateString()}<br/>
                {(new Date(log.date)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </h4>
            </header>
            <article>
              <div className="points">{log.score.points}</div>
              <div className="unit">
                <small>{text.fame['level']}</small>
                <span className="level">{log.level}</span>
              </div>
              <div className="unit">
                <small>{text.fame['mines']}</small>
                <span className="mines">{log.game.mines}</span>
              </div>
              <div className="unit">
                <small>{text.fame['cells']}</small>
                <span className="cells">{log.game.cells}</span>
              </div>
              <div className="unit">
                <small>{text.fame['moves']}</small>
                <span className="moves">{log.play.moves}</span>
              </div>
              <div className="unit">
                <small>{text.fame['duration']}</small>
                <span className="duration">{precise(log.play.duration, 3)}s</span>
              </div>
            </article>
          </button>
        ))}
      </ol>
    </article>
  )

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
      <section id="score-popover" popover="auto">
        <ScorePopover score={popScore} />
      </section>
    </>
  )
}

export default HallOfFame
