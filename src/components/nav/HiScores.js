import { useRef } from 'react'
import text from '../../i18n'

const HiScores = (props) => {
  const championPodium = (
    <>
      <span className="n2">2</span>
      <span className="n1">1</span>
      <span className="n3">3</span>
    </>
  )

  const label = useRef(props.label ? props.label : championPodium)
  return (
    <button type="button" title={text.nav['Hall of Fame']}>
      {label.current}
    </button>
  )
}

export default HiScores
