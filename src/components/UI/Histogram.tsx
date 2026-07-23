import { useContext } from 'react'
import PageContext from '../../store/page-context'
import { precise } from '../../common/scoring'
import './Histogram.css'

interface Coordinate {
  x: number,
  y: number,
  color?: string
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

  const lgdSpace = { x: 80, y: 50 }  // legenda left and bottom
  const lgdOver = { x: 0, y: 10 }
  const pointsSpace = { x: 5, y: 10 } // graph top and right
  const graphSize = { x: 460, y: 100 }
  const axisMax = { x: calcBoundingAxis(max.x), y: calcBoundingAxis(max.y) }
  const dataScale = { x: graphSize.x / axisMax.x, y: graphSize.y / axisMax.y }

  const diagramSize = {
    x: graphSize.x + lgdSpace.x + pointsSpace.x + lgdOver.x,
    y: graphSize.y + lgdSpace.y + pointsSpace.y + lgdOver.y
  }

  // @ts-expect-error // error TS6133: 'd' is declared but its value is never read.
  const xValues = coordinates.map((d, i) =>
    (i%9) && <text x={dataScale.x * (i + .5)} y="120" textAnchor="middle" key={`lnd_x_${i}`}>{i % 9}</text>
  )

  return (
    <svg
      role="document"
      className="frequency-histogram"
      viewBox={`${lgdSpace.x * -1} ${pointsSpace.y * -1} ${diagramSize.x} ${diagramSize.y}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="data-points">
        {coordinates.map((d, i) =>
          <g className={`data-point`} key={`lnd_group_${i}`} fill={d.color}
            transform={`translate(${d.x * dataScale.x}, ${axisMax.y * dataScale.y})`}
          >
            <path d={`M 0,0 V -100 H ${dataScale.x} V 0 Z`} key={`lnd_back_${i}`} opacity=".4" aria-labelledby={`lnd_back_title_${i}`}>
              <title id={`lnd_back_title_${i}`} key={`lnd_back_title_${i}`}>
                {`${text.VAR.surrounding}: ${d.x % 9}, ${text.VAR.occurrences}: ${d.y}`}
              </title>
            </path>
            <path d={`M 0,0 V ${-d.y * dataScale.y} H ${dataScale.x} V 0 Z`} key={`lnd_front_${i}`} aria-labelledby={`lnd_front_title_${i}`}>
              <title id={`lnd_front_title_${i}`} key={`lnd_front_title_${i}`}>
                {`${text.VAR.surrounding}: ${d.x % 9}, ${text.VAR.occurrences}: ${d.y}`}
              </title>
            </path>
          </g>)}
      </g>
      <g className="legenda">
        <line x1="0" y1={graphSize.y} x2={graphSize.x} y2={graphSize.y} />
        <text x="-33" y={graphSize.y} dy={lgdSpace.y} textAnchor="start" data-testid="x-parameter"
          >{text.VAR.surrounding} &rarr;</text>
        <line x1="0" y1="0" x2="0" y2={graphSize.y} />
        <text x="2" y="-60" transform="rotate(-90)" textAnchor="end" data-testid="y-parameter"
          >{text.VAR.occurrences} &rarr;</text>
        <text x={graphSize.x} y={graphSize.y} dy={lgdSpace.y} textAnchor="end">
          &nbsp; <tspan fill={fillColors[0]}>&#x2588;</tspan> {text.VAR.blanks}
          &nbsp; <tspan fill={fillColors[1]}>&#x2588;</tspan> {text.VAR.pointers}
          &nbsp; <tspan fill={fillColors[2]}>&#x2588;</tspan> {text.VAR.mines}
        </text>
      </g>
      <g className="x-axis">
        {xValues}
      </g>
      <g className="y-axis">
        <line x1="0" y1="0" x2="-10" y2="0" />
        <text x="-20" y="6" textAnchor="end">{axisMax.y}</text>
        <line x1="0" y1={graphSize.y} x2="-10" y2={graphSize.y} />
        <text x="-20" y="106" textAnchor="end">0</text>
      </g>

    </svg>
  )
}

export default Histogram
