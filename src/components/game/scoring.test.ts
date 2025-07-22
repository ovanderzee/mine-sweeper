import {
  clickBlankAreas, clickRemainingPointers,
  leastClicksToWin, mostClicksToWin,
  unmarkCells
} from './scoring'
import { blank18pct, blank26pct, blank31pct, blank41pct } from './../../__mocks__/game-states'

describe('some blanks need to be clicked and then all the pointercells have to be clicked', () => {
  test('sample game blank18pct has 2 blank areas and 20 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank18pct)
    expect(blankAreas).toBe(2)

    const pointers = clickRemainingPointers(blank18pct)
    expect(pointers).toBe(20)

    unmarkCells(blank18pct)
  })

  test('sample game blank26pct has 2 blank areas and 7 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank26pct)
    expect(blankAreas).toBe(2)

    const pointers = clickRemainingPointers(blank26pct)
    expect(pointers).toBe(7)

    unmarkCells(blank26pct)
  })

  test('sample game blank31pct has 4 blank areas and 3 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank31pct)
    expect(blankAreas).toBe(4)

    const pointers = clickRemainingPointers(blank31pct)
    expect(pointers).toBe(3)

    unmarkCells(blank31pct)
  })

  test('sample game blank41pct has 2 blank areas and 3 pointers to click', () => {
    const blankAreas = clickBlankAreas(blank41pct)
    expect(blankAreas).toBe(2)

    const pointers = clickRemainingPointers(blank41pct)
    expect(pointers).toBe(3)

    unmarkCells(blank41pct)
  })
})

describe('establish Bechtel\'s Board Benchmark Value', () => {
  test('sample game blank18pct stats', () => {
    const min3bv = leastClicksToWin(blank18pct)
    expect(min3bv).toBe(22)

    const max3bv = mostClicksToWin(blank18pct)
    expect(max3bv).toBe(35)
  })

  test('sample game blank26pct stats', () => {
    const min3bv = leastClicksToWin(blank26pct)
    expect(min3bv).toBe(9)

    const max3bv = mostClicksToWin(blank26pct)
    expect(max3bv).toBe(31)
  })

  test('sample game blank31pct stats', () => {
    const min3bv = leastClicksToWin(blank31pct)
    expect(min3bv).toBe(7)

    const max3bv = mostClicksToWin(blank31pct)
    expect(max3bv).toBe(31)
  })

  test('sample game blank41pct stats', () => {
    const min3bv = leastClicksToWin(blank41pct)
    expect(min3bv).toBe(5)

    const max3bv = mostClicksToWin(blank41pct)
    expect(max3bv).toBe(24)
  })
})
