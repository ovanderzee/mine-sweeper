import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import Play from '../symbols/Play'

const NewGame = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const action: SimpleAction = { type: 'NEW' }
  const confirmHandler = () => props.onNew(action)

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
    onCancel={() => {}}
    closeModal={() => setShowModal(false)}
  >
    {text.dialog['Quit and new game?']}
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
