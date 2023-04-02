import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import DEFAULTS from '../../common/defaults'
import Modal from '../UI/Modal'
import Reset from '../symbols/Reset'

const DefaultSettings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [showModal, setShowModal] = useState(false)

  const confirmHandler = () => {
    sessionStorage.removeItem('mijnenvegerij')
    pageCtx.configure()
  }

  const consentModal = <Modal
    className="consent"
    onConfirm={confirmHandler}
    onCancel={() => {}}
    onClose={() => setShowModal(false)}
  >
    {text.nav['Quit Game?']}
  </Modal>

  const resetHandler = () => {
    // als spelend en speelbord of mijndichtheid niet geconfigureerd zijn
    const currentGame = sessionStorage.getItem('mijnenvegerij')
    console.log('currentGame', currentGame)
    if (currentGame) {
      const CURRENT = JSON.parse(currentGame)
      const isPlaying = CURRENT.stage === 'game-playing'
      const isDefaultPlayConfig = DEFAULTS.BOARD_SIZE === CURRENT.board.length && DEFAULTS.GAME_LEVEL === CURRENT.level
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




//function Configure() {
//  const pageCtx = useContext(PageContext)
//  const { BOARD_SIZE, GAME_LEVEL, LANGUAGE, FONT_SIZE, PLAYER_NAME, MAX_SCORES } = pageCtx.config
