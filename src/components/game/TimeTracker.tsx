import { useContext, useEffect, useState } from 'react'
import PageContext from '../../store/page-context'
import { ClockTypes } from '../../common/app-types'
import { GameState, GameStages } from '../../common/game-types'
import './TimeTracker.css'

interface TimeTrackerProps {
  game: GameState;
}

const TimeTracker = (props: TimeTrackerProps) => {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx
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

  const analogClock = (
    <section className="time-tracker analogue">
      <div id="minute" data-minute={min}
        style={{transform: `rotate( ${(min % 12) * 360 / 12}deg )`}}
      ></div>
      <div id="second" data-second={sec}
        style={{transform: `rotate( ${(sec % 60) * 360 / 60}deg )`}}
      ></div>
    </section>
  )

// analog als svg (en wijzers vloeiend laten draainen )

  const digitalClock = (
    <section className="time-tracker digital" title={text.game['playtime']}>
      <span id="minute">{padded(min)}</span>:<span id="second">{padded(sec)}</span>
    </section>
  )

  switch (config.CLOCK_TYPE) {
    case ClockTypes.ANALOG:
      return analogClock
    case ClockTypes.DIGITAL:
      return digitalClock
    default:
      return null
  }
}

export default TimeTracker
