import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import './GameCellDemo.css'
import '../meta/Meta.css'

const inDevelopment = window.location.hostname === 'localhost'

const GameCellDemoWatch = () => {
  return (
    <span className="watch" style={{'fontSize': '125%', 'position': 'relative', 'top': '.05em'}}>
      &#x23ff;
    </span>
  )
}

const GameCellDemoNav = () => {
  const pageCtx = useContext(PageContext)
  const watchHandler = () => pageCtx.navigate(<GameCellDemo />)

  const navButton = <button type="button" title="Cell State Demo" onClick={watchHandler}>
      <GameCellDemoWatch />
    </button>

  return inDevelopment && navButton
}

const GameCellDemo = () => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const [activatedClass, setActivatedClass] = useState('explode')

  const explodeHandler = () => {
    setActivatedClass('')
    setTimeout(
      () => setActivatedClass('explode'),
      50
    )
  }

  /*
    Playing Stage
    Flags can be set to spot possible mines.
    Pristine cells do not show anything, no mine location hints, no mine classes
    Touched calls reveal numeric mine location hints
  */
  const playing = <div className="game-playing">
    <label>Game Playing</label>
    <article id="playground" className="board-size__6" style={{'--board-size': 6}}>
        <button type="button" className="pristine" id="row0col0" style={{'--cell-row': 1, '--cell-col': 1}}></button>
        <button type="button" className="touched" id="row0col1" style={{'--cell-row': 1, '--cell-col': 2}}></button>
        <button type="button" className="pristine flag" id="row0col2" style={{'--cell-row': 1, '--cell-col': 3}}></button>
        <button type="button" className="touched" id="row0col3" style={{'--cell-row': 1, '--cell-col': 4}}>1</button>
    </article>
  </div>

  /*
    Lost Stage
    You loose when a mine is clicked
    Hence the exploded mine can not have a flag
    When you loose:
        pristine class cells are reclassified touched.
        mines are classifiesd as 'mijn'
        the clicked mine is also classified as explode
  */
  const lost = <div className="game-lost">
    <label>Game Lost</label>
    <article id="playground" className="board-size__6" style={{'--board-size': 6}}>

        <button type="button" className="touched mijn" id="row0col1" style={{'--cell-row': 1, '--cell-col': 1}}></button>
        <button type="button" className="touched mijn flag" id="row0col2" style={{'--cell-row': 1, '--cell-col': 2}}></button>
        <button type="button" className={`touched mijn ${activatedClass}`} onClick={explodeHandler}
            id="row0col3" style={{'--cell-row': 1, '--cell-col': 3}}>
          <span className="burst"></span>
        </button>
        <button type="button" className={`touched mijn flag ${activatedClass}`} onClick={explodeHandler}
            id="row0col4" style={{'--cell-row': 1, '--cell-col': 4}}>
          <span className="burst"></span>
        </button>
        <button type="button" className="touched" id="row1col0" style={{'--cell-row': 2, '--cell-col': 1}}></button>
        <button type="button" className="touched" id="row1col1" style={{'--cell-row': 2, '--cell-col': 2}}>1</button>
        <button type="button" className="touched flag" id="row1col2" style={{'--cell-row': 2, '--cell-col': 3}}>1</button>
    </article>
  </div>

  /*
    Won Stage
    You win when all pristines are mines and no mines were clicked
    Because a flag locks the cell, you can not win with a flag on a non-mine
    When you win:
        pristine class cells are reclassified touched.
        mines become classified as 'mijn'
  */
  const won = <div className="game-won">
    <label>Game Won</label>
    <article id="playground" className="board-size__6" style={{'--board-size': 6}}>
        <button type="button" className="touched" id="row0col0" style={{'--cell-row': 1, '--cell-col': 1}}></button>
        <button type="button" className="touched" id="row0col1" style={{'--cell-row': 1, '--cell-col': 2}}>1</button>
        <button type="button" className="touched mijn" id="row0col2" style={{'--cell-row': 1, '--cell-col': 3}}></button>
        <button type="button" className="touched mijn flag" id="row0col3" style={{'--cell-row': 1, '--cell-col': 4}}></button>
    </article>
  </div>

  const stateColors = <div className="css-colors">
    <div style={{'background': 'var(--state-green)'}}>state-green</div>
    <div style={{'background': 'var(--state-red)'}}>state-red</div>
  </div>

  const fireColors = <div className="css-colors" style={{'display': 'flex'}}>
    <div style={{'background': 'var(--fire-yellow)'}}>fire-yellow</div>
    <div style={{'background': 'var(--fire-orange)'}}>fire-orange</div>
    <div style={{'background': 'var(--fire-red)'}}>fire-red</div>
    <div style={{'background': 'var(--fire-blue)'}}>fire-blue</div>
  </div>

  return (
    <section
      className="screen"
      style={{ fontSize: `${FONT_SIZE}px`, lineHeight: 'initial' }}
    >
      <article id="playground">
        {playing}
        {lost}
        {won}
        {stateColors}
        {fireColors}
      </article>
      <nav>
        <Settings />
        <GoBack />
      </nav>
    </section>
  )
}

export default GameCellDemoNav
