import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import DEFAULTS from '../../common/defaults'
import { GameStages } from '../../common/game-types'
import Modal from '../UI/Modal'
import Reset from '../symbols/Reset'

const DefaultSettings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const confirmHandler = () => {
    sessionStorage.removeItem('mv-game')
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
    // als spelend en speelbord of mijndichtheid niet geconfigureerd zijn
    const currGame = sessionStorage.getItem('mv-game')
    const cfg = pageCtx.config
    if (currGame && cfg) {
      const game = JSON.parse(currGame)
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
