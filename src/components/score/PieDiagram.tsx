import { useContext, CSSProperties } from 'react'
import PageContext from '../../store/page-context'
import { Relative } from '../../common/game.d'
import { significant } from '../../common/scoring'
import './PieDiagram.css'

interface PieProps {
  rel: Relative
}

const PieDiagram = (props: PieProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const blankLevel = significant(props.rel.blanks * 100, 3)
  const pointerLevel = significant(props.rel.pointers * 100, 3)
  const mineLevel = significant(props.rel.mines * 100, 3)

  return (
    <figure
      className="pie-diagram"
      style={{
        '--blank-stop': `${blankLevel}%`,
        '--pointer-stop': `${blankLevel + pointerLevel}%`,
      } as CSSProperties}
    >
      <div className="cone"></div>
      <figcaption className="blanks">
        <span>{text.VAR.blanks}</span>
        <b>{blankLevel}%</b>
      </figcaption>
      <figcaption className="pointers">
        <span>{text.VAR.pointers}</span>
        <b>{pointerLevel}%</b>
      </figcaption>
      <figcaption className="mines">
        <span>{text.VAR.mines}</span>
        <b>{mineLevel}%</b>
      </figcaption>
    </figure>
  )
}

export default PieDiagram
