import './GameCell.css'

const GameCell = (props) => {
  const doneClass = props.done ? 'touched' : 'pristine'
  const cellContent = props.done && props.fill > 0 && props.fill < 9 ? props.fill : ' '
  const hasDetonated = props.done && props.fill > 8
  const detonatedClass = hasDetonated ? 'mijn' : ''

  const touchCellHandler = (event) => {
    props.onTouch({
      type: 'TOUCH',
      row: Number(props.row),
      col: Number(props.col),
    })
  }

  // console.log(`CHANGE row${props.row}col${props.col}`)

  return (
    <button
      type="button"
      className={`${doneClass} ${detonatedClass}`}
      id={`row${props.row}col${props.col}`}
      onClick={touchCellHandler}
    >
      {/* {props.fill} DEV HELPER */}
      {cellContent}
    </button>
  )
}

export default GameCell
