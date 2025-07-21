import { clickBlankRegions, clickRemainingPointers } from './scoring'
import { GameStages } from '../../common/game-types'
import { blank18pct, blank26pct, blank31pct, blank41pct } from './../../__mocks__/game-states'

describe('some blanks need to be clicked and then all the pointercells have to be clicked', () => {
  test('sample game blank18pct has 2 blank regions and 20 pointers to click', () => {
    const regionResult = clickBlankRegions(blank18pct)
    expect(regionResult.clicks).toBe(2)

    const pointerResult = clickRemainingPointers(regionResult.game)
    expect(pointerResult.clicks).toBe(20)

    expect(pointerResult.game.stage).toBe(GameStages.WON)
  })

  test('sample game blank26pct has 2 blank regions and 7 pointers to click', () => {
    const regionResult = clickBlankRegions(blank26pct)
    expect(regionResult.clicks).toBe(2)

    const pointerResult = clickRemainingPointers(regionResult.game)
    expect(pointerResult.clicks).toBe(7)

    expect(pointerResult.game.stage).toBe(GameStages.WON)
  })

  test('sample game blank31pct has 4 blank regions and 3 pointers to click', () => {
    const regionResult = clickBlankRegions(blank31pct)
    expect(regionResult.clicks).toBe(4)

    const pointerResult = clickRemainingPointers(regionResult.game)
    expect(pointerResult.clicks).toBe(3)

    expect(pointerResult.game.stage).toBe(GameStages.WON)
  })

  test('sample game blank41pct has 2 blank regions and 3 pointers to click', () => {
    const regionResult = clickBlankRegions(blank41pct)
    expect(regionResult.clicks).toBe(2)

    const pointerResult = clickRemainingPointers(regionResult.game)
    expect(pointerResult.clicks).toBe(3)

    expect(pointerResult.game.stage).toBe(GameStages.WON)
  })
})

describe('establish Bechtel\'s Board Benchmark Value', () => {
  test('sample game blank18pct stats', () => {
    const count = leastClicksToWin(blank18pct)
    expect(count).toBe(22)
  })

  test('sample game blank27pct stats', () => {
    const count = leastClicksToWin(blank27pct)
    expect(count).toBe(9)
  })

  test('sample game blank31pct stats', () => {
    const count = leastClicksToWin(blank31pct)
    expect(count).toBe(7)
  })

  test('sample game blank41pct stats', () => {
    const count = leastClicksToWin(blank41pct)
    expect(count).toBe(5)
  })
})
