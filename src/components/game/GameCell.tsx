import React, { useContext } from 'react';
import PageContext from '../../store/page-context'
import { LONG_PRESS_THRESHOLD } from '../../common/constants'
import { CellState, CellStateStage, CellStateEntry, GameAction, GameActionType } from '../../common/game-types';
import { aspectualInside } from '../../common/functions';
import './GameCell.css'

interface GameCellProps {
  cell: CellState,
  onTouch: (action: GameAction) => void
}

const GameCell = (props: GameCellProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const { stage, fill, row, col, locked } = props.cell
  const doneClass = stage ? 'touched' : 'pristine'
  const lockedClass = locked ? 'flag' : ''
  const cellContent = stage && fill > 0 && fill < 9 ? fill : ' '
  const mineClass = stage && fill > 8 ? 'mijn' : ''
  const activatedClass = stage === CellStateStage.TESTED && fill > 8 ? 'explode' : ''
  const stageLabel = text.cell[doneClass]

  let startEvent: React.UIEvent

  /*
    A long press for toggling a flag
    A short press for opening the cell
  */

  const actionHandler = (type: GameActionType) => {
    if (stage) return
    if (type === GameActionType.MOVE && locked) return

    let entry: CellStateEntry = { stage: CellStateStage.TESTED }
    if (type === GameActionType.FLAG) {
      entry = { locked: !locked }
    }

    const payload = JSON.stringify({
      cell: props.cell as CellState,
      entry
    })
    const GameAction: GameAction = {
      type,
      payload
    }

    props.onTouch(GameAction)
  }

  /*
    Save the first part of long-press event for data
  */
  const beginHandler = (event: React.UIEvent) => {
    startEvent = event
  }

  /*
    CancelEvent: A garbled gesture is trying to cancel interaction
    Do everything required to terminate combined event
  */
  const cancelHandler = () => {
    startEvent = null as unknown as React.UIEvent
  }

  /*
    Moving inside the target is an allowed user quirk
  */
  const moveHandler = (event: React.PointerEvent) => {
    if (!startEvent) return

    const target = startEvent.target as Element
    const box = target.getBoundingClientRect()
    const horizontalInside = aspectualInside(box.x, box.width, event.nativeEvent.pageX)
    const verticalInside = aspectualInside(box.y, box.height, event.nativeEvent.pageY)

    if (!horizontalInside || !verticalInside) {
      startEvent = null as unknown as React.UIEvent
    }
  }

  /*
    Finalise combined event
  */
  const endHandler = (event: React.PointerEvent) => {
    if (!startEvent) return

    const touchDuration = event.timeStamp - startEvent.timeStamp
    cancelHandler()

    if (touchDuration < LONG_PRESS_THRESHOLD) {
      actionHandler(GameActionType.MOVE)
    } else {
      actionHandler(GameActionType.FLAG)
    }
  }

  const id = (x: number, y: number) => `row${row + y}col${col + x}`

  /*
    Keyboard input
  */
  const keystrokeHandler = (event: React.KeyboardEvent) => {
    event.stopPropagation()
    let goToCell!: HTMLButtonElement

    switch(event.key) {
      case 'Enter':
        actionHandler(GameActionType.MOVE)
        break
      case ' ':
        actionHandler(GameActionType.FLAG)
        break
      case 'ArrowUp':
        goToCell = document.getElementById(id(0, -1)) as HTMLButtonElement
        break
      case 'ArrowRight':
        goToCell = document.getElementById(id(1, 0)) as HTMLButtonElement
        break
      case 'ArrowDown':
        goToCell = document.getElementById(id(0, 1)) as HTMLButtonElement
        break
      case 'ArrowLeft':
        goToCell = document.getElementById(id(-1, 0)) as HTMLButtonElement
        break
    }

    if (goToCell) goToCell.focus()
  }

  return (
    <button
      type="button"
      aria-label={`${text.cell.row} ${row+1} ${text.cell.col} ${col+1}, ${stageLabel}`}
      className={`${doneClass} ${lockedClass} ${mineClass} ${activatedClass}`}
      id={id(0, 0)}
      style={{'--cell-row': row + 1, '--cell-col': col + 1} as React.CSSProperties}
      onKeyDown={keystrokeHandler}
      onPointerDown={beginHandler}
      onPointerMove={moveHandler}
      onPointerCancel={cancelHandler}
      onPointerUp={endHandler}
    >
      {cellContent}
      {mineClass && <span className="burst"></span>}
    </button>
  )
}

export default GameCell
