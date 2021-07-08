import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Game from '../game/Game'
import CRLF from '../symbols/CRLF'
import text from '../../common/i18n'

const GoBack = (props) => {
  const pageCtx = useContext(PageContext)

  const goBackHandler = () => pageCtx.navigate(<Game />)

  return (
    <button type="button" title={text.nav['Go Back']} onClick={goBackHandler}>
      <CRLF />
    </button>
  )
}

export default GoBack
