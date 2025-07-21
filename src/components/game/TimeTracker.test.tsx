import { act } from '@testing-library/react'
import TimeTracker from './TimeTracker'
import { ClockTypes } from './../../common/app-types'
import storage from './../../common/storage'
import { microConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState } from './../../__mocks__/game-states'
import { renderInProvider } from './../../__mocks__/render-helpers'

describe('TimeTracker', () => {
  beforeEach(() => {
    act(() => {
      jest.useFakeTimers({timerLimit: 5000})
    })
  })

  afterEach(() => {
    act(() => {
      jest.useRealTimers()
    })
  })

  describe('digital clock', () => {
    const getMinutesLapsed = () => Number(document.querySelector('#minute')?.textContent)
    const getSecondsLapsed = () => Number(document.querySelector('#second')?.textContent)

    beforeEach(() => {
      storage.config = microConfig
    })

    it('should not start before game is played', () => {
      renderInProvider(<TimeTracker game={newGameState} />)
      expect(getMinutesLapsed()).toBe(0)
      expect(getSecondsLapsed()).toBe(0)

      // and stay the same
      act(() => {
        jest.advanceTimersByTime(200)
      })
      expect(getMinutesLapsed()).toBe(0)
      expect(getSecondsLapsed()).toBe(0)
    })

    it('should track advancing time when game is played', () => {
      const playing = {...playingGameState}
      renderInProvider(<TimeTracker game={playing} />)
      const minutes = getMinutesLapsed()
      const seconds = getSecondsLapsed()

      const advanceSecs = 45
      act(() => {
        jest.advanceTimersByTime(advanceSecs * 1000)
      })
      const newSeconds = seconds + advanceSecs
      expect(getMinutesLapsed()).toBe(newSeconds < 60 ? minutes : minutes + 1)
      expect(getSecondsLapsed()).toBe(newSeconds % 60)
    })

    it('should not advance time when game has ended', () => {
      renderInProvider(<TimeTracker game={lostGameState} />)
      const minutes = 3
      const seconds = 50
      expect(getMinutesLapsed()).toBe(minutes)
      expect(getSecondsLapsed()).toBe(seconds)

      // and stay the same
      act(() => {
        jest.advanceTimersByTime(200)
      })
      expect(getMinutesLapsed()).toBe(minutes)
      expect(getSecondsLapsed()).toBe(seconds)
    })
  })

  describe('analog clock', () => {
    beforeEach(() => {
      storage.config = {...microConfig, CLOCK_TYPE: ClockTypes.ANALOG}
    })

    it('should rotate hands', () => {
      renderInProvider(<TimeTracker game={lostGameState} />)
      // stopped at 3 minutes and 50 seconds
      const minuteHand = document.querySelector('#minutes') as SVGElement
      const secondHand = document.querySelector('#seconds') as SVGElement
      expect(minuteHand.style.transform).toBe('rotate(90deg)')
      expect(secondHand.style.transform).toBe('rotate(300deg)')
    })
  })

  describe('no clock', () => {
    it('should not appear', () => {
      storage.config = {...microConfig, CLOCK_TYPE: ClockTypes.NONE}
      renderInProvider(<TimeTracker game={lostGameState} />)
      const timeTracker = document.querySelector('.time-tracker')
      expect(timeTracker).not.toBeInTheDocument()
    })
  })
})
