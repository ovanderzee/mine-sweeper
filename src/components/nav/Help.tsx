import { useContext } from 'react'
import PageContext from '../../store/page-context'
import About from '../meta/About'

const Help = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<About />)

  return (
    <button type="button" title={text.nav['Help']} onClick={showHandler}>
      <svg role="img"><use href={`#nav-question`} /></svg>
    </button>
  )
}

export default Help
