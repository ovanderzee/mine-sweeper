import './GameCell.css'

const GameCell = (props) => {
  const doneClass = props.done ? 'touched' : 'pristine'
  const lockedClass = props.locked ? 'flag' : ''
  const cellContent = props.done && props.fill > 0 && props.fill < 9 ? props.fill : ' '
  const hasDetonated = props.done && props.fill > 8
  const detonatedClass = hasDetonated ? 'mijn' : ''
  let clickCount = 0
  let clickTimer = 0

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

  const timeHandler = (event) => {
    clickCount++;
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        clearTimeout(clickTimer)
        clickCount = 0
        actionHandler(event, 'MOVE')
      }, 400)
    } else if (clickCount > 1) {
      clearTimeout(clickTimer)
      actionHandler(event, 'FLAG')
    }
  }

  return (
    <button
      type="button"
      className={`${doneClass} ${lockedClass} ${detonatedClass}`}
      id={`row${props.row}col${props.col}`}
      style={{'--cell-row': props.row + 1, '--cell-col': props.col + 1}}
      onClick={timeHandler}
      /* title={JSON.stringify(props)} */
    >
      {cellContent}
    </button>
  )
}

export default GameCell
