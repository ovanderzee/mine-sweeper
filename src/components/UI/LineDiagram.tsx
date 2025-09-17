import { ScoreParam, FlatScore } from '../../common/game-types'
import './LineDiagram.css'

interface Coordinate {
  x: number,
  y: number
}

interface LineDiagramProps {
  data: FlatScore[],
  xParam: ScoreParam,
  yParam: ScoreParam,
}

const LineDiagram = (props: LineDiagramProps) => {
  const coordinates: Coordinate[] = props.data.map((flat: FlatScore) => {
    return { x: flat[props.xParam], y: flat[props.yParam] }
  })

  const max: Coordinate = {
    x: Math.max(...coordinates.map((s: Coordinate)  => s.x)),
    y: Math.max(...coordinates.map((s: Coordinate)  => s.y))
  }

//   const titleHeight = 20
  const textSpace = { x: 100, y: 100 }

  return (
    <svg
      className="line-diagram"
      width={max.x}
      height={max.y}
      viewBox={`${textSpace.x * -1} 0 ${max.x + textSpace.x} ${max.y + textSpace.y}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {coordinates.map((d, i) =>
          <circle cx={d.x} cy={(max.y - d.y)} r="3" key={`lnd_circle_${i}`} />
        )}
      </g>

      <line x1="0" y1={max.y} x2={max.x} y2={max.y} strokeWidth="3" />
      <text x="0" y={max.y} dy={textSpace.x * .9} style={{fontSize: '200%'}}>{props.xParam} &rarr;</text>

      <line x1="0" y1="0" x2="0" y2={max.y} strokeWidth="3" />
      <text x="0" y="0" dy={textSpace.y * .9} width={max.y}
        style={{fontSize: '200%'}}
        transform="rotate(90)"
      >&larr; {props.yParam}</text>
    </svg>
  )
}


export default LineDiagram
