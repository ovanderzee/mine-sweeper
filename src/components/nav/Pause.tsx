import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Empty from '../meta/Empty'
import { PageProps } from '../../common/game.d'

const Pause = (props: PageProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => {
    props.onPause && props.onPause()
    setTimeout(() => pageCtx.navigate(<Empty />), 10)
  }

  return (
    <button type="button" className="nav-option" title={text.nav['Pause']} onClick={showHandler}>
      {props.appearance === 'tip'
        ? <svg role="img" aria-label={text.icon['pause']}><use href={`#plain-pause`} /></svg>
        : <svg role="img" aria-label={text.icon['pause']}><use href={`#nav-pause`} /></svg>
      }
    </button>
  )
}

export default Pause
