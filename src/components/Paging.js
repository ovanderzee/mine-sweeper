import { useContext, useEffect } from 'react'
import Introduction from './UI/Introduction'
import Game from './game/Game'
import PageContext from '../store/page-context'

function Paging() {
  const pageCtx = useContext(PageContext)

  const goToGame = () => {
    pageCtx.navigate(<Game />)
  }

  useEffect(() => {
    pageCtx.navigate(<Introduction onEnd={goToGame} />)
  // eslint-disable-next-line
  }, [])

  return (
    <>
      {pageCtx.render}
    </>
  )
}

export default Paging
