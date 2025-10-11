import { useContext } from 'react'
import PageContext from '../../store/page-context'
import { ScoreParam, FlatScore } from '../../common/game-types'
import { precise } from './../game/scoring'
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

const findAverage = (sequence: number[]): number => {
  const sum = sequence.reduce((acc, curr) => acc + curr)
  return precise(sum / sequence.length, 4)
}

const findMedian = (sequence: number[]): number => {
  if (sequence.length % 2) {
    return sequence[Math.ceil(sequence.length / 2)]
  } else {
    const a = sequence[(sequence.length / 2) - 1]
    const b = sequence[sequence.length / 2]
    return precise((a + b) / 2, 4)
  }
}

const calcBoundingAxis = (highest: number) => {
  const exponent = Math.floor(Math.log10(highest)) - 1
  const dataScale = Math.pow(10, exponent)
  return Math.ceil(highest / dataScale) * dataScale
}

const LineDiagram = (props: LineDiagramProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const coordinates: Coordinate[] = props.data.map((flat: FlatScore) => {
    return { x: flat[props.xParam], y: flat[props.yParam] }
  })

  const avg: Coordinate = {
    x: findAverage(coordinates.map((s: Coordinate) => s.x)),
    y: findAverage(coordinates.map((s: Coordinate) => s.y))
  }

  const med: Coordinate = {
    x: findMedian(coordinates.map((s: Coordinate) => s.x)),
    y: findMedian(coordinates.map((s: Coordinate) => s.y))
  }

  const max: Coordinate = {
    x: Math.max(...coordinates.map((s: Coordinate) => s.x)),
    y: Math.max(...coordinates.map((s: Coordinate) => s.y))
  }

  const lgdSpace = 100  // legenda left and bottom
  const lgdOver = { x: 0, y: 30 }
  const pointsSpace = 5 // graph top and right
  const graphSize = { x: 600, y: 400 }
  const axisMax = { x: calcBoundingAxis(max.x), y: calcBoundingAxis(max.y) }
  const dataScale = { x: graphSize.x / axisMax.x, y: graphSize.y / axisMax.y }

  const diagramSize = {
    x: graphSize.x + lgdSpace + pointsSpace + lgdOver.x,
    y: graphSize.y + lgdSpace + pointsSpace + lgdOver.y
  }
  const crossLegSize = 75

  return (
    <svg
      role="document"
      className="line-diagram"
      viewBox={`${lgdSpace * -1} ${pointsSpace * -1} ${diagramSize.x} ${diagramSize.y}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="legenda">
        <line x1="0" y1={graphSize.y} x2={graphSize.x} y2={graphSize.y} />
        <text x="0" y={graphSize.y} dx="20" dy={lgdSpace * .9} textAnchor="middle">{text.fame[props.xParam]} &rarr;</text>
        <line x1="0" y1="0" x2="0" y2={graphSize.y} />
        <text x={-graphSize.y} y="0" dx="20" dy={lgdSpace * -.8} transform="rotate(-90)" textAnchor="middle">{text.fame[props.yParam]} &rarr;</text>

        <text x={graphSize.x} y={graphSize.y} dy="120" textAnchor="end" style={{fontSize: '133%'}}>
          {coordinates.length} {text.fame['won games']}, {text.fame['median']}: {med.x}, {text.fame['average']}: {avg.x}
        </text>
      </g>
      <g className="x-axis">
        // zero
        <line x1="0" y1={graphSize.y} x2="0" y2={graphSize.y + 20} />
        <text x="0" y={graphSize.y} dy={lgdSpace * .5} textAnchor="middle">0</text>

        // how normal
        <line x1={avg.x * dataScale.x} y1={graphSize.y} x2={avg.x * dataScale.x} y2={graphSize.y + 20} />
        <text x={avg.x * dataScale.x} y={graphSize.y} dy="50" textAnchor="middle" aria-labelledby="average">
          <title id="average">{text.fame['average']}: {avg.x}</title>
          <tspan>x</tspan><tspan dx="-.5%">&#772;</tspan>
        </text>
        <line x1={med.x * dataScale.x} y1={graphSize.y} x2={med.x * dataScale.x} y2={graphSize.y + 20} />
        <text x={med.x * dataScale.x} y={graphSize.y} dy="50" textAnchor="middle" aria-labelledby="median">
          <title id="median">{text.fame['median']}: {med.x}</title>
          <tspan>x</tspan><tspan dx="-.5%">&#771;</tspan>
        </text>

        // max
        <line x1={graphSize.x} y1={graphSize.y} x2={graphSize.x} y2={graphSize.y + 20} />
        <text x={graphSize.x} y={graphSize.y} dy={lgdSpace * .5} textAnchor="end">{axisMax.x}</text>
      </g>
      <g className="y-axis">
        <line x1="0" y1="0" x2="-20" y2="0" />
        <text x="0" y="0" dy={lgdSpace * -.4} transform="rotate(-90)" textAnchor="end">{axisMax.y}</text>
        <line x1="0" y1={graphSize.y} x2="-20" y2={graphSize.y} />
        <text x={-graphSize.y} y="0" dy={lgdSpace * -.4} transform="rotate(-90)" textAnchor="middle">0</text>
      </g>
      <g className="data-points">
        {coordinates.map((d, i) =>
          <g className="data-point" key={`lnd_group_${i}`}
            transform={`translate(${d.x * dataScale.x}, ${(axisMax.y - d.y) * dataScale.y})`}
          >
            <path d={`M ${-crossLegSize}, 0 ${crossLegSize}, 0 M 0,${-crossLegSize} 0, ${crossLegSize}`} key={`lnd_path_${i}`} />
            <circle  cx="0" cy="0" r="3" key={`lnd_circle_${i}`} aria-labelledby={`lnd_title_${i}`}>
              <title id={`lnd_title_${i}`} key={`lnd_title_${i}`}>
                {`${text.fame[props.xParam]}: ${d.x}, ${text.fame[props.yParam]}: ${d.y}`}
              </title>
            </circle>
          </g>)}
      </g>

    </svg>
  )
}

export default LineDiagram
