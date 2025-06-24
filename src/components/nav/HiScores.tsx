import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HallOfFame from '../meta/HallOfFame'
import { ChampionsPodium } from '../UI/Symbols'
import { CellState } from '../../common/game-types'

interface HiScoresProps {
  board?: CellState[][]
}

export const MinesMinusFlags = (props: HiScoresProps) => {
  const flatBoard = props.board!.flat()
  const mineCount = flatBoard.filter(c => c.fill > 8).length
  const flagCount = flatBoard.filter(c => c.locked).length
  let count = mineCount - flagCount
  if (count) {
    return <span>{count}&times;</span>
  } else {
    return <span>&mdash;</span>
  }
}

const HiScores = (props: HiScoresProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<HallOfFame />)

  return (
    <button type="button" title={text.nav['Hall of Fame']} onClick={showHandler}>
      {props.board ? <MinesMinusFlags board={props.board} /> : <ChampionsPodium />}
    </button>
  )
}

export default HiScores
