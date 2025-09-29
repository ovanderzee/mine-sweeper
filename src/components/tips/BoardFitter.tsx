import { useContext } from 'react'
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

const BoardFitter = () => {
  const pageCtx = useContext(PageContext)
  const { text } = pageCtx

  return (
    <section id="board-fitter" className="tip">
      <button id="contain-fit" type="button" title={text.tips['Contain all cells']}>
        <svg><use href="#contain-view" /></svg>
      </button>

      <button id="cover-fit" type="button" title={text.tips['Cover with cells']}>
        <svg><use href="#cover-view" /></svg>
      </button>

      <button id="reset-fit" type="button" title={text.tips['Revert screen']}>
        <svg><use href="#revert-view" /></svg>
      </button>

      <button id="fullscreen-mode" type="button"
        onClick={() => {
          var playground = window.document.querySelector('#playground') as HTMLElement
          enterFullscreen(playground)
            .catch((err: Error) => {
              alert(`Error entering fullscreen mode: ${err.message} (${err.name})`)
            })
        }}
      >
        <svg><use href="#to-fullscreen" /></svg>
      </button>

      <button id="window-mode" type="button"
        onClick={exitFullscreen}
      >
        <svg><use href="#to-window" /></svg>
      </button>
    </section>
  )
}

export default BoardFitter
