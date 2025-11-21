import { useContext, useEffect, useRef, useState } from 'react'
import PageContext from '../../store/page-context'
import { ScreenfullApi } from '../../common/app.d'
import screenfull from '../../common/screenfull'
import './Tips.css'

interface FullscreenPlayProps {
  setPlaygroundFit: (arg: string) => void
}

type ViewStateTuple = 'windowed' | 'fullscreen'

const FullscreenPlay = (props: FullscreenPlayProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx
  const boardEmSize = 24.5 // 23 + padding
  const boardPxSize = boardEmSize * config.FONT_SIZE
  const playgroundRef = useRef<HTMLElement | null>(null)
  const [magnification, setMagnification] = useState(1)
  const setPlaygroundFit = props.setPlaygroundFit
  const sfRef = useRef<ScreenfullApi | null>(null)

  useEffect(() => {
    playgroundRef.current = document.getElementById('playground')

    // on destroy
    return () => {
      if (sfRef?.current?.isFullscreen()) {
        sfRef?.current?.removeFullscreenChangeEvent()
      }
    }
  }, [])

  useEffect(() => {
    if (!playgroundRef.current) return
    playgroundRef.current.style.fontSize = magnification * config.FONT_SIZE + 'px'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnification])

  const fitToNeed = (spaceToFill: number) => {
    setMagnification(spaceToFill / boardPxSize)
  }

  const fitToContain = () => {
    if (!playgroundRef.current) return
    setPlaygroundFit('contain-screen')
    const smallestPxSize = Math.min(screen.availWidth, screen.availHeight)
    fitToNeed(smallestPxSize)
  }

  const fitToCover = () => {
    if (!playgroundRef.current) return
    setPlaygroundFit('cover-screen')
    const biggestPxSize = Math.max(screen.availWidth, screen.availHeight)
    fitToNeed(biggestPxSize)
  }

  const resetFit = () => {
    setPlaygroundFit('')
    setMagnification(1)
  }

  useEffect(() => {
    if (playgroundRef.current) {
      sfRef.current = screenfull(playgroundRef.current, fitToContain, resetFit)
      sfRef?.current.addFullscreenChangeEvent()
    }
    return () => {
      sfRef?.current?.removeFullscreenChangeEvent()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playgroundRef])

  const [toViewState, setToViewState] = useState<ViewStateTuple>()

  useEffect(() => {
    if (toViewState === 'windowed' && document.fullscreenElement) {
      sfRef?.current?.exitFullscreen() ?? console.error('no window toggle')
    } else if (toViewState === 'fullscreen' && !document.fullscreenElement) {
      sfRef?.current?.enterFullscreen() ?? console.error('no fullscreen toggle')
    }
  }, [toViewState])

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
      onClick={()=>setToViewState('windowed')}
    >
      <svg role="img" aria-label={text.icon['windowed']} overflow="visible"><use href="#to-window" /></svg>
    </button>
  </>

  const windowedView = (
    <button id="fullscreen-mode" type="button"
      title={text.tips['View fullscreen']}
      onClick={()=>setToViewState('fullscreen')}
    >
      <svg role="img" aria-label={text.icon['fullscreen']} overflow="visible"><use href="#to-fullscreen" /></svg>
    </button>
  )

  return (
    <section id="fullscreen-play" className="tip">
      {document.fullscreenElement ? fullscreenView : windowedView}
    </section>
  )
}

export default FullscreenPlay
