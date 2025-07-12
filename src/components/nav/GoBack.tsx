import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Game from '../game/Game'

const GoBack = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const goBackHandler = () => pageCtx.navigate(<Game />)

  return (
    <button type="button" title={text.nav['Go Back']} onClick={goBackHandler}>
      <svg><use href={`#nav-return`} /></svg>
    </button>
  )
}

export default GoBack
