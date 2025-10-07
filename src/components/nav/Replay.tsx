import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import { GameStages, GameActionType, GameAction } from '../../common/game-types';

interface ReplayProps {
  onReplay: (action: GameAction) => void;
  stage: GameStages;
}

const Replay = (props: ReplayProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)
  const [showActive, setShowActive] = useState(false)

  const action: GameAction = { type: GameActionType.REPLAY }
  const confirmHandler = () => {
    setShowActive(true)
    props.onReplay(action)
    setTimeout(()=>setShowActive(false), 300)
}

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

  return <>
    <button type="button"
      className={showActive ? 'active' : ''}
      title={text.nav['Replay']}
      onClick={replayHandler}
    >
      <svg role="img"><use href={`#nav-replay`} /></svg>
    </button>
    {showModal && consentModal}
  </>
}

export default Replay
