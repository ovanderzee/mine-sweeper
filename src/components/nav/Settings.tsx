import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Configure from '../meta/Configure'
import { PageProps } from '../../common/game.d'

const Settings = (props: PageProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => {
    props.onPause && props.onPause()
    setTimeout(() => pageCtx.navigate(<Configure />), 10)
  }

  return (
    <button type="button" className="nav-option" title={text.nav['Settings']} onClick={showHandler}>
      <svg role="img" aria-label={text.icon['sliders']}><use href={`#nav-sliders`} /></svg>
    </button>
  )
}

export default Settings
