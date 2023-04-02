import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import Redo from '../symbols/Redo'

const Replay = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const confirmHandler = () => props.onReplay({ type: 'REPLAY' })

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
    onCancel={() => {}}
    onClose={() => setShowModal(false)}
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
        <Redo />
      </button>
      {showModal && consentModal}
    </>
  )
}

export default Replay
