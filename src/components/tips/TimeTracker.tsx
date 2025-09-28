import { useContext, useEffect, useState } from 'react'
import PageContext from '../../store/page-context'
import { GameStages } from '../../common/game-types'
import { TipProps } from './Tips'
import './Tips.css'

const TimeTracker = (props: TipProps) => {
  const pageCtx = useContext(PageContext)
  const { text } = pageCtx
  const { stage, tZero, tShift } = props.game

  const [now, setNow] = useState(Date.now())
  const [intv, setIntv] = useState(0)

  useEffect(() => {
    if (stage === GameStages.PLAYING) {
      setIntv(window.setInterval(() => setNow(Date.now()), 33))
    } else {
      clearInterval(intv)
    }
  }, [stage])

  const timeFormat = () => {
    let tLast = now
    if (stage !== GameStages.PLAYING) {
      tLast = tShift
    }

    if (stage === GameStages.NEW) {
      return { min: 0, sec: 0 }
    } else {
      let tFrame = tLast - tZero
      const ms = tFrame % 1000
      tFrame = (tFrame - ms) / 1000
      const sec = tFrame % 60
      tFrame = (tFrame - sec) / 60
      const min = tFrame % 60
      return { min, sec }
    }
  }

  const {min, sec} = timeFormat()
  const padded = (nr: number) => nr.toString().padStart(2, "0")

  return (
    <section id="time-tracker" className="tip" title={text.tips['Playtime']}>
      <span id="minute">{padded(min)}</span>:<span id="second">{padded(sec)}</span>
    </section>
  )
}

export default TimeTracker
