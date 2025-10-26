import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Modal from '../UI/Modal'
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

  const navOptionButton = <>
    <button type="button"
      className={`nav-option ${showActive ? 'active' : ''}`}
      title={text.nav['New Game']}
      onClick={newGameHandler}
    >
      <svg role="img" aria-label={text.icon['play']}><use href={`#nav-play`} /></svg>
    </button>
    {showModal && consentModal}
  </>

  const tipButton = <>
    <button type="button"
      className={`nav-option ${showActive ? 'active' : ''}`}
      title={text.nav['New Game']}
      onClick={newGameHandler}
    >
      <svg role="img" aria-label={text.icon['play']}><use href={`#plain-play`} /></svg>
    </button>
    {showModal && consentModal}
  </>

  return props.appearance === 'tip' ? tipButton : navOptionButton
}

export default NewGame
