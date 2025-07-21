import { clickBlankAreas, clickRemainingPointers, leastClicksToWin } from './scoring'
import { blank18pct, blank26pct, blank31pct, blank41pct } from './../../__mocks__/game-states'

describe('some blanks need to be clicked and then all the pointercells have to be clicked', () => {
  test('sample game blank18pct has 2 blank areas and 20 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank18pct)
    expect(blankAreas).toBe(2)

    const pointers = clickRemainingPointers(blank18pct)
    expect(pointers).toBe(20)
  })

  test('sample game blank26pct has 2 blank areas and 7 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank26pct)
    expect(blankAreas).toBe(2)

    const pointers = clickRemainingPointers(blank26pct)
    expect(pointers).toBe(7)
  })

  test('sample game blank31pct has 4 blank areas and 3 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank31pct)
    expect(blankAreas).toBe(4)

    const pointers = clickRemainingPointers(blank31pct)
    expect(pointers).toBe(3)
  })

  test('sample game blank41pct has 2 blank areas and 3 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank41pct)
    expect(blankAreas).toBe(2)

    const pointers = clickRemainingPointers(blank41pct)
    expect(pointers).toBe(3)
  })
})

describe('establish Bechtel\'s Board Benchmark Value', () => {
  test('sample game blank18pct stats', () => {
    const bbbv = leastClicksToWin(blank18pct)
    expect(bbbv).toBe(22)
  })

  test('sample game blank26pct stats', () => {
    const bbbv = leastClicksToWin(blank26pct)
    expect(bbbv).toBe(9)
  })

  test('sample game blank31pct stats', () => {
    const bbbv = leastClicksToWin(blank31pct)
    expect(bbbv).toBe(7)
  })

  test('sample game blank41pct stats', () => {
    const bbbv = leastClicksToWin(blank41pct)
    expect(bbbv).toBe(5)
  })
})
