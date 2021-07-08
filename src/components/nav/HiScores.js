import { useRef } from 'react'
import ChampionsPodium from '../symbols/ChampionsPodium'
import text from '../../common/i18n'

const HiScores = (props) => {
  const label = useRef(props.label ? props.label : <ChampionsPodium />)

  return (
    <button type="button" title={text.nav['Hall of Fame']}>
      {label.current}
    </button>
  )
}

export default HiScores
