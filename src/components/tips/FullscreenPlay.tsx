import { RefObject, useContext, useEffect, useRef } from 'react'
import PageContext from '../../store/page-context'
import { ScreenfullApi, BoardFit } from '../../common/app.d'
import screenfull, { isFullscreenAble } from '../../common/screenfull'
import { NORMAL } from '../../common/defaults'
import './Tips.css'

interface FullscreenPlayProps {
  playgroundRef: RefObject<HTMLDivElement>
}

const FullscreenPlay = (props: FullscreenPlayProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx
  const boardEmSize = 24.5 // 23 + padding
  const boardPxSize = boardEmSize * config.FONT_SIZE
  const canvasSizes = () => document.fullscreenElement
    ? [screen.availWidth, screen.availHeight]
    : [document.documentElement.clientWidth, document.documentElement.clientHeight]
  const playground = props.playgroundRef.current
  const sfRef = useRef<ScreenfullApi | null>(null)

  useEffect(() => {
    // on destroy
    return () => {
      if (sfRef?.current?.isFullscreen()) {
        sfRef?.current?.removeFullscreenChangeEvent()
      }
    }
  }, [])

  const fitToNeed = (spaceToFill: number, fitLabel: BoardFit) => {
    const factor = spaceToFill / boardPxSize
    pageCtx.updSession({ MAGNIFICATION: factor, BOARD_FIT: fitLabel })
  }

  const fitToContain = () => {
    const smallestPxSize = Math.min(...canvasSizes())
    fitToNeed(smallestPxSize, BoardFit.CONTAIN)
  }

  const fitToCover = () => {
    const biggestPxSize = Math.max(...canvasSizes())
    fitToNeed(biggestPxSize, BoardFit.COVER)
  }

  const resetFit = () => {
    pageCtx.updSession( NORMAL )
  }

  useEffect(() => {
    sfRef.current = screenfull(playground, fitToContain, resetFit)
    sfRef?.current.addFullscreenChangeEvent()

    return () => {
      sfRef?.current?.removeFullscreenChangeEvent()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playground])

  const changeViewState = () => {
    if (document.fullscreenElement) {
      sfRef?.current?.exitFullscreen() ?? console.error('no window toggle')
    } else if (!document.fullscreenElement) {
      sfRef?.current?.enterFullscreen() ?? console.error('no fullscreen toggle')
    }
  }

  const fullscreenView = <>
    <button id="window-mode" type="button"
      title={text.tips['Return to window']}
      onClick={()=>changeViewState()}
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
        onClick={()=>changeViewState()}
      >
        <svg role="img" aria-label={text.icon['fullscreen']} overflow="visible"><use href="#to-fullscreen" /></svg>
      </button>
    }
  </>)

  return (
    <div id="fullscreen-play" className="tip">
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
    </div>
  )
}

export default FullscreenPlay
