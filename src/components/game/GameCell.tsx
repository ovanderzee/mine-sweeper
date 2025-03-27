import { LONG_PRESS_THRESHOLD } from '../../common/constants'
import { aspectualInside } from '../../common/functions';
import './GameCell.css'

const GameCell = (props) => {
  const { stage, fill, row, col, locked } = props.cell
  const doneClass = stage ? 'touched' : 'pristine'
  const lockedClass = locked ? 'flag' : ''
  const cellContent = stage && fill > 0 && fill < 9 ? fill : ' '
  const mineClass = stage && fill > 8 ? 'mijn' : ''
  const activatedClass = stage === 'clicked' && fill > 8 ? 'explode' : ''

  let startEvent = null

  /*
    A long press for toggling a flag
    A short press for opening the cell
  */

  const actionHandler = (event, type) => {
    if (stage) return
    if (type === 'MOVE' && locked) return

    let entry = { stage: 'clicked' }
    if (type === 'FLAG') {
      entry = { locked: !locked }
    }

    const cellAction = {
      type,
      payload: {
        cell: props.cell,
        entry
      }
    }

    props.onTouch(cellAction)
  }

  /*
    Save the first part of long-press event for data
  */
  const beginHandler = (event) => {
    startEvent = event
  }

  /*
    CancelEvent: A garbled gesture is trying to cancel interaction
    Do everything required to terminate combined event
  */
  const cancelHandler = () => {
    startEvent = null
  }

  /*
    Moving inside the target is an allowed user quirk
  */
  const moveHandler = (event) => {
    if (!startEvent) return

    const target = startEvent.target
    const box = target.getBoundingClientRect()
    const horizontalInside = aspectualInside(box.x, box.width, event.nativeEvent.pageX)
    const verticalInside = aspectualInside(box.y, box.height, event.nativeEvent.pageY)

    if (!horizontalInside || !verticalInside) {
      startEvent = null
    }
  }

  /*
    Finalise combined event
  */
  const endHandler = (event) => {
    if (!startEvent) return

    const touchDuration = event.timeStamp - startEvent.timeStamp
    cancelHandler()

    if (touchDuration < LONG_PRESS_THRESHOLD) {
      actionHandler(event, 'MOVE')
    } else {
      actionHandler(event, 'FLAG')
    }
  }

  return (
    <button
      type="button"
      className={`${doneClass} ${lockedClass} ${mineClass} ${activatedClass}`}
      id={`row${row}col${col}`}
      style={{'--cell-row': row + 1, '--cell-col': col + 1}}
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
