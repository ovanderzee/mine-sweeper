import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
import { GameStages, GameActionType, GameAction } from '../../common/game-types';

interface NewGameProps {
  onNew: (action: GameAction) => void;
  stage: GameStages;
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

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
    onCancel={() => {}}
    closeModal={() => setShowModal(false)}
  >
    {text.dialog['Quit and new game?']}
  </Modal>

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
      <svg><use href={`#nav-play`} /></svg>
    </button>
    {showModal && consentModal}
  </>
}

export default NewGame
