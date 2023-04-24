import { LONG_PRESS_THRESHOLD } from '../../common/constants'
import { aspectualInside } from '../../common/functions';
import './GameCell.css'

const GameCell = (props) => {
  const doneClass = props.done ? 'touched' : 'pristine'
  const lockedClass = props.locked ? 'flag' : ''
  const cellContent = props.done && props.fill > 0 && props.fill < 9 ? props.fill : ' '
  const hasDetonated = props.done && props.fill > 8
  const detonatedClass = hasDetonated ? 'mijn' : ''

  /*
    A long press for toggling a flag
    A short press for opening the cell
  */

  let startEvent = null

  const actionHandler = (event, type) => {
    if (props.done) return
    if (type === 'MOVE' && props.locked) return

    let entry = { done: 'clicked' }
    if (type === 'FLAG') {
      entry = { locked: !props.locked }
    }

    props.onTouch({
      type: type,
      row: Number(props.row),
      col: Number(props.col),
      entry: entry
    })
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
  const cancelHandler = (event) => {
    startEvent = null
  }

  /*
    Moving inside the target is an allowed user quirk
  */
  const moveHandler = (event) => {
    if (!startEvent) return

    const box = startEvent.target.getBoundingClientRect()
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
    cancelHandler(event)

    if (touchDuration < LONG_PRESS_THRESHOLD) {
      actionHandler(event, 'MOVE')
    } else {
      actionHandler(event, 'FLAG')
    }
  }

  return (
    <button
      type="button"
      className={`${doneClass} ${lockedClass} ${detonatedClass}`}
      id={`row${props.row}col${props.col}`}
      style={{'--cell-row': props.row + 1, '--cell-col': props.col + 1}}
      onPointerDown={beginHandler}
      onPointerMove={moveHandler}
      onPointerCancel={cancelHandler}
      onPointerUp={endHandler}
    >
      {cellContent}
    </button>
  )
}

export default GameCell
