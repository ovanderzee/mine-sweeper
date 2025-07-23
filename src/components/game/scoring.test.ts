import {
  clickBlankAreas, clickRemainingPointers,
  leastClicksToWin, mostClicksToWin,
  unmarkCells,
  makeBoardCode, sequenceFillData
} from './scoring'
import { blank18pct, blank26pct, blank31pct, blank41pct } from './../../__mocks__/game-states'
import { CellStateStage } from '../../common/game-types'

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

describe('Create id\'s containing fill data', () => {
  const testBoard = [[{"stage":CellStateStage.TESTED,"fill":10,"row":0,"col":0},{"stage":CellStateStage.RELEASED,"fill":3,"row":0,"col":1},{"stage":CellStateStage.RELEASED,"fill":1,"row":0,"col":2},{"stage":CellStateStage.RELEASED,"fill":2,"row":0,"col":3},{"stage":CellStateStage.TESTED,"fill":9,"row":0,"col":4},{"stage":CellStateStage.RELEASED,"fill":2,"row":0,"col":5},{"stage":CellStateStage.TESTED,"fill":10,"row":0,"col":6},{"stage":CellStateStage.RELEASED,"fill":3,"row":0,"col":7},{"stage":CellStateStage.TESTED,"fill":10,"row":0,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":0,"col":9}],[{"stage":CellStateStage.TESTED,"fill":12,"row":1,"col":0},{"stage":CellStateStage.RELEASED,"fill":6,"row":1,"col":1},{"stage":CellStateStage.TESTED,"fill":11,"row":1,"col":2},{"stage":CellStateStage.RELEASED,"fill":3,"row":1,"col":3},{"stage":CellStateStage.RELEASED,"fill":2,"row":1,"col":4},{"stage":CellStateStage.RELEASED,"fill":3,"row":1,"col":5},{"stage":CellStateStage.RELEASED,"fill":3,"row":1,"col":6},{"stage":CellStateStage.TESTED,"fill":11,"row":1,"col":7},{"stage":CellStateStage.RELEASED,"fill":2,"row":1,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":1,"col":9}],[{"stage":CellStateStage.TESTED,"fill":11,"row":2,"col":0},{"stage":CellStateStage.TESTED,"fill":13,"row":2,"col":1},{"stage":CellStateStage.TESTED,"fill":11,"row":2,"col":2},{"stage":CellStateStage.TESTED,"fill":2,"row":2,"col":3},{"stage":CellStateStage.TESTED,"fill":2,"row":2,"col":4},{"stage":CellStateStage.TESTED,"fill":10,"row":2,"col":5},{"stage":CellStateStage.RELEASED,"fill":3,"row":2,"col":6},{"stage":CellStateStage.RELEASED,"fill":1,"row":2,"col":7},{"stage":CellStateStage.RELEASED,"fill":1,"row":2,"col":8},{"stage":CellStateStage.RELEASED,"fill":0,"row":2,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":2,"row":3,"col":0},{"stage":CellStateStage.RELEASED,"fill":4,"row":3,"col":1},{"stage":CellStateStage.RELEASED,"fill":4,"row":3,"col":2},{"stage":CellStateStage.RELEASED,"fill":4,"row":3,"col":3},{"stage":CellStateStage.TESTED,"fill":4,"row":3,"col":4},{"stage":CellStateStage.TESTED,"fill":11,"row":3,"col":5},{"stage":CellStateStage.RELEASED,"fill":2,"row":3,"col":6},{"stage":CellStateStage.RELEASED,"fill":1,"row":3,"col":7},{"stage":CellStateStage.RELEASED,"fill":1,"row":3,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":3,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":0,"row":4,"col":0},{"stage":CellStateStage.RELEASED,"fill":2,"row":4,"col":1},{"stage":CellStateStage.TESTED,"fill":12,"row":4,"col":2},{"stage":CellStateStage.TESTED,"fill":14,"row":4,"col":3},{"stage":CellStateStage.TESTED,"fill":14,"row":4,"col":4},{"stage":CellStateStage.RELEASED,"fill":4,"row":4,"col":5},{"stage":CellStateStage.RELEASED,"fill":2,"row":4,"col":6},{"stage":CellStateStage.RELEASED,"fill":1,"row":4,"col":7},{"stage":CellStateStage.TESTED,"fill":9,"row":4,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":4,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":0,"row":5,"col":0},{"stage":CellStateStage.RELEASED,"fill":3,"row":5,"col":1},{"stage":CellStateStage.TESTED,"fill":14,"row":5,"col":2},{"stage":CellStateStage.TESTED,"fill":17,"row":5,"col":3},{"stage":CellStateStage.TESTED,"fill":15,"row":5,"col":4},{"stage":CellStateStage.TESTED,"fill":13,"row":5,"col":5},{"stage":CellStateStage.RELEASED,"fill":3,"row":5,"col":6},{"stage":CellStateStage.RELEASED,"fill":3,"row":5,"col":7},{"stage":CellStateStage.RELEASED,"fill":2,"row":5,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":5,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":0,"row":6,"col":0},{"stage":CellStateStage.RELEASED,"fill":3,"row":6,"col":1},{"stage":CellStateStage.TESTED,"fill":13,"row":6,"col":2},{"stage":CellStateStage.TESTED,"fill":15,"row":6,"col":3},{"stage":CellStateStage.TESTED,"fill":13,"row":6,"col":4},{"stage":CellStateStage.RELEASED,"fill":5,"row":6,"col":5},{"stage":CellStateStage.TESTED,"fill":13,"row":6,"col":6},{"stage":CellStateStage.TESTED,"fill":12,"row":6,"col":7},{"stage":CellStateStage.RELEASED,"fill":3,"row":6,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":6,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":1,"row":7,"col":0},{"stage":CellStateStage.RELEASED,"fill":3,"row":7,"col":1},{"stage":CellStateStage.TESTED,"fill":12,"row":7,"col":2},{"stage":CellStateStage.RELEASED,"fill":4,"row":7,"col":3},{"stage":CellStateStage.RELEASED,"fill":2,"row":7,"col":4},{"stage":CellStateStage.RELEASED,"fill":3,"row":7,"col":5},{"stage":CellStateStage.TESTED,"fill":13,"row":7,"col":6},{"stage":CellStateStage.TESTED,"fill":13,"row":7,"col":7},{"stage":CellStateStage.RELEASED,"fill":4,"row":7,"col":8},{"stage":CellStateStage.TESTED,"fill":9,"row":7,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":2,"row":8,"col":0},{"stage":CellStateStage.TESTED,"fill":11,"row":8,"col":1},{"stage":CellStateStage.RELEASED,"fill":3,"row":8,"col":2},{"stage":CellStateStage.RELEASED,"fill":1,"row":8,"col":3},{"stage":CellStateStage.RELEASED,"fill":0,"row":8,"col":4},{"stage":CellStateStage.RELEASED,"fill":2,"row":8,"col":5},{"stage":CellStateStage.RELEASED,"fill":4,"row":8,"col":6},{"stage":CellStateStage.RELEASED,"fill":13,"row":8,"col":7},{"stage":CellStateStage.RELEASED,"fill":4,"row":8,"col":8},{"stage":CellStateStage.RELEASED,"fill":2,"row":8,"col":9}],[{"stage":CellStateStage.RELEASED,"fill":2,"row":9,"col":0},{"stage":CellStateStage.TESTED,"fill":10,"row":9,"col":1},{"stage":CellStateStage.RELEASED,"fill":2,"row":9,"col":2},{"stage":CellStateStage.RELEASED,"fill":0,"row":9,"col":3},{"stage":CellStateStage.RELEASED,"fill":0,"row":9,"col":4},{"stage":CellStateStage.RELEASED,"fill":1,"row":9,"col":5},{"stage":CellStateStage.TESTED,"fill":10,"row":9,"col":6},{"stage":CellStateStage.RELEASED,"fill":3,"row":9,"col":7},{"stage":CellStateStage.TESTED,"fill":10,"row":9,"col":8},{"stage":CellStateStage.RELEASED,"fill":1,"row":9,"col":9}]]
  const testBoardCode = "pqraa9w1-vb0mp7a1-trbbvvri-5now709j-dqbi9dj-jejy5a1-j388gjj-31r2hgt9-6msow3b2-6hfr3iw1"

  it('should convert a board to a boardCode', () => {
    const boardCode = makeBoardCode(testBoard)
    expect(boardCode).toBe(testBoardCode)
  })

  it('should convert a boardCode to fill values', () => {
    const fillData = sequenceFillData(testBoardCode)

    // compare fill=17 with mine amidst 8 mines
    expect(fillData[5][3]).toBe(testBoard[5][3].fill)

    // compare fill=6 with pointer amidst 6 mines
    expect(fillData[1][1]).toBe(testBoard[1][1].fill)
  })
})

