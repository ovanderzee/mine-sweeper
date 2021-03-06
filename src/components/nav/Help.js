import { useContext } from 'react'
import PageContext from '../../store/page-context'
import About from '../meta/About'
import QuestionMark from '../symbols/QuestionMark'

const Help = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<About />)

  return (
    <button type="button" title={text.nav['Help']} onClick={showHandler}>
      <QuestionMark />
    </button>
  )
}

export default Help
