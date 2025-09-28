import { act } from '@testing-library/react'
import TimeTracker from './TimeTracker'
import storage from './../../common/storage'
import { microConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState } from './../../__mocks__/game-states'
import { renderInProvider } from './../../__mocks__/render-helpers'

describe('TimeTracker', () => {
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

    it('should track advancing time when game is played (flaky)', () => {
      const playing = {...playingGameState}
      renderInProvider(<TimeTracker game={playing} />)
      const minutes = getMinutesLapsed()
      const seconds = getSecondsLapsed()

      const advanceSecs = 45
      act(() => {
        jest.advanceTimersByTime(advanceSecs * 1000)
      })
      const newSeconds = seconds + advanceSecs
      // keep expected value below 60
      expect(getMinutesLapsed()).toBe(newSeconds < 60 ? minutes : (minutes + 1) % 60)
      // sometimes one second less
      const modulatedSeconds = newSeconds % 60
      expect(getSecondsLapsed()).toBeLessThanOrEqual(modulatedSeconds)
      expect(getSecondsLapsed()).toBeGreaterThanOrEqual(Math.max(modulatedSeconds, 0)) // TODO: Flaky; can receive one to low
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
})
