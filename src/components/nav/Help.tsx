import { useContext } from 'react'
import PageContext from '../../store/page-context'
import About from '../meta/About'
import { PageProps } from '../../common/game.d'

const Help = (props: PageProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => {
    props.onPause && props.onPause()
    setTimeout(() => pageCtx.navigate(<About />), 10)
  }

  return (
    <button type="button" className="nav-option" title={text.nav['Help']} onClick={showHandler}>
      <svg role="img" aria-label={text.icon['question']}><use href={`#nav-question`} /></svg>
    </button>
  )
}

export default Help
