import { useState } from 'react'
import Modal from '../UI/Modal'
import text from '../../common/i18n'

const NewGame = (props) => {
  const [showModal, setShowModal] = useState(false)

  const confirmHandler = () => props.onNew({ type: 'NEW' })
  const cancelHandler = () => {}
  const closeHandler = () => setShowModal(false)

  const consentModal = <Modal
    onConfirm={confirmHandler}
    onCancel={cancelHandler}
    onClose={closeHandler}
  >
    {text.nav['Quit Game?']}
  </Modal>

  const newGameHandler = () => {
    const isPlaying = props.stage === 'game-playing'
    isPlaying ? setShowModal(isPlaying) : confirmHandler()
  }

  return (
    <>
      <button type="button" title={text.nav['New Game']} onClick={newGameHandler}>
        &#x25b6;
      </button>
      {showModal && consentModal}
    </>
  )
}

export default NewGame
