import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'

const GameWonModal = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  return (
    <Modal
      onConfirm={() => {}}
      closeModal={() => props.close(false)}
      className={props.state.stage}
      textBefore={props.state.rank}
      textAfter={props.state.score}
    >
      {text.game['You Won!']}
    </Modal>
  )
}

export default GameWonModal
