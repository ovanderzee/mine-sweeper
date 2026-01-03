import React, { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import './GameCellDemo.css'
import './Meta.css'

const devMatch = /^(localhost|\d+\.\d+\.\d+\.\d+)$/
const inDevelopment = window.location.hostname.match(devMatch)

const GameCellDemoNav = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const watchHandler = () => pageCtx.navigate(<GameCellDemo />)

  const navButton = <button type="button" className="nav-option" title="Cell State Demo" onClick={watchHandler}>
      <svg role="img" aria-label={text.icon['eye']}><use href={`#nav-eye`} /></svg>
    </button>

  return inDevelopment && navButton
}

const GameCellDemo = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
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
    <article id="playground" className="board-size__6" style={{'--board-size': 6} as React.CSSProperties}>
      <div id="game-board">
        <button type="button" className="pristine" id="row0col0"></button>
        <button type="button" className="touched" id="row0col1"></button>
        <button type="button" className="pristine flag" id="row0col2"></button>
        <button type="button" className="touched" id="row0col3">1</button>
      </div>
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
  const lost = <div>
    <label>Game Lost</label>
    <article id="playground" className="board-size__6 game-lost" style={{'--board-size': 6} as React.CSSProperties}>
      <div id="game-board">
        <button type="button" className="touched mijn" id="row0col1"></button>
        <button type="button" className="touched mijn flag" id="row0col2"></button>
        <button type="button" className={`touched mijn ${activatedClass}`} onClick={explodeHandler}
            id="row0col3">
          <span className="burst"></span>
        </button>
        <button type="button" className={`touched mijn flag ${activatedClass}`} onClick={explodeHandler}
            id="row0col4">
          <span className="burst"></span>
        </button>
        <button type="button" className="touched" id="row1col0"></button>
        <button type="button" className="touched" id="row1col1">1</button>
        <button type="button" className="touched flag" id="row1col2">1</button>
      </div>
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
  const won = <>
    <label>Game Won</label>
    <article id="playground" className="board-size__6 game-won" style={{'--board-size': 6} as React.CSSProperties}>
      <div id="game-board">
        <button type="button" className="touched" id="row0col0"></button>
        <button type="button" className="touched" id="row0col1">1</button>
        <button type="button" className="touched mijn" id="row0col2"></button>
        <button type="button" className="touched mijn flag" id="row0col3"></button>
      </div>
    </article>
  </>

  const stateColors = <div className="css-colors">
    <div style={{'background': 'var(--state-green)'} as React.CSSProperties}>state-green</div>
    <div style={{'background': 'var(--state-red)'} as React.CSSProperties}>state-red</div>
  </div>

  const fireColors = <div className="css-colors">
    <div style={{'background': 'var(--fire-yellow)'}}>fire-yellow</div>
    <div style={{'background': 'var(--fire-yellorange)'}}>fire-yellorange</div>
    <div style={{'background': 'var(--fire-orange)'}}>fire-orange</div>
    <div style={{'background': 'var(--fire-red)'}}>fire-red</div>
    <div style={{'background': 'var(--fire-blue)'}}>fire-blue</div>
  </div>

  const pristineColors = <div className="css-colors">
    <div style={{'background': 'var(--light-pristine)'}}>light-pristine</div>
    <div style={{'background': 'var(--medium-pristine)'}}>medium-pristine</div>
    <div style={{'background': 'var(--dark-pristine)'}}>dark-pristine</div>
  </div>

  const touchedColors = <div className="css-colors">
    <div style={{'background': 'var(--light-touched)'}}>light-touched</div>
    <div style={{'background': 'var(--medium-touched)'}}>medium-touched</div>
    <div style={{'background': 'var(--dark-touched)'}}>dark-touched</div>
  </div>

  const fnSymbols = <div className="svg-symbols">
    <svg role="img" aria-label={text.icon['play']}><use href={`#nav-play`} /></svg>
    <svg role="img" aria-label={text.icon['cw-revolving']}><use href={`#nav-replay`} /></svg>
    <svg role="img" aria-label={text.icon['ccw-revolving']}><use href={`#nav-reset`} /></svg>
    <svg role="img" aria-label={text.icon['empty set']}><use href={`#nav-empty`} /></svg>
  </div>

  const navSymbols = <div className="svg-symbols">
    <svg role="img" aria-label={text.icon['return']}><use href={`#nav-return`} /></svg>
    <svg role="img" aria-label={text.icon['sliders']}><use href={`#nav-sliders`} /></svg>
    <svg role="img" aria-label={text.icon['question']}><use href={`#nav-question`} /></svg>
    <svg role="img" aria-label={text.icon['podium']}><use href={`#nav-podium`} /></svg>
    <svg role="img" aria-label={text.icon['eye']}><use href={`#nav-eye`} /></svg>
  </div>

  return (
    <>
      <article id="playground" role="main">
        {playing}
        {lost}
        {won}
        {stateColors}
        {fireColors}
        {pristineColors}
        {touchedColors}
        {fnSymbols}
        {navSymbols}
      </article>
      <NavOptionsBar>
        <Settings />
        <GoBack />
      </NavOptionsBar>
    </>
  )
}

export default GameCellDemoNav
