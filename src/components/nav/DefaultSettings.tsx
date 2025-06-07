import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import DEFAULTS from '../../common/defaults'
import storage from '../../common/storage'
import { GameStages } from '../../common/game-types'
import Modal from '../UI/Modal'
import { Reset } from '../symbols/Symbols'

const DefaultSettings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const confirmHandler = () => {
    storage.game = null
    pageCtx.configure()
  }

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
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
      isPlaying && !isDefaultPlayConfig ? setShowModal(true) : confirmHandler()
    } else {
      pageCtx.configure()
    }
  }

  return (
    <>
      <button
        type="button"
        title={text.nav['Reinstate Defaults']}
        onClick={resetHandler}
      >
        <Reset />
      </button>
      {showModal && consentModal}
    </>
  )
}

export default DefaultSettings
