import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import { ApproveModal } from '../UI/Modal'
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

  const eraseHandler = () => {
    setShowModal(true)
  }

  return <>
    <button type="button"
      className={`nav-option ${showActive ? 'active' : ''}`}
      title={text.nav['Clear List']}
      onClick={eraseHandler}
    >
      <svg role="img" aria-label={text.icon['empty set']}><use href={`#nav-empty`} /></svg>
    </button>
    <ApproveModal
      message={text.dialog['Erase Scores?']}
      onConfirm={confirmHandler}
      onCancel={() => {}}
      isShowModal={showModal}
      endShowModal={()=>setShowModal(false)}
    />
  </>
}

export default EraseScores
