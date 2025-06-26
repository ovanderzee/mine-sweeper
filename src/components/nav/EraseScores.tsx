import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import { Erase } from '../UI/Symbols'
import Modal from '../UI/Modal'
import storage from '../../common/storage'

const EraseScores = (props: { onErase: () => void }) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)
  const [showActive, setShowActive] = useState(false)

  const confirmHandler = () => {
    setShowActive(true)
    storage.eraseScores()
    props.onErase()
    setTimeout(()=>setShowActive(false), 300)
  }

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
    onCancel={() => {}}
    closeModal={() => setShowModal(false)}
  >
    {text.dialog['Erase Scores?']}
  </Modal>

  const eraseHandler = () => {
    setShowModal(true)
  }

  return <>
    <button type="button"
      className={showActive ? 'active' : ''}
      title={text.nav['Clear List']}
      onClick={eraseHandler}
    >
      <Erase />
    </button>
    {showModal && consentModal}
  </>
}

export default EraseScores
