import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import { GameState } from '../../common/game-types'

interface GameWonModalProps {
  close: (next: boolean) => void,
  state: GameState
}

const GameWonModal = (props: GameWonModalProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const modal =
    <Modal
      onConfirm={() => {}}
      closeModal={() => props.close(false)}
      className={props.state.stage}
      textBefore={props.state.rank}
      textAfter={props.state.score}
    >
      {text.game['You Won!']}
    </Modal>

  return modal
}

export default GameWonModal
