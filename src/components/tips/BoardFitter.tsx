import { useContext } from 'react'
import PageContext from '../../store/page-context'
import './Tips.css'

const BoardFitter = () => {
  const pageCtx = useContext(PageContext)
  const { text } = pageCtx

  return (
    <section id="board-fitter" className="tip">
      <button id="contain" type="button" title={text.tips['Contain all cells']}>
        <svg><use href={`#contain-view`} /></svg>
      </button>
      &nbsp;
      <button id="cover" type="button" title={text.tips['Cover with cells']}>
        <svg><use href={`#cover-view`} /></svg>
      </button>
    </section>
  )

}

export default BoardFitter
