import './GameCell.css'

const GameCell = (props) => {
  const doneClass = props.done ? 'touched' : 'pristine'
  const lockedClass = props.locked ? 'flag' : ''
  const cellContent = props.done && props.fill > 0 && props.fill < 9 ? props.fill : ' '
  const hasDetonated = props.done && props.fill > 8
  const detonatedClass = hasDetonated ? 'mijn' : ''

  const touchCellHandler = (event) => {
    if (props.done) return
    if (!props.flagging && props.locked) return
    props.onTouch({
      type: 'TOUCH',
      row: Number(props.row),
      col: Number(props.col),
      entry: props.flagging
        ? { locked: !props.locked }
        : { done: 'clicked' },
    })
  }

  return (
    <button
      type="button"
      className={`${doneClass} ${lockedClass} ${detonatedClass}`}
      id={`row${props.row}col${props.col}`}
      style={{'--cell-row': props.row + 1, '--cell-col': props.col + 1}}
      onClick={touchCellHandler}
    >
      {/* {props.fill} DEV HELPER */}
      {cellContent}
    </button>
  )
}

export default GameCell
