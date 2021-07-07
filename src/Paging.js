import { useContext } from 'react'
import Animation from './components/Animation'
import Game from './components/game/Game'
import PageContext from './store/page-context'

function Paging() {
  const pageCtx = useContext(PageContext)

  const goToGame = () => {
    pageCtx.navigate(<Game />)
  }

  if (!pageCtx.render) {
    pageCtx.navigate(<Animation onEnd={goToGame} />)
  }

  return (
    <>
      {pageCtx.render}
    </>
  )
}

export default Paging
