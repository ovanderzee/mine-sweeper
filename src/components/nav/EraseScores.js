import { useState } from 'react'
import Erase from '../symbols/Erase'
import Modal from '../UI/Modal'
import text from '../../common/i18n'

const EraseScores = (props) => {
  const [showAskModalState, setAskModalState] = useState(false)

  const askModal = <Modal
    onConfirm={() => props.onErase()}
    onCancel={() => {}}
    onClose={() => setAskModalState(false)}
  >
    {text.fame['Erase Ok?']}
  </Modal>

  const eraseHandler = () => {
    setAskModalState(true)
  }

  return (
    <>
      <button type="button" title={text.nav['Clear List']} onClick={eraseHandler}>
        <Erase />
      </button>
      {showAskModalState && askModal}
    </>
  )
}

export default EraseScores
