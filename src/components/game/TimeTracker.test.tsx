import { act } from '@testing-library/react'
import TimeTracker from './TimeTracker'
import { microConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState } from './../../__mocks__/game-states'
import { renderInProvider } from './../../__mocks__/render-helpers'
import storage from './../../common/storage'

describe('TimeTracker', () => {
  storage.config = microConfig
  const getMinutesLapsed = () => Number(document.querySelector('#minute')?.textContent)
  const getSecondsLapsed = () => Number(document.querySelector('#second')?.textContent)

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
