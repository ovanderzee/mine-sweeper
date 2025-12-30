import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import { ApproveModal } from '../UI/Modal'
import { GameStages, GameActionType, GameAction } from '../../common/game.d';

interface NewGameProps {
  onNew: (action: GameAction) => void;
  stage: GameStages;
  appearance?: string;
}

const NewGame = (props: NewGameProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)
  const [showActive, setShowActive] = useState(false)

  const action: GameAction = { type: GameActionType.NEW }
  const confirmHandler = () => {
    setShowActive(true)
    props.onNew(action)
    setTimeout(()=>setShowActive(false), 300)
  }

  const approveModal = <ApproveModal
    message={text.dialog['Quit and new game?']}
    onConfirm={confirmHandler}
    onCancel={() => {}}
    isShowModal={showModal}
    endShowModal={()=>setShowModal(false)}
  />

  const newGameHandler = () => {
    const isPlaying = props.stage === GameStages.PLAYING
    isPlaying ? setShowModal(isPlaying) : confirmHandler()
  }

  return <>
    <button type="button"
      className={`nav-option ${showActive ? 'active' : ''}`}
      title={text.nav['New Game']}
      onClick={newGameHandler}
    >
      {props.appearance === 'tip'
        ? <svg role="img" aria-label={text.icon['play']}><use href={`#plain-play`} /></svg>
        : <svg role="img" aria-label={text.icon['play']}><use href={`#nav-play`} /></svg>
      }
    </button>
    {approveModal}
  </>
}

export default NewGame
