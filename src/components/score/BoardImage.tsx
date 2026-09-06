import { CellState } from '../../common/game.d'
import './BoardImage.css'

interface BoardProps {
  board: CellState[][]
}

const BoardImage = (props: BoardProps) => {

  const getClassName = (fill: number) => {
    if (fill > 8) {
      return 'mine'
    } else {
      return 'safe'
    }
  }

  return (
    <svg
      role="document"
      className="board-image"
      viewBox={`0 0 ${props.board.length} ${props.board.length}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.board.map((row, index) => (
        <g className="row" key={`row_${index}`}>
          {row.map(cell => (
            <rect key={`cell_${cell.row}_${cell.col}`}
              x={cell.col} y={cell.row}
              width="1" height="1"
              className={getClassName(cell.fill)}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

export default BoardImage
