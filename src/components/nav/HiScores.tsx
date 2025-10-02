import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HallOfFame from '../meta/HallOfFame'

const HiScores = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<HallOfFame />)

  return (
    <button type="button" className="nav-option" title={text.nav['Hall of Fame']} onClick={showHandler}>
      <svg><use href="#nav-podium" /></svg>
    </button>
  )
}

export default HiScores
