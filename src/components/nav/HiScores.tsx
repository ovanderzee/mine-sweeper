import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HallOfFame from '../meta/HallOfFame'

const HiScores = (props: { label?: string; }) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<HallOfFame />)

  return (
    <button type="button" title={text.nav['Hall of Fame']} onClick={showHandler}>
      {props.label ?
        <svg>
          <text id="text-content" x="50%" y="55%">{props?.label}</text>
        </svg> :
        <svg><use href={`#nav-podium`} /></svg>}
    </button>
  )
}

export default HiScores
