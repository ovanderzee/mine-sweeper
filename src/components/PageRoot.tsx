import Introduction from './UI/Introduction'
import { useContext, useEffect, useState } from 'react'
import Game from './game/Game'
import PageContext from '../store/page-context'
import { rootKeyListener } from '../common/functions'
import { DEFAULTS } from '../common/defaults'

function PageRoot() {
  const pageCtx = useContext(PageContext)
  const [showIntroduction, setShowIntroduction] = useState(true)

  const goToGame = (timeout: number) => {
    pageCtx.navigate(<Game />)
    setTimeout(
      () => setShowIntroduction(false),
      timeout
    )
  }

  const introLayer = <Introduction onEnd={goToGame} />

  useEffect(() => {
    document.body.addEventListener('keydown', rootKeyListener)

    return () => {
      document.body.removeEventListener('keydown', rootKeyListener)
    }
  }, [])

  return (
    <section
      className="screen"
      style={{fontSize: `${pageCtx.config.FONT_SIZE}px`, '--font-size': `${pageCtx.config.FONT_SIZE}px`, '--font-zoom': `${pageCtx.config.FONT_SIZE / DEFAULTS.FONT_SIZE}`}}
    >
      {pageCtx.render}
      {showIntroduction && introLayer}
    </section>
  )
}

export default PageRoot
