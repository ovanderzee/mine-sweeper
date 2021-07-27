import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Erase from '../symbols/Erase'
import Modal from '../UI/Modal'

const EraseScores = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

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
