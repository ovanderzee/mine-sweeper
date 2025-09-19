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
      <g className="legenda">
        <line x1="0" y1={graphSize.y} x2={graphSize.x} y2={graphSize.y} />
        <text x="0" y={graphSize.y} dy={textSpace.x * .9}>{props.xParam} &rarr;</text>
        <line x1="0" y1="0" x2="0" y2={graphSize.y} />
        <text x="0" y="0" dy={textSpace.y * -.8} transform="rotate(-90)" textAnchor="end">{props.yParam} &rarr;</text>
      </g>
      <g className="x-axis">
        // zero
        <line x1="0" y1={graphSize.y} x2="0" y2={graphSize.y + 20} />
        <text x="0" y={graphSize.y} dy={textSpace.x * .5} textAnchor="start">0</text>

        // how normal
        <line x1={avg.x * dataScale.x} y1={graphSize.y} x2={avg.x * dataScale.x} y2={graphSize.y + 20} strokeWidth="2" />
        <text x={-graphSize.y} y={avg.x * dataScale.x} dx="-25" dy="5" textAnchor="end" aria-labelledby="average"
          transform="rotate(-90)"
        >
          <title id="average">average: {avg.x}</title>
          average
        </text>
        <line x1={med.x * dataScale.x} y1={graphSize.y} x2={med.x * dataScale.x} y2={graphSize.y + 20} strokeWidth="2" />
        <text x={-graphSize.y} y={med.x * dataScale.x} dx="-25" dy="5" textAnchor="end" aria-labelledby="median"
          transform="rotate(-90)"
        >
          <title id="median">median: {med.x}</title>
          median
        </text>

        // "beautiful" max
        <line x1={graphSize.x} y1={graphSize.y} x2={graphSize.x} y2={graphSize.y + 20} strokeWidth="2" />
        <line x1={graphSize.x} y1={graphSize.y} x2={graphSize.x} y2={graphSize.y + 20} />
        <text x={graphSize.x} y={graphSize.y} dy={textSpace.x * .5} textAnchor="end">{axisMax.x}</text>
      </g>
      <g className="y-axis">
        <line x1="0" y1="0" x2="-20" y2="0" />
        <text x="0" y="0" dy={textSpace.y * -.4} transform="rotate(-90)" textAnchor="end">{axisMax.y}</text>
        <line x1="0" y1={graphSize.y} x2="-20" y2={graphSize.y} />
        <text x={-graphSize.y} y="0" dy={textSpace.y * -.4} transform="rotate(-90)" textAnchor="start">0</text>
      </g>
      <g className="data-points">
        {coordinates.map((d, i) =>
          <circle cx={d.x * dataScale.x} cy={(axisMax.y - d.y) * dataScale.y} r="3"
            key={`lnd_circle_${i}`} aria-labelledby={`lnd_title_${i}`}
          >
            <title id={`lnd_title_${i}`} key={`lnd_title_${i}`}>{`title ${props.xParam}: ${d.x}, ${props.yParam}: ${d.y}`}</title>
          </circle>
        )}
      </g>

    </svg>
  )
}

export default LineDiagram
