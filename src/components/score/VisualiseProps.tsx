import React, { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Diagram from './Diagram'
import { ScoreItem, ScoreParam, MarkScoreData } from '../../common/game.d'
import { SHOW_SORT_THRESHOLD, SHOW_DIAGRAM_THRESHOLD, SHOW_MARKING_THRESHOLD } from '../../common/constants'
import { preventReloadByEnter } from '../../common/functions'
import SortScores from './SortScores'
import { parameters } from './scoreParams'
import '../meta/Meta.css'
import './HallOfFame.css'

interface VisualisePropsProps {
  sortLabel: ScoreParam
  setSortLabel: (label: ScoreParam) => void
  rootScores: ScoreItem[]
  scores: ScoreItem[]
  setScores: (scores: ScoreItem[]) => void
  valueLabel: ScoreParam
  setValueLabel: (label: ScoreParam) => void
  onBrowse: (popIndex: number) => void
}

const VisualiseProps = (props: VisualisePropsProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const {sortLabel, setSortLabel, rootScores, scores, setScores, valueLabel, setValueLabel, onBrowse} = props

  const mathParameters = parameters.filter(p => !(p === 'user' || p === 'date'))
  const operators = ['<','≤','=','≥','>']
  const initialMarkData = {param: sortLabel, operate: operators[0], quant: 0}
  const [markData, setMarkData] = useState<MarkScoreData>(initialMarkData)

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
        <SortScores sortLabel={sortLabel} setSortLabel={setSortLabel}
          rootScores={rootScores} setScores={setScores} />

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

  const scoreDiagram = <Diagram scores={scores} xParam={sortLabel} yParam={valueLabel} onBrowse={onBrowse} markData={markData} />

  return (
    <>
      {scores.length > SHOW_SORT_THRESHOLD && scoreSorting}
      {scores.length > SHOW_DIAGRAM_THRESHOLD && scoreDiagram}
    </>
  )
}

export default VisualiseProps
