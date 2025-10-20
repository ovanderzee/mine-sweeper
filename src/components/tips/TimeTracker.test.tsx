import { vi } from 'vitest'
import TimeTracker from './TimeTracker'
import storage from './../../common/storage'
import { microConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState } from './../../__mocks__/game-states'
import { renderInProvider } from './../../__mocks__/render-helpers'

describe('TimeTracker', () => {
  describe('digital clock', () => {
    const getDisplayedMinutes = () => Number(document.querySelector('#minute')?.textContent)
    const getDisplayedSeconds = () => Number(document.querySelector('#second')?.textContent)

    beforeEach(() => {
      storage.config = microConfig
    })

    it('should not start before game is played', () => {
      renderInProvider(<TimeTracker game={newGameState} />)
      expect(getDisplayedMinutes()).toBe(0)
      expect(getDisplayedSeconds()).toBe(0)

      // and stay the same
      vi.advanceTimersByTime(200)

      expect(getDisplayedMinutes()).toBe(0)
      expect(getDisplayedSeconds()).toBe(0)
    })

    it.skip('should track advancing time when game is played (flaky)', () => {
      const playing = {...playingGameState}
      renderInProvider(<TimeTracker game={playing} />)
      const minutes = getDisplayedMinutes()
      const seconds = getDisplayedSeconds()

      const advanceSecs = 45
      vi.advanceTimersByTimeAsync(advanceSecs * 1000)

      const newSeconds = seconds + advanceSecs
      // keep expected value below 60
      expect(getDisplayedMinutes()).toBe(newSeconds < 60 ? minutes : (minutes + 1) % 60)
      // sometimes one second less
      const modulatedSeconds = newSeconds % 60
      expect(getDisplayedSeconds()).toBeLessThanOrEqual(modulatedSeconds)
      expect(getDisplayedSeconds()).toBeGreaterThanOrEqual(Math.max(modulatedSeconds, 0)) // TODO: Flaky; can receive one to low
    })

    it('should not advance time when game has ended', () => {
      renderInProvider(<TimeTracker game={lostGameState} />)
      const minutes = 3
      const seconds = 50
      expect(getDisplayedMinutes()).toBe(minutes)
      expect(getDisplayedSeconds()).toBe(seconds)

      // and stay the same
      vi.advanceTimersByTime(200)
      expect(getDisplayedMinutes()).toBe(minutes)
      expect(getDisplayedSeconds()).toBe(seconds)
    })
  })
})
