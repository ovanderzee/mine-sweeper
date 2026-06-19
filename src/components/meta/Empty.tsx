import { useContext } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import Game from '../game/Game'
import GoBack from '../nav/GoBack'
import './Meta.css'
import './Empty.css'

const Empty = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const emptyContent = (
    <article
      id="pausing"
      role="main"
      aria-labelledby="page-heading"
    >
      <h1 className="sr-only" id="page-heading">{text.nav['Pause']}</h1>
      <div id="game-board">
        <button type="button"
          onClick={() => pageCtx.navigate(<Game />)}
          title={text.nav['Resume']}
        >
          <img src="./artwork/bomb.svg" />
        </button>
      </div>
    </article>
  )

  const emptyNavigation = (
    <NavOptionsBar>
      <GoBack />
    </NavOptionsBar>
  )

  return (
    <>
      {emptyContent}
      {emptyNavigation}
    </>
  )
}

export default Empty
