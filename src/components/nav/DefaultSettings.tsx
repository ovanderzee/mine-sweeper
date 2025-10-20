import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import DEFAULTS from '../../common/defaults'
import storage from '../../common/storage'
import { GameStages } from '../../common/game.d'
import Modal from '../UI/Modal'

const DefaultSettings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)
  const [showActive, setShowActive] = useState(false)

  const confirmHandler = () => {
    setShowActive(true)
    pageCtx.configure()
    setTimeout(()=>setShowActive(false), 300)
  }

  const quitAndConfirm = () => {
    storage.eraseGame()
    confirmHandler()
  }

  const consentModal = <Modal
    className="consent"
    onConfirm={quitAndConfirm}
    onCancel={() => {}}
    closeModal={() => setShowModal(false)}
  >
    {text.dialog['Quit Game?']}
  </Modal>

  const resetHandler = () => {
    // (when playing and a game) or no game
    const game = storage.game
    if (game) {
      const cfg = pageCtx.config
      const isPlaying = game.stage === GameStages.PLAYING
      const isDefaultPlayConfig = DEFAULTS.BOARD_SIZE === cfg.BOARD_SIZE && DEFAULTS.GAME_LEVEL === cfg.GAME_LEVEL
      isPlaying && !isDefaultPlayConfig ? setShowModal(true) : quitAndConfirm()
    } else {
      confirmHandler()
    }
  }

  return <>
    <button type="button"
      className={`nav-option ${showActive ? 'active' : ''}`}
      title={text.nav['Reinstate Defaults']}
      onClick={resetHandler}
    >
      <svg role="img"><use href={`#nav-reset`} /></svg>
    </button>
    {showModal && consentModal}
  </>
}

export default DefaultSettings
