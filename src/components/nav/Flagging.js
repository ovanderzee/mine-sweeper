import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Flag from '../symbols/Flag'
import './Nav.css'

const Flagging = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const activeClass = props.flagging ? 'active' : ''

  const flaggingHandler = () => {
    props.onFlagging({
      type: 'FLAGGING',
      value: !props.flagging,
    })
  }

  return (
    <button
      type="button"
      title={text.nav['Place Flag']}
      className={activeClass}
      onClick={flaggingHandler}
    >
      <Flag />
    </button>
  )
}

export default Flagging
