import Flag from '../symbols/Flag'
import text from '../../common/i18n'
import './Nav.css'

const Flagging = (props) => {
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
