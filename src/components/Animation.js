import { useContext, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageContext from '../store/page-context'
import { OVERLAY_ELEMENT } from '../common/constants'
import './Animation.css'

const Animation = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [endingClass, setEndingClass] = useState('')
  const cssOpacityTransitionTime = 500
  const { onEnd } = props
  const goToGame = (event) => {
    setEndingClass('ending')
  }

  useEffect(() => {
    endingClass && setTimeout(onEnd, cssOpacityTransitionTime)
  }, [onEnd, endingClass])

  const animatedHtml = (
    <div
      id="anim"
      className={endingClass}
      onClick={goToGame}
      onAnimationEnd={goToGame}
    >
      <div id="achter" />
      <h1 id="titel">
        {text.anim.minesweeper_1}
        <br />
        {text.anim.minesweeper_2}
      </h1>
      <div id="schip">
        <div id="schip__brug"></div>
        <div id="schip__links"></div>
        <div id="schip__rechts"></div>
      </div>
      <div id="knal">
        <div id="scherf1"></div>
        <div id="scherf2"></div>
        <div id="scherf3"></div>
        <div id="scherf4"></div>
        <div id="scherf5"></div>
        <div id="scherf6"></div>
      </div>
      <div id="zeemijn" className="mijn" />
      <div id="rook">
        <div id="rookwolk1" className="donkerst"></div>
        <div id="rookwolk2" className="donkerder"></div>
        <div id="rookwolk3" className="donkerder"></div>
        <div id="rookwolk4" className="normaal"></div>
        <div id="rookwolk5" className="normaal"></div>
        <div id="rookwolk6" className="normaal"></div>
        <div id="rookwolk7" className="lichter"></div>
        <div id="rookwolk8" className="lichter"></div>
        <div id="rookwolk9" className="lichtst"></div>
      </div>
    </div>
  )

  return <>{createPortal(animatedHtml, OVERLAY_ELEMENT)}</>
}

export default Animation
