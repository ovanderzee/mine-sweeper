import Introduction from './UI/Introduction'
import { useContext, useEffect, useState } from 'react'
import Game from './game/Game'
import PageContext from '../store/page-context'

function Paging() {
  const pageCtx = useContext(PageContext)
  const [showIntroduction, setShowIntroduction] = useState(false)

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

  const introLayer = <Introduction onEnd={goToGame} />

  return <>
    {pageCtx.render}
    {showIntroduction && introLayer}
  </>
}

export default Paging
