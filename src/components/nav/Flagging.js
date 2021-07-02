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
      &#x2691;
    </button>
  )
}

export default Flagging
