import { describe, expect, it, vi } from 'vitest'
import TimeTracker from './TimeTracker'
import { newGameState, playingGameState, lostGameState } from './../../__mocks__/game-states'
import { renderInApp } from './../../__mocks__/aat-helpers'

describe('TimeTracker', () => {
  const floorSecs = (ms: number) => Math.floor(ms / 1000) % 60
  const floorMins = (ms: number) => Math.floor(ms / (1000 * 60)) % 60

  it('should not start before game is played', async () => {
    const screen = await renderInApp(<TimeTracker game={newGameState} />)
    expect(screen.getByText(`00:00`)).toBeInTheDocument()

    // and stay the same
    const advanceMilliSecs = 57000
    vi.advanceTimersByTime(advanceMilliSecs)

    expect(screen.getByText(`00:00`)).toBeInTheDocument()
  })

  it('should track advancing time when game is played', async () => {
    const now = Date.now()
    playingGameState.tZero = now - 45121
    playingGameState.tShift = now

    const timeLapse = playingGameState.tShift - playingGameState.tZero
    const expMins = floorMins(timeLapse)
    const expSecs = floorSecs(timeLapse)
    const screen = await renderInApp(<TimeTracker game={playingGameState} />)
    //'00:45'
    expect(screen.getByText(`${expMins}:${expSecs}`)).toBeInTheDocument()

    const advanceMilliSecs = 57000
    vi.advanceTimersByTime(advanceMilliSecs)

    const timeLapse2 = playingGameState.tShift - playingGameState.tZero
    const expMins2 = floorMins(timeLapse2)
    const expSecs2 = floorSecs(timeLapse2)
    //'01:42'
    expect(screen.getByText(`${expMins2}:${expSecs2}`)).toBeInTheDocument()
  })

  it('should not advance time when game has ended', async () => {
    const timeLapse = lostGameState.tShift - lostGameState.tZero

    const expMins = floorMins(timeLapse)
    const expSecs = floorSecs(timeLapse)
    const screen = await renderInApp(<TimeTracker game={lostGameState} />)
    //'03:50'
    expect(screen.getByText(`${expMins}:${expSecs}`)).toBeInTheDocument()

    const advanceMilliSecs = 57000
    vi.advanceTimersByTime(advanceMilliSecs)

    // and stay the same
    expect(screen.getByText(`${expMins}:${expSecs}`)).toBeInTheDocument()
  })

})
