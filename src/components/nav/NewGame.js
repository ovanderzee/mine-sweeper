import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import Play from '../symbols/Play'

const NewGame = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

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
        <Play />
      </button>
      {showModal && consentModal}
    </>
  )
}

export default NewGame
