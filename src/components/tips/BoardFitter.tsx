import { RefObject, useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import './Tips.css'

const enterFullscreen = async (elem: HTMLElement): Promise<void> => {
  if (elem.requestFullscreen) {elem.requestFullscreen()}
  // @ts-ignore
  else if (elem?.mozRequestFullScreen) {elem.mozRequestFullScreen()}
  // @ts-ignore
  else if (elem?.msRequestFullscreen) {elem.msRequestFullscreen()}
  // @ts-ignore
  else if (elem?.webkitRequestFullscreen) {elem.webkitRequestFullscreen()}
}

const exitFullscreen = async (): Promise<void> => {
  if (document?.exitFullscreen) {document.exitFullscreen()}
  // @ts-ignore}
  else if (document?.mozCancelFullScreen) {document.mozCancelFullScreen()}
  // @ts-ignore
  else if (document?.msExitFullscreen) {document.msExitFullscreen()}
  // @ts-ignore
  else if (document?.webkitExitFullscreen) {document.webkitExitFullscreen()}
}

interface BoardFitterProps {
  playgroundRef: RefObject<HTMLElement | null>
}

const BoardFitter = (props: BoardFitterProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx

// functies in een module
// verstoppen bord en infaden bij enter en exit
// achtergrond met verloopje
// resetFit en fitToCover in event handler

  const boardEmSize = 25 // 23 + padding
  const boardPxSize = boardEmSize * config.FONT_SIZE
  const sizeObject = () => document.fullscreenElement ?? document.documentElement
  const playground = props.playgroundRef.current

  const [magnification, setMagnification] = useState(1)

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

  return (
    <section id="board-fitter" className="tip">
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

      <button id="fullscreen-mode" type="button"
        onClick={() => {
          if (!playground) return
          enterFullscreen(playground)
            .then(() => fitToContain())
            .catch((err: Error) => {
              alert(`Error entering fullscreen mode: ${err.message} (${err.name})`)
            })
        }}
      >
        <svg><use href="#to-fullscreen" /></svg>
      </button>

      <button id="window-mode" type="button"
        onClick={() => exitFullscreen().then(resetFit)}
      >
        <svg><use href="#to-window" /></svg>
      </button>
    </section>
  )
}

export default BoardFitter
