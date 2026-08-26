import { useContext, CSSProperties } from 'react'
import PageContext from '../../store/page-context'
import { Relative } from '../../common/game.d'
import { precise } from '../../common/scoring'
import './PieDiagram.css'

interface PieProps {
  rel: Relative
}

const PieDiagram = (props: PieProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const blankLevel = precise(props.rel.blanks * 100, 3)
  const pointerLevel = precise(props.rel.pointers * 100, 3)
  const mineLevel = precise(props.rel.mines * 100, 3)

  return (
    <svg
      role="document"
      className="pie-diagram"
      viewBox={`-200 -100 400 200`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        '--blank-stop': `${blankLevel}%`,
        '--pointer-stop': `${blankLevel + pointerLevel}%`,
      } as CSSProperties}
    >
      <clipPath id="round-clip">
        <circle cx="0" cy="0" r="100" />
      </clipPath>
      <foreignObject x="-100" y="-100" width="200" height="200" clipPath="url(#round-clip)">
        <div className="cone"></div>
      </foreignObject>
      <g>
        <text x="80" y="-75">{text.VAR.blanks}</text>
        <text x="100" y="-45">{blankLevel}%</text>
        <text x="-100" y="65"textAnchor="end">{text.VAR.pointers}</text>
        <text x="-80" y="95"textAnchor="end">{pointerLevel}%</text>
        <text x="-80" y="-75"textAnchor="end">{text.VAR.mines}</text>
        <text x="-100" y="-45"textAnchor="end">{mineLevel}%</text>
      </g>
    </svg>
  )
}

export default PieDiagram
