import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Game from '../game/Game'
import { Enter } from '../UI/Symbols'

const GoBack = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const goBackHandler = () => pageCtx.navigate(<Game />)

  return (
    <button type="button" title={text.nav['Go Back']} onClick={goBackHandler}>
      <Enter />
    </button>
  )
}

export default GoBack
