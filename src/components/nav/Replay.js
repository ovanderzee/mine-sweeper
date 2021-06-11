import text from '../../i18n'

const Replay = (props) => {
  const replayHandler = () => {
    props.onReplay({ type: 'REPLAY' })
  }

  return (
    <button type="button" title={text.nav['Replay']} onClick={replayHandler}>
      &#x21bb;
    </button>
  )
}

export default Replay
