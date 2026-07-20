import { useContext } from 'react'
import PageContext from '../../store/page-context'
import { precise } from '../../common/scoring'
import './Histogram.css'

interface Coordinate {
  x: number,
  y: number,
  color?: string,
}

interface HistogramProps {
  data: number[],
}

const fillColors = [
  'var(--dark-blue)', 'var(--state-green)', 'var(--state-red)'
]

const calcBoundingAxis = (highest: number) => {
  const exponent = Math.floor(Math.log10(highest)) - 1
  const dataScale = Math.pow(10, exponent)
  return precise(Math.ceil(highest / dataScale) * dataScale, 4)
}

const Histogram = (props: HistogramProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const coordinates: Coordinate[] = props.data.map((value: number, index: number) => {
    let color = fillColors[1]
    if (index > 8) {
      color = fillColors[2]
    } else if (index < 1) {
      color = fillColors[0]
    }
    return { x: index, y: value, color}
  })

  const max: Coordinate = {
    x: Math.max(coordinates.length),
    y: Math.max(...coordinates.map((s: Coordinate) => s.y))
  }

  const lgdSpace = 100  // legenda left and bottom
  const lgdOver = { x: 0, y: 30 }
  const pointsSpace = { x: 5, y: 10 } // graph top and right
  const graphSize = { x: 600, y: 100 }
  const axisMax = { x: calcBoundingAxis(max.x), y: calcBoundingAxis(max.y) }
  const dataScale = { x: graphSize.x / axisMax.x, y: graphSize.y / axisMax.y }

  const diagramSize = {
    x: graphSize.x + lgdSpace + pointsSpace.x + lgdOver.x,
    y: graphSize.y + lgdSpace + pointsSpace.y + lgdOver.y
  }

  // @ts-expect-error // error TS6133: 'd' is declared but its value is never read.
  const xValues = coordinates.map((d, i) =>
    (i%9) && <text x={dataScale.x * (i + .5)} y="120" textAnchor="middle">{i % 9}</text>
  )

  return (
    <svg
      role="document"
      className="frequency-histogram"
      viewBox={`${lgdSpace * -1} ${pointsSpace.y * -1} ${diagramSize.x} ${diagramSize.y}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="legenda">
        <line x1="0" y1={graphSize.y} x2={graphSize.x} y2={graphSize.y} />
        <text x={graphSize.x} y={graphSize.y} dy={lgdSpace * .67} textAnchor="end" data-testid="x-parameter"
          >{text.VAR.surrounding} &rarr;</text>
        <line x1="0" y1="0" x2="0" y2={graphSize.y} />
        <text x="0" y="-70" transform="rotate(-90)" textAnchor="end" data-testid="y-parameter"
          >{text.VAR.occurrences} &rarr;</text>
        <text x={graphSize.x} y={graphSize.y} dy="120" textAnchor="end">
          <tspan>{text.VAR.blanks}</tspan>
          <tspan>{text.VAR.pointers}</tspan>
          <tspan>{text.VAR.mines}</tspan>
        </text>
      </g>
      <g className="x-axis">
        {xValues}
      </g>
      <g className="y-axis">
        <line x1="0" y1="0" x2="-20" y2="0" />
        <text x="-33" y="6" textAnchor="end">{axisMax.y}</text>
        <line x1="0" y1={graphSize.y} x2="-20" y2={graphSize.y} />
        <text x="-33" y="106" textAnchor="middle">0</text>
      </g>
      <g className="data-points">
        {coordinates.map((d, i) =>
          <g className={`data-point`} key={`lnd_group_${i}`} fill={d.color}
            transform={`translate(${d.x * dataScale.x}, ${axisMax.y * dataScale.y})`}
          >
            <path d={`M 0,0 V -100 H ${dataScale.x} V 0 Z`} key={`lnd_back_${i}`} opacity=".4" aria-labelledby={`lnd_title_${i}`}>
              <title id={`lnd_title_${i}`} key={`lnd_title_${i}`}>
                {`${text.VAR.surrounding}: ${d.x % 9}, ${text.VAR.occurrences}: ${d.y}`}
              </title>
            </path>
            <path d={`M 0,0 V ${-d.y * dataScale.y} H ${dataScale.x} V 0 Z`} key={`lnd_front_${i}`} aria-labelledby={`lnd_title_${i}`}>
              <title id={`lnd_title_${i}`} key={`lnd_title_${i}`}>
                {`${text.VAR.surrounding}: ${d.x % 9}, ${text.VAR.occurrences}: ${d.y}`}
              </title>
            </path>
          </g>)}
      </g>

    </svg>
  )
}

export default Histogram
