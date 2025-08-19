import Modal from '../UI/Modal'
import { GameState } from '../../common/game-types'

interface GameWonModalProps {
  close: (next: boolean) => void,
  state: GameState
}

const GameWonModal = (props: GameWonModalProps) => {
  return (
    <Modal
      onConfirm={() => {}}
      closeModal={() => props.close(false)}
      className={props.state.stage}
      textBefore={props.state.score.rank}
      textAfter={props.state.score.score.points}
    />
  )
}

export default GameWonModal
