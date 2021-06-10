import './GameCell.css'

const GameCell = (props) => {
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
      className={props.stage}
      id={`row${props.row}col${props.col}`}
      onClick={touchCellHandler}
    >
      {/* {props.fill} DEV HELPER */}
      {props.content}
    </button>
  )
}

export default GameCell
