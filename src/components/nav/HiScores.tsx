import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HallOfFame from '../meta/HallOfFame'
import { PageProps } from '../../common/game.d'

const HiScores = (props: PageProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => {
    props.onPause && props.onPause()
    setTimeout(() => pageCtx.navigate(<HallOfFame />), 10)
  }

  return (
    <button type="button" className="nav-option" title={text.nav['Hall of Fame']} onClick={showHandler}>
      <svg role="img" aria-label={text.icon['podium']}><use href="#nav-podium" /></svg>
    </button>
  )
}

export default HiScores
