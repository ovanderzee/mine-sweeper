import { RefObject, useContext, useEffect, useState } from 'react'
import PageContext from '../../store/page-context'
import { ScreenfullApi } from '../../common/app.d'
import screenfull from '../../common/screenfull'
import './Tips.css'

interface FullscreenPlayProps {
  playgroundRef: RefObject<HTMLElement | null>
}

const FullscreenPlay = (props: FullscreenPlayProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx
  const boardEmSize = 25 // 23 + padding
  const boardPxSize = boardEmSize * config.FONT_SIZE
  const sizeObject = () => document.fullscreenElement ?? document.documentElement
  const playground = props.playgroundRef.current
  const [magnification, setMagnification] = useState(1)
  let sf: ScreenfullApi

  const setFit = () => {
    if (!playground) return
    playground.style.fontSize = magnification * config.FONT_SIZE + 'px'
  }

  const fitToNeed = (spaceToFill: number) => {
    setMagnification(spaceToFill / boardPxSize)
    setFit()
  }

  const fitToContain = () => {
    if (!playground) return
    playground.classList.add('contain')
    playground.classList.remove('cover')
    const smallestPxSize = Math.min(sizeObject().clientWidth, sizeObject().clientHeight)
    fitToNeed(smallestPxSize)
  }

  const fitToCover = () => {
    if (!playground) return
    playground.classList.add('cover')
    playground.classList.remove('contain')
    const biggestPxSize = Math.max(sizeObject().clientWidth, sizeObject().clientHeight)
    fitToNeed(biggestPxSize)
  }

  const resetFit = () => {
    playground?.classList.remove('contain', 'cover')
    setMagnification(1)
    setFit()
  }

  setFit()

  sf = screenfull(props.playgroundRef.current, fitToContain, resetFit)

  useEffect(() => {
    // on destroy
    return () => {
      sf.isFullscreen() && sf.exitFullscreen()
      sf.removeFullscreenChangeEvent()
    }
  }, [])

  useEffect(() => {
    sf = screenfull(props.playgroundRef.current, fitToContain, resetFit)
    sf.addFullscreenChangeEvent()

    return () => {
      sf.removeFullscreenChangeEvent()
    }
  }, [playground])

  const fullscreenView = <>
    <button id="contain-fit" type="button"
      onClick={fitToContain}
      title={text.tips['Contain all cells']}
    >
      <svg><use href="#contain-view" /></svg>
    </button>
    <button id="cover-fit" type="button"
      onClick={fitToCover}
      title={text.tips['Cover with cells']}
    >
      <svg><use href="#cover-view" /></svg>
    </button>
    <button id="reset-fit" type="button"
      onClick={resetFit}
      title={text.tips['Revert magnification']}
    >
      <svg><use href="#revert-view" /></svg>
    </button>
    <button id="window-mode" type="button"
      onClick={sf && sf.exitFullscreen}
    >
      <svg><use href="#to-window" /></svg>
    </button>
  </>

  const windowedView = (
    <button id="fullscreen-mode" type="button"
      onClick={sf && sf.enterFullscreen}
    >
      <svg><use href="#to-fullscreen" /></svg>
    </button>
  )

  return (
    <section id="fullscreen-play" className="tip">
      {sf && sf.isFullscreen() ? fullscreenView : windowedView}
    </section>
  )
}

export default FullscreenPlay
