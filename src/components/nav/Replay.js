import { useState } from 'react'
import Modal from '../UI/Modal'
import text from '../../common/i18n'

const Replay = (props) => {
  const [showModal, setShowModal] = useState(false)

  const confirmHandler = () => props.onReplay({ type: 'REPLAY' })
  const cancelHandler = () => {}
  const closeHandler = () => setShowModal(false)

  const consentModal = <Modal
    onConfirm={confirmHandler}
    onCancel={cancelHandler}
    onClose={closeHandler}
  >
    {text.nav['Quit Game?']}
  </Modal>

  const replayHandler = () => {
    const isPlaying = props.stage === 'game-playing'
    isPlaying ? setShowModal(isPlaying) : confirmHandler()
  }

  return (
    <>
      <button type="button" title={text.nav['Replay']} onClick={replayHandler}>
        &#x21bb;
      </button>
      {showModal && consentModal}
    </>
  )
}

export default Replay
