import Introduction from './UI/Introduction'
import { useContext, useState } from 'react'
import Game from './game/Game'
import PageContext from '../store/page-context'
import { flipFocus } from '../common/functions'

function Paging() {
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

  return (
    <section
      className="screen"
      style={{fontSize: `${pageCtx.config.FONT_SIZE}px`}}
      onKeyDown={flipFocus}
    >
      {pageCtx.render}
      {showIntroduction && introLayer}
    </section>
  )
}

export default Paging
