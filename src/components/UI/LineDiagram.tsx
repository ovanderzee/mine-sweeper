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

  const calcBoundingAxis = (highest: number) => {
    const exponent = Math.floor(Math.log10(highest)) - 1
    const dataScale = Math.pow(10, exponent)
    return Math.ceil(highest / dataScale) * dataScale
  }

  const textSpace = { x: 100, y: 100 }
  const graphSize = { x: 600, y: 400 }
  const axisMax = { x: calcBoundingAxis(max.x), y: calcBoundingAxis(max.y) }
  const dataScale = { x: graphSize.x / axisMax.x, y: graphSize.y / axisMax.y }

  return (
    <svg
      className="line-diagram"
      width={graphSize.x + textSpace.x}
      height={graphSize.y + textSpace.y}
      viewBox={`${textSpace.x * -1} 0 ${graphSize.x + textSpace.x} ${graphSize.y + textSpace.y}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {coordinates.map((d, i) =>
          <circle cx={d.x * dataScale.x} cy={(axisMax.y - d.y) * dataScale.y} r="3"
            key={`lnd_circle_${i}`} aria-labelledby={`lnd_title_${i}`}
          >
            <title id={`lnd_title_${i}`} key={`lnd_title_${i}`}>{`title ${props.xParam}: ${d.x}, ${props.yParam}: ${d.y}`}</title>
          </circle>
        )}
      </g>

      <line x1="0" y1={graphSize.y} x2={graphSize.x} y2={graphSize.y} strokeWidth="3" />
      <text x="0" y={graphSize.y} dy={textSpace.x * .9}>{props.xParam} &rarr;</text>

      <line x1="0" y1="0" x2="0" y2={graphSize.y} strokeWidth="3" />
      <text x="0" y="0" dy={textSpace.y * .9} width={graphSize.y}
        transform="rotate(90)"
      >&larr; {props.yParam}</text>
    </svg>
  )
}

export default LineDiagram
