import { RefObject, useContext, useEffect, useState } from 'react'
import PageContext from '../../store/page-context'
import { ScreenfullApi } from '../../common/app.d'
import screenfull from '../../common/screenfull'
import './Tips.css'

interface FullscreenPlayProps {
  playgroundRef: RefObject<HTMLElement | null>
  setPlaygroundFit: (arg: string) => void
}

const FullscreenPlay = (props: FullscreenPlayProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx
  const boardEmSize = 24.5 // 23 + padding
  const boardPxSize = boardEmSize * config.FONT_SIZE
  const playground = props.playgroundRef.current
  const [magnification, setMagnification] = useState(1)
  const setPlaygroundFit = props.setPlaygroundFit
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
    setPlaygroundFit('contain-screen')
    const smallestPxSize = Math.min(screen.availWidth, screen.availHeight)
    fitToNeed(smallestPxSize)
  }

  const fitToCover = () => {
    if (!playground) return
    setPlaygroundFit('cover-screen')
    const biggestPxSize = Math.max(screen.availWidth, screen.availHeight)
    fitToNeed(biggestPxSize)
  }

  const resetFit = () => {
    setPlaygroundFit('')
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
    <button id="window-mode" type="button"
      title={text.tips['Return to window']}
      onClick={sf && sf.exitFullscreen}
    >
      <svg overflow="visible"><use href="#to-window" /></svg>
    </button>
  </>

  const windowedView = (
    <button id="fullscreen-mode" type="button"
      title={text.tips['View fullscreen']}
      onClick={sf && sf.enterFullscreen}
    >
      <svg overflow="visible"><use href="#to-fullscreen" /></svg>
    </button>
  )

  return (
    <section id="fullscreen-play" className="tip">
      {sf.isFullscreen() ? fullscreenView : windowedView}
    </section>
  )
}

export default FullscreenPlay
