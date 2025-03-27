import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Erase from '../symbols/Erase'
import Modal from '../UI/Modal'

const EraseScores = (props: { onErase: () => void }) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const consentModal = <Modal
    className="consent"
    onConfirm={() => props.onErase()}
    onCancel={() => {}}
    closeModal={() => setShowModal(false)}
  >
    {text.dialog['Erase Scores?']}
  </Modal>

  const eraseHandler = () => {
    setShowModal(true)
  }

  return (
    <>
      <button type="button" title={text.nav['Clear List']} onClick={eraseHandler}>
        <Erase />
      </button>
      {showModal && consentModal}
    </>
  )
}

export default EraseScores
