import { useContext, useRef, useState } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import EraseScores from '../nav/EraseScores'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { ShieldByRank } from '../UI/Shield'
import { PlayMode } from '../../common/app.d'
import { ScoreItem, ScoreParam } from '../../common/game.d'
import storage from '../../common/storage'
import { represent } from '../../common/scoring'
import ScorePopover from './ScorePopover'
import VisualiseProps from './VisualiseProps'
import '../meta/Meta.css'
import './HallOfFame.css'

const HallOfFame = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const rootScores = storage.scores
  const latest = [...rootScores].sort((a:ScoreItem, b:ScoreItem) => b.date - a.date)[0]

  const [scores, setScores] = useState(rootScores)
  const [sortLabel, setSortLabel] = useState<ScoreParam>('rank')
  const [valueLabel, setValueLabel] = useState<ScoreParam>('points')

  const eraseScores = () => {
    setScores([])
  }

  const popoverRef = useRef<HTMLElement | null>(null)
  const [popScore, setPopScore] = useState<number>(NaN)

  const onDeletion = (deletable: ScoreItem): void => {
    const removeIndex = scores.findIndex(s => s.code === deletable.code && s.date === deletable.date)
    if (removeIndex < 0) {
      console.error('Score to delete not found')
      return
    }
    const rankToBeRemoved = scores[removeIndex].rank
    const modifiedScores = scores.toSpliced(removeIndex, 1)
    storage.scores = modifiedScores
    setScores(modifiedScores
      .map(s => {if (s.rank > rankToBeRemoved) s.rank--; return s})
    )

    if (modifiedScores.length) {
      if (removeIndex === modifiedScores.length) {
        setPopScore(removeIndex - 1);
      }
    } else {
      popoverRef.current?.hidePopover()
    }
  }

  const onBrowse = (popIndex: number): void => {
    if (scores[popIndex]) {
      setPopScore(popIndex)
    } else {
      popoverRef.current?.hidePopover()
    }
  }

  const fameContent = (
    <article
      role="main"
      aria-labelledby="page-heading"
    >
      <h1 className="h2" id="page-heading">{text.nav['Hall of Fame']}</h1>

      <VisualiseProps
        sortLabel={sortLabel} setSortLabel={setSortLabel}
        rootScores={rootScores}
        scores={scores} setScores={setScores}
        valueLabel={valueLabel} setValueLabel={setValueLabel}
        onBrowse={onBrowse}
      />

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
            className={`${log.rank <= 10 ? 'super' : ''}`}
            aria-label={`${log.date === latest.date ? 'latest' : ''}`}
            key={`${log.date}_${log.score.points}`}
            onClick={() => setPopScore(index)}
            title={text.fame['Number %n in %s sort'].replace('%n', String(index+1)).replace('%s', text.VAR[sortLabel])}
          >
            <header>
              <h2 className="rank">
                {log.rank <= 10 ? <ShieldByRank rank={log.rank} /> : log.rank}
              </h2>
              <h3 className="user">{log.user}</h3>
              <h4 className="date" data-date={log.date}>
                {(new Date(log.date)).toLocaleDateString()}<br/>
                {(new Date(log.date)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </h4>
            </header>
            <article>
              <div className="character">
                <h4 className="points">{log.score.points}</h4>
                {log.game.mode != PlayMode.NORMAL &&
                  <h5 className={`${log.game.mode}-mode`}>{log.game.mode}</h5>
                }
              </div>
              <section className="group game">
                <div className="unit blanks">
                  <span>{text.VAR['blanks']}</span>
                  <span>{represent(log.relative.blanks * 100, 3)}%</span>
                </div>
                <div className="unit pointers">
                  <span>{text.VAR['pointers']}</span>
                  <span>{represent(log.relative.pointers * 100, 3)}%</span>
                </div>
                <div className="unit mines">
                  <span>{text.VAR['mines']}</span>
                  <span>{represent(log.relative.mines * 100, 3)}%</span>
                </div>
                <div className="unit cells">
                  <span>{text.VAR['cells']}</span>
                  <span>{log.game.cells}</span>
                </div>
              </section>
              <section className="group play">
                <div className="unit level">
                  <span>{text.VAR['level']}</span>
                  <span>{log.game.level}</span>
                </div>
                <div className="unit least">
                  <span>{text.VAR['least']}</span>
                  <span>{log.game.effort.least}</span>
                </div>
                <div className="unit moves">
                  <span>{text.VAR['moves']}</span>
                  <span>{log.play.moves}</span>
                </div>
                <div className="unit duration">
                  <span>{text.VAR['duration']}</span>
                  <span>{represent(log.play.duration, 3)}s</span>
                </div>
              </section>
              <section className="group score">
                <div className="unit efficiency">
                  <span>{text.VAR['efficiency']}</span>
                  <span>{represent(log.score.efficiency, 2)}</span>
                </div>
                <div className="unit speed">
                  <span>{text.VAR['speed']}</span>
                  <span>{represent(log.score.speed, 2)}</span>
                </div>
              </section>
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
      <section id="score-popover"
        popover="hint"
        role="status"
        ref={popoverRef}
        aria-label={text.fame['detail-label']}
      >
        <ScorePopover scores={scores} index={popScore}
          onDeletion={onDeletion} onBrowse={onBrowse}
        />
      </section>
    </>
  )
}

export default HallOfFame
