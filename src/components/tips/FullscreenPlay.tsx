import { RefObject, useContext, useEffect, useRef, useState } from 'react'
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
  const sfRef = useRef<ScreenfullApi | null>(null)

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

  useEffect(() => {
    // on destroy
    return () => {
      if (sfRef?.current?.isFullscreen()) {
        sfRef?.current?.removeFullscreenChangeEvent()
      }
    }
  }, [])

  useEffect(() => {
    if (playground) {
      sfRef.current = screenfull(props.playgroundRef.current, fitToContain, resetFit)
      sfRef?.current.addFullscreenChangeEvent()
    }
    return () => {
      sfRef?.current?.removeFullscreenChangeEvent()
    }
  }, [playground, sfRef])

  const fullscreenView = <>
    <button id="contain-fit" type="button"
      onClick={fitToContain}
      title={text.tips['Contain all cells']}
    >
      <svg role="img" aria-label={text.icon['contain']}><use href="#contain-view" /></svg>
    </button>
    <button id="cover-fit" type="button"
      onClick={fitToCover}
      title={text.tips['Cover with cells']}
    >
      <svg role="img" aria-label={text.icon['cover']}><use href="#cover-view" /></svg>
    </button>
    <button id="window-mode" type="button"
      title={text.tips['Return to window']}
      onClick={sfRef?.current ? sfRef?.current.exitFullscreen : ()=>{console.error('no window toggle')}}
    >
      <svg role="img" aria-label={text.icon['windowed']} overflow="visible"><use href="#to-window" /></svg>
    </button>
  </>

  const windowedView = (
    <button id="fullscreen-mode" type="button"
      title={text.tips['View fullscreen']}
      onClick={sfRef?.current ? sfRef?.current.enterFullscreen : ()=>{console.error('no fullscreen toggle')}}
    >
      <svg role="img" aria-label={text.icon['fullscreen']} overflow="visible"><use href="#to-fullscreen" /></svg>
    </button>
  )

  return (
    <section id="fullscreen-play" className="tip">
      {sfRef?.current?.isFullscreen() ? fullscreenView : windowedView}
    </section>
  )
}

export default FullscreenPlay
