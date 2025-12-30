import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import { ApproveModal } from '../UI/Modal'
import { GameStages, GameActionType, GameAction } from '../../common/game.d';

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

  const replayHandler = () => {
    const isPlaying = props.stage === GameStages.PLAYING
    isPlaying ? setShowModal(isPlaying) : confirmHandler()
  }

  return <>
    <button type="button"
      className={`nav-option ${showActive ? 'active' : ''}`}
      title={text.nav['Replay']}
      onClick={replayHandler}
    >
      <svg role="img" aria-label={text.icon['cw-revolving']}><use href={`#nav-replay`} /></svg>
    </button>
    <ApproveModal
      message={text.dialog['Quit and restart game?']}
      onConfirm={confirmHandler}
      onCancel={() => {}}
      isShowModal={showModal}
      endShowModal={()=>setShowModal(false)}
    />
  </>
}

export default Replay
