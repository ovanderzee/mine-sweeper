import { useContext, useRef, useState } from 'react'
import PageContext from '../../store/page-context'
import { TipProps } from './Tips'
import { GameStages, Relative } from '../../common/game.d'
import PieDiagram from '../score/PieDiagram'
import ScorePopover from '../score/ScorePopover'
import './Tips.css'

const MineTracker = (props: TipProps) => {
  const pageCtx = useContext(PageContext)
  const { text } = pageCtx

  const flatBoard = props.game.board!.flat()
  const mineCount = flatBoard.filter(c => c.fill > 8).length
  const flagCount = flatBoard.filter(c => c.locked).length
  const blankCount = flatBoard.filter(c => c.fill === 0).length
  const pointerCount = flatBoard.filter(c => c.fill > 0 && c.fill <9).length
  const cellCount = Math.pow(props.game.board.length, 2)

  const bpmRelative = {
    blanks: blankCount / cellCount,
    pointers: pointerCount / cellCount,
    mines: mineCount / cellCount
  } as Relative

  const scores = [props.game.score]
  const popoverRef = useRef<HTMLElement | null>(null)
  const [popScore, setPopScore] = useState<number>(NaN)
  const onBrowse = (popIndex: number): void => {
    if (scores[popIndex]) {
      setPopScore(popIndex)
    } else {
      popoverRef.current?.hidePopover()
    }
  }

  const mineTracker = (
    <div id="mine-tracker" className="tip" title={text.tips['Todo counter']}>
      <span id="mine" className="icon"></span>
      <span id="diff" className="icon">{mineCount - flagCount}</span>
    </div>
  )
  const scoreTracker = (<>
    <div id="score-tracker" className="tip" title={text.tips['Score analysis']}>
      <PieDiagram rel={bpmRelative} />
      <button type="button" popoverTarget="score-popover" popoverTargetAction="show"
        onClick={() => setPopScore(0)}
        title={'View score details'}
      >&nbsp;</button>
    </div>

    <section id="score-popover"
      popover="hint"
      role="status"
      ref={popoverRef}
      aria-label={text.fame['detail-label']}
    >
      <ScorePopover scores={scores} index={popScore} onBrowse={onBrowse} />
    </section>
  </>)

  return props.game.stage === GameStages.WON ? scoreTracker : mineTracker
}

export default MineTracker
