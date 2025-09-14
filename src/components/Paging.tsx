import Introduction from './UI/Introduction'
import { useContext, useEffect, useState } from 'react'
import Game from './game/Game'
import PageContext from '../store/page-context'
import { flipFocus } from '../common/functions'

function Paging() {
  const pageCtx = useContext(PageContext)
  const [showIntroduction, setShowIntroduction] = useState(false)
  const [pageId, setPageId] = useState('')

  const goToGame = (timeout: number) => {
    pageCtx.navigate(<Game />)
    setTimeout(
      () => setShowIntroduction(false),
      timeout
    )
  }

  useEffect(() => {
    setShowIntroduction(true)
  }, []) // execute once

  useEffect(() => {
    const pageFn = pageCtx.render?.type as Function
    const pageName = pageFn?.name || ''
    setPageId(pageName?.toLowerCase())
  }, [pageCtx.render?.type])

  const introLayer = <Introduction onEnd={goToGame} />

  return (
    <section
      id={pageId}
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
