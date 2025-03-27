import { ActionDispatch, useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import Redo from '../symbols/Redo'
import { GameStages, GameActionType, SimpleAction } from '../../common/game-types';

interface ReplayProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReplay: ActionDispatch<any>;
  stage: GameStages;
}

const Replay = (props: ReplayProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const action: SimpleAction = { type: GameActionType.REPLAY }
  const confirmHandler = () => props.onReplay(action)

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
    onCancel={() => {}}
    closeModal={() => setShowModal(false)}
  >
    {text.dialog['Quit and restart game?']}
  </Modal>

  const replayHandler = () => {
    const isPlaying = props.stage === GameStages.PLAYING
    isPlaying ? setShowModal(isPlaying) : confirmHandler()
  }

  return (
    <>
      <button type="button" title={text.nav['Replay']} onClick={replayHandler}>
        <Redo />
      </button>
      {showModal && consentModal}
    </>
  )
}

export default Replay
