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
        <text x="0" y={graphSize.y} dx="20" dy={lgdSpace * .9} textAnchor="middle" data-testid="x-parameter"
          >{text.VAR[props.xParam]} &rarr;</text>
        <line x1="0" y1="0" x2="0" y2={graphSize.y} />
        <text x={-graphSize.y} y="0" dx="20" dy={lgdSpace * -.8} transform="rotate(-90)" textAnchor="middle" data-testid="y-parameter"
          >{text.VAR[props.yParam]} &rarr;</text>

        <text x={graphSize.x} y={graphSize.y} dy="120" textAnchor="end" style={{fontSize: '133%'}}>
          {coordinates.length} {text.fame['won games']}
        </text>
      </g>
      <g className="x-axis">
        // zero
        <line x1="0" y1={graphSize.y} x2="0" y2={graphSize.y + 20} />
        <text x="0" y={graphSize.y} dy={lgdSpace * .5} textAnchor="middle">0</text>
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
          <g className={`data-point`} key={`lnd_group_${i}`}
            transform={`translate(${d.x * dataScale.x}, ${(axisMax.y - d.y) * dataScale.y})`}
          >
            <path d={`M ${-crossLegSize}, 0 ${crossLegSize}, 0 M 0,${-crossLegSize} 0, ${crossLegSize}`} key={`lnd_path_${i}`} />
            <circle  cx="0" cy="0" r="3" key={`lnd_circle_${i}`} aria-labelledby={`lnd_title_${i}`}>
              <title id={`lnd_title_${i}`} key={`lnd_title_${i}`}>
                {`${text.VAR[props.xParam]}: ${d.x}, ${text.VAR[props.yParam]}: ${d.y}`}
              </title>
            </circle>
          </g>)}
      </g>

    </svg>
  )
}

export default Histogram
