import React, { useContext, useRef, useState } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import EraseScores from '../nav/EraseScores'
import Help from '../nav/Help'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { ShieldByRank } from '../UI/Shield'
import Diagram from '../UI/Diagram'
import { PlayMode } from '../../common/app.d'
import { ScoreItem, ScoreParam, MarkScoreData } from '../../common/game.d'
import storage from '../../common/storage'
import { represent } from '../../common/scoring'
import { SHOW_SORT_THRESHOLD, SHOW_DIAGRAM_THRESHOLD, SHOW_MARKING_THRESHOLD } from '../../common/constants'
import { preventReloadByEnter } from '../../common/functions'
import ScorePopover from '../UI/ScorePopover'
import './Meta.css'
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

  const parameters = [
    'rank', 'user', 'date', 'efficiency', 'speed', 'points',
    'blanks', 'pointers', 'mines', 'cells', 'level', 'least',
    'moves', 'duration', 'flags', 'remaining',
    'blank_pointer_ratio', 'blank_mine_ratio', 'pointer_mine_ratio',
    'pointer_mark', 'pointer_avg', 'mine_mark', 'mine_avg'
  ] as ScoreParam[]
  const mathParameters = parameters.filter(p => !(p === 'user' || p === 'date'))

  const operators = ['<','≤','=','≥','>']
  const initialMarkData = {param: sortLabel, operate: operators[0], quant: 0}
  const [markData, setMarkData] = useState<MarkScoreData>(initialMarkData)

  // @ts-expect-error // error TS2739: Type ... is missing the following properties from type 'Record<ScoreParam, () => ScoreItem[]>': play, game, effort, code, score
  const methodsByKind: Record<ScoreParam, () => ScoreItem[]> = {
    'rank': () => {
      const byRank = (a:ScoreItem, b:ScoreItem) => a.rank - b.rank
      return rootScores.sort(byRank)
    },
    'user': () => {
      const byRank = (a: ScoreItem, b: ScoreItem) => a.rank - b.rank
      rootScores.sort(byRank)
      const rankedUsers = [...new Set(rootScores.map((rs) => rs.user))]
      const userSort: ScoreItem[] = []
      rankedUsers.forEach((user) => {
        userSort.push(...rootScores.filter((rs) => rs.user === user))
      })
      return userSort
    },
    'date': () => {
      const byDate = (a: ScoreItem, b: ScoreItem) => b.date - a.date
      return rootScores.sort(byDate)
    },
    'points': () => {
      const byPoints = (a:ScoreItem, b:ScoreItem) => b.score.points - a.score.points
      return rootScores.sort(byPoints)
    },
    'efficiency': () => {
      const byEfficiency = (a:ScoreItem, b:ScoreItem) => b.score.efficiency - a.score.efficiency
      return rootScores.sort(byEfficiency)
    },
    'speed': () => {
      const bySpeed = (a:ScoreItem, b:ScoreItem) => b.score.speed - a.score.speed
      return rootScores.sort(bySpeed)
    },
    'level': () => {
      const byLevel = (a: ScoreItem, b: ScoreItem) => (b.game?.level || 0) - (a.game?.level || 0)
      return rootScores.sort(byLevel)
    },
    'blanks': () => {
      const byBlanks = (a:ScoreItem, b:ScoreItem) => a.relative.blanks - b.relative.blanks
      return rootScores.sort(byBlanks)
    },
    'pointers': () => {
      const byPointers = (a:ScoreItem, b:ScoreItem) => a.relative.pointers - b.relative.pointers
      return rootScores.sort(byPointers)
    },
    'mines': () => {
      const byMines = (a:ScoreItem, b:ScoreItem) => a.relative.mines - b.relative.mines
      return rootScores.sort(byMines)
    },
    'cells': () => {
      const byCells = (a:ScoreItem, b:ScoreItem) => a.game.cells - b.game.cells
      return rootScores.sort(byCells)
    },
    'flags': () => {
      const byFlags = (a:ScoreItem, b:ScoreItem) => (b.play?.flags || 0) - (a.play?.flags || 0)
      return rootScores.sort(byFlags)
    },
    'moves': () => {
      const byMoves = (a:ScoreItem, b:ScoreItem) => a.play.moves - b.play.moves
      return rootScores.sort(byMoves)
    },
    'duration': () => {
      const byDuration = (a:ScoreItem, b:ScoreItem) => a.play.duration - b.play.duration
      return rootScores.sort(byDuration)
    },
    'least': () => {
      const byLeast = (a:ScoreItem, b:ScoreItem) => b.game.effort.least - a.game.effort.least
      return rootScores.sort(byLeast)
    },
    'blank_pointer_ratio': () => {
      const byRatio = (a:ScoreItem, b:ScoreItem) => b.signature.blank_pointer_ratio - a.signature.blank_pointer_ratio
      return rootScores.sort(byRatio)
    },
    'blank_mine_ratio': () => {
      const byRatio = (a:ScoreItem, b:ScoreItem) => b.signature.blank_mine_ratio - a.signature.blank_mine_ratio
      return rootScores.sort(byRatio)
    },
    'pointer_mine_ratio': () => {
      const byRatio = (a:ScoreItem, b:ScoreItem) => b.signature.pointer_mine_ratio - a.signature.pointer_mine_ratio
      return rootScores.sort(byRatio)
    },
    'pointer_mark': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.pointer_mark - a.signature.pointer_mark
      return rootScores.sort(byDifficulty)
    },
    'pointer_avg': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.pointer_avg - a.signature.pointer_avg
      return rootScores.sort(byDifficulty)
    },
    'mine_mark': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.mine_mark - a.signature.mine_mark
      console.log('mine-mark sorting function')
      return rootScores.sort(byDifficulty)
    },
    'mine_avg': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.mine_avg - a.signature.mine_avg
      return rootScores.sort(byDifficulty)
    },
  }

  const sortByKind = function (event: React.ChangeEvent): void {
    const ctrl = event.target as HTMLSelectElement
    setSortLabel(ctrl.value as ScoreParam)
    setScores(methodsByKind[ctrl.value as ScoreParam]())
    window.scrollTo({top: 0, left: 0})
  }

  const changeValue = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLSelectElement
    setValueLabel(ctrl.value as ScoreParam)
  }

  const changeMarkParameter = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLSelectElement
    const param = ctrl.value as ScoreParam
    setMarkData({...markData, param})
  }

  const changeMarkOperator = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLSelectElement
    const operate = ctrl.value as string
    setMarkData({...markData, operate})
  }

  const changeMarkQuantifier = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLInputElement
    let quant = parseFloat(ctrl.value)
    const nativeEvent = event.nativeEvent as InputEvent
    if (nativeEvent.data === ',') ctrl.value = ctrl.value.replace(',','.')
    if (!quant) quant = 0
    if (!ctrl.value.endsWith('.')) ctrl.value = quant.toString()
    setMarkData({...markData, quant})
  }

  const scoreSorting = (
    <form className={`legend ${sortLabel}`}
      onKeyDown={(event) => preventReloadByEnter(event)}
    >
      <div className="controls">
        <label htmlFor="x-axis">{text.fame['sort']}</label>
        <select id="x-axis" value={sortLabel} onChange={sortByKind}>
          {parameters
            .map((param) => <option key={param} value={param}>{text.VAR[param]}</option>
          )}
        </select>

        <label htmlFor="y-axis">{text.fame['versus']}</label>
        <select id="y-axis" value={valueLabel} onChange={changeValue}>
          {mathParameters
            .map((param) => <option key={param} value={param}>{text.VAR[param]}</option>
          )}
        </select>

      {scores.length > SHOW_MARKING_THRESHOLD && (<>
        <label className="label">{text.fame['mark']}</label>
        <div className="mark">
          <select id="mark-param" value={markData.param} onChange={changeMarkParameter}
            title={text.fame['mark-parameter']}>
            {mathParameters
              .map((param) => <option key={param} value={param}>{text.VAR[param]}</option>
            )}
          </select>
          <select id="mark-operator" value={markData.operate} onChange={changeMarkOperator}
            title={text.fame['mark-relation']}>
            {operators
              .map((operate) => <option key={operate} value={operate}>{operate}</option>
            )}
          </select>
        </div>
        <input id="mark-quant" className="mark" defaultValue="0" onChange={changeMarkQuantifier}
          title={text.fame['mark-value']} />
      </>)}
      </div>
    </form>
  )

  const popoverRef = useRef<HTMLElement | null>(null)
  const [popScore, setPopScore] = useState<number>(NaN)

  const onDeletion = (deletable: ScoreItem): void => {
    const removeIndex = rootScores.findIndex(s => s.code === deletable.code && s.date === deletable.date)
    if (removeIndex < 0) {
      console.error('Score to delete not found')
      return
    }
    rootScores.splice(removeIndex, 1)
    storage.scores = rootScores
    setScores(storage.scores)

    if (rootScores.length) {
      setScores(methodsByKind[sortLabel]())
      if (removeIndex === rootScores.length) {
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

  const scoreDiagram = <Diagram scores={scores} xParam={sortLabel} yParam={valueLabel} onBrowse={onBrowse} markData={markData} />

  const fameContent = (
    <article
      role="main"
      aria-labelledby="page-heading"
    >
      <h1 className="h2" id="page-heading">{text.nav['Hall of Fame']}</h1>

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
