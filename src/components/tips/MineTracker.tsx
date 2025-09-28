import { useContext } from 'react'
import PageContext from '../../store/page-context'
import { TipProps } from './Tips'
import './Tips.css'

const MineTracker = (props: TipProps) => {
  const pageCtx = useContext(PageContext)
  const { text } = pageCtx

  const flatBoard = props.game.board!.flat()
  const mineCount = flatBoard.filter(c => c.fill > 8).length
  const flagCount = flatBoard.filter(c => c.locked).length

  return (
    <section id="mine-tracker" className="tip" title={text.tips['Todo counter']}>
      <span id="mine" className="icon"></span>
      <span id="diff">{mineCount - flagCount}</span>
      <span id="flag" className="icon"></span>
    </section>
  )
}

export default MineTracker
