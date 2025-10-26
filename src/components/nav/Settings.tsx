import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Configure from '../meta/Configure'

const Settings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<Configure />)

  return (
    <button type="button" className="nav-option" title={text.nav['Settings']} onClick={showHandler}>
      <svg role="img"><use href={`#nav-sliders`} /></svg>
    </button>
  )
}

export default Settings
