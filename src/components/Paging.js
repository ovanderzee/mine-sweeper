import Introduction from './UI/Introduction'
import { useContext, useEffect, useState } from 'react'
import Game from './game/Game'
import PageContext from '../store/page-context'

function Paging() {
  const pageCtx = useContext(PageContext)
  const [showIntroduction, setShowIntroduction] = useState(false)

  const goToGame = (timeout) => {
    pageCtx.navigate(<Game />)
    setTimeout(
      () => setShowIntroduction(false),
      timeout
    )
  }

  // execute once
  useEffect(() => {
    setShowIntroduction(true)
  }, [])

  const introLayer = <Introduction onEnd={goToGame} />

  return <>
    {pageCtx.render}
    {showIntroduction && introLayer}
  </>
}

export default Paging
