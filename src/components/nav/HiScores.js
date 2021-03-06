import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HallOfFame from '../meta/HallOfFame'
import ChampionsPodium from '../symbols/ChampionsPodium'

const HiScores = (props) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<HallOfFame />)

  return (
    <button type="button" title={text.nav['Hall of Fame']} onClick={showHandler}>
      {props.label ? props.label : <ChampionsPodium />}
    </button>
  )
}

export default HiScores
