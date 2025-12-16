import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import PageContext from '../../store/page-context'
import { ScreenfullApi } from '../../common/app.d'
import screenfull, { isFullscreenAble } from '../../common/screenfull'
import './Tips.css'

interface FullscreenPlayProps {
  playgroundRef: RefObject<HTMLElement | null>
}

type ViewStateTuple = 'windowed' | 'fullscreen'

const FullscreenPlay = (props: FullscreenPlayProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx
  const boardEmSize = 24.5 // 23 + padding
  const boardPxSize = boardEmSize * config.FONT_SIZE
  const canvasSizes = () => document.fullscreenElement
    ? [screen.availWidth, screen.availHeight]
    : [document.documentElement.clientWidth, document.documentElement.clientHeight]
  const playground = props.playgroundRef.current
  const [magnification, setMagnification] = useState(1)
  const sfRef = useRef<ScreenfullApi | null>(null)

  useEffect(() => {
    // on destroy
    return () => {
      if (sfRef?.current?.isFullscreen()) {
        sfRef?.current?.removeFullscreenChangeEvent()
      }
    }
  }, [])

  useEffect(() => {
    if (!playground) return
    playground.style.fontSize = magnification * config.FONT_SIZE + 'px'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnification])

  const fitToNeed = (spaceToFill: number) => {
    setMagnification(spaceToFill / boardPxSize)
  }

  const fitToContain = () => {
    playground?.classList.add('contain-screen')
    playground?.classList.remove('cover-screen')
    const smallestPxSize = Math.min(...canvasSizes())
    fitToNeed(smallestPxSize)
  }

  const fitToCover = () => {
    playground?.classList.add('cover-screen')
    playground?.classList.remove('contain-screen')
    const biggestPxSize = Math.max(...canvasSizes())
    fitToNeed(biggestPxSize)
  }

  const resetFit = () => {
    playground?.classList.remove('contain-screen', 'cover-screen')
    setMagnification(1)
  }

  useEffect(() => {
    sfRef.current = screenfull(playground, fitToContain, resetFit)
    sfRef?.current.addFullscreenChangeEvent()

    return () => {
      sfRef?.current?.removeFullscreenChangeEvent()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playground])

  const [toViewState, setToViewState] = useState<ViewStateTuple>()

  useEffect(() => {
    if (toViewState === 'windowed' && document.fullscreenElement) {
      sfRef?.current?.exitFullscreen() ?? console.error('no window toggle')
    } else if (toViewState === 'fullscreen' && !document.fullscreenElement) {
      sfRef?.current?.enterFullscreen() ?? console.error('no fullscreen toggle')
    }
  }, [toViewState])

  const fullscreenView = <>
    <button id="window-mode" type="button"
      title={text.tips['Return to window']}
      onClick={()=>setToViewState('windowed')}
    >
      <svg role="img" aria-label={text.icon['windowed']} overflow="visible"><use href="#to-window" /></svg>
    </button>
  </>

  const windowedView = (<>
    <button id="reset-fit" type="button"
      onClick={resetFit}
      title={text.tips['Revert magnification']}
    >
      <svg><use href="#revert-view" /></svg>
    </button>

    {isFullscreenAble() &&
      <button id="fullscreen-mode" type="button"
        title={text.tips['View fullscreen']}
        onClick={()=>setToViewState('fullscreen')}
      >
        <svg role="img" aria-label={text.icon['fullscreen']} overflow="visible"><use href="#to-fullscreen" /></svg>
      </button>
    }
  </>)

  return (
    <section id="fullscreen-play" className="tip">
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
      {document.fullscreenElement ? fullscreenView : windowedView}
    </section>
  )
}

export default FullscreenPlay
