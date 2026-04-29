import React, { useContext, useState } from 'react';
import PageContext from '../../store/page-context'
import { LONG_PRESS_THRESHOLD } from '../../common/constants'
import { PlayMode } from '../../common/app.d'
import { CellState, CellStateStage, CellStateEntry, GameAction, GameActionType } from '../../common/game.d';
import './GameCell.css'

interface GameCellProps {
  cell: CellState,
  onTouch: (action: GameAction) => void
}

const GameCell = (props: GameCellProps) => {
  const pageCtx = useContext(PageContext)
  const { PLAY_MODE } = pageCtx.config
  const text = pageCtx.text

  const { stage, fill, row, col, locked, burst } = props.cell
  const doneClass = stage ? 'touched' : 'pristine'
  const lockedClass = locked ? 'flag' : ''
  const cellContent = stage && fill > 0 && fill < 9 ? fill : ' '
  const mineClass = stage && fill > 8 ? 'mijn' : ''
  const isProcessedMine = stage === CellStateStage.TESTED && fill > 8
  let activatedClass = ''
  if (isProcessedMine) activatedClass = burst ? 'explode' : 'exploded'
  const stageLabel = text.cell[doneClass]

  const [startTime, setStartTime] = useState(0)

  const id = `row${row}col${col}`
  const focusHandler = () => pageCtx.updSession({ ACTIVE_CELL_ID: id })

  /*
    A long press for toggling a flag
    A short press for opening the cell
  */

  const actionHandler = (type: GameActionType) => {
    if (stage) return
    if (type === GameActionType.MOVE && locked) return
    if (type === GameActionType.FLAG && PLAY_MODE === PlayMode.TOUGH) return

    const entry: CellStateEntry = {}
    if (type === GameActionType.FLAG) {
      entry.locked = !locked
    } else { // GameActionType.MOVE
      entry.stage = CellStateStage.TESTED
      if (fill > 8) entry.burst = true
    }

    const payload = JSON.stringify({
      cell: props.cell as CellState,
      entry
    })
    const gameAction: GameAction = {
      type,
      payload
    }

    props.onTouch(gameAction)
  }

  /*
    Save initial time
  */
  const beginHandler = () => {
    setStartTime(Date.now())
  }

  /*
    CancelEvent: A garbled gesture is trying to cancel interaction, terminate combined events
  */
  const cancelHandler = () => {
    setStartTime(0)
  }

  /*
    Finalise combined event
  */
  const endHandler = () => {
    if (!startTime) return

    const touchDuration = Date.now() - startTime
    cancelHandler()

    if (touchDuration < LONG_PRESS_THRESHOLD) {
      actionHandler(GameActionType.MOVE)
    } else {
      actionHandler(GameActionType.FLAG)
    }
  }

  const cellById = (x: number, y: number) => {
    const id = `row${row + y}col${col + x}`
    const elm = document.getElementById(id)
    return elm
  }

  /*
    Keyboard input
  */
  const keystrokeHandler = (event: React.KeyboardEvent) => {
    let goToCell: HTMLElement | null = null

    switch(event.key) {
      case 'Enter':
        event.stopPropagation()
        actionHandler(GameActionType.MOVE)
        break
      case ' ':
        event.stopPropagation()
        actionHandler(GameActionType.FLAG)
        break
      case 'ArrowUp':
        goToCell = cellById(0, -1)
        break
      case 'ArrowRight':
        goToCell = cellById(1, 0)
        break
      case 'ArrowDown':
        goToCell = cellById(0, 1)
        break
      case 'ArrowLeft':
        goToCell = cellById(-1, 0)
        break
    }

    if (goToCell) {
      event.preventDefault()
      event.stopPropagation()
      goToCell.focus()
    }
  }

  return (
    <button
      type="button"
      role="gridcell"
      aria-label={`${text.cell.row} ${row+1} ${text.cell.col} ${col+1}, ${stageLabel}`}
      className={`${doneClass} ${lockedClass} ${mineClass} ${activatedClass}`}
      id={id}
      onFocus={focusHandler}
      onKeyDown={keystrokeHandler}
      onPointerDown={beginHandler}
      onPointerCancel={cancelHandler}
      onPointerLeave={cancelHandler}
      onPointerOut={cancelHandler}
      onPointerUp={endHandler}
    >
      {cellContent}
      {burst &&
        <span
          className="burst"
          style={{willChange: 'opacity, scale'}}
        ></span>}
    </button>
  )
}

export default GameCell
