import { useContext, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageContext from '../../store/page-context'
import { OVERLAY_ELEMENT, FADE_OUT_TIME } from '../../common/constants'
import './Introduction.css'

const Introduction = (props: { onEnd: (timeout: number) => void }) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const [endingClass, setEndingClass] = useState('')
  const { onEnd } = props

  const goToGame = () => {
    setEndingClass('ending')
    onEnd(FADE_OUT_TIME)
  }

  const commonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (commonRef.current) commonRef.current.focus()
  }, [commonRef])

  const animatedHtml = (
    <button
      type="button"
      id="intro"
      className={endingClass}
      onClick={goToGame}
      onAnimationEnd={goToGame}
      onKeyDown={goToGame}
      aria-label="skip to play"
      ref={commonRef}
      tabIndex={-1}
    >
      <div id="achter" />
      <h1 id="titel" className="tekst">
        {text.intro.minesweeper_1}
        <br />
        {text.intro.minesweeper_2}
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
      <small className="tekst">{text.intro.skip_this}</small>
    </button>
  )

  return createPortal(animatedHtml, document.getElementById(OVERLAY_ELEMENT)!)
}

export default Introduction
