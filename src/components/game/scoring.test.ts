import {
  clickBlankAreas, clickRemainingPointers,
  leastClicksToWin, mostClicksToWin,
  unmarkCells,
  makeBoardCode, sequenceFillData
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

describe('Create compressed string containing fill data', () => {
  const testBoard = [
    [{"fill":10,"row":0,"col":0},{"fill":3,"row":0,"col":1},{"fill":1,"row":0,"col":2},{"fill":1,"row":0,"col":3},{"fill":0,"row":0,"col":4},{"fill":1,"row":0,"col":5},{"fill":10,"row":0,"col":6},{"fill":2,"row":0,"col":7},{"fill":1,"row":0,"col":8},{"fill":0,"row":0,"col":9}],
    [{"fill":12,"row":1,"col":0},{"fill":6,"row":1,"col":1},{"fill":11,"row":1,"col":2},{"fill":2,"row":1,"col":3},{"fill":1,"row":1,"col":4},{"fill":2,"row":1,"col":5},{"fill":3,"row":1,"col":6},{"fill":10,"row":1,"col":7},{"fill":1,"row":1,"col":8},{"fill":0,"row":1,"col":9}],
    [{"fill":11,"row":2,"col":0},{"fill":13,"row":2,"col":1},{"fill":11,"row":2,"col":2},{"fill":2,"row":2,"col":3},{"fill":2,"row":2,"col":4},{"fill":10,"row":2,"col":5},{"fill":3,"row":2,"col":6},{"fill":1,"row":2,"col":7},{"fill":1,"row":2,"col":8},{"fill":0,"row":2,"col":9}],
    [{"fill":2,"row":3,"col":0},{"fill":4,"row":3,"col":1},{"fill":4,"row":3,"col":2},{"fill":4,"row":3,"col":3},{"fill":4,"row":3,"col":4},{"fill":11,"row":3,"col":5},{"fill":2,"row":3,"col":6},{"fill":0,"row":3,"col":7},{"fill":0,"row":3,"col":8},{"fill":0,"row":3,"col":9}],
    [{"fill":0,"row":4,"col":0},{"fill":2,"row":4,"col":1},{"fill":12,"row":4,"col":2},{"fill":14,"row":4,"col":3},{"fill":14,"row":4,"col":4},{"fill":4,"row":4,"col":5},{"fill":2,"row":4,"col":6},{"fill":0,"row":4,"col":7},{"fill":0,"row":4,"col":8},{"fill":0,"row":4,"col":9}],
    [{"fill":0,"row":5,"col":0},{"fill":3,"row":5,"col":1},{"fill":14,"row":5,"col":2},{"fill":17,"row":5,"col":3},{"fill":15,"row":5,"col":4},{"fill":13,"row":5,"col":5},{"fill":3,"row":5,"col":6},{"fill":2,"row":5,"col":7},{"fill":1,"row":5,"col":8},{"fill":0,"row":5,"col":9}],
    [{"fill":0,"row":6,"col":0},{"fill":3,"row":6,"col":1},{"fill":13,"row":6,"col":2},{"fill":15,"row":6,"col":3},{"fill":13,"row":6,"col":4},{"fill":5,"row":6,"col":5},{"fill":13,"row":6,"col":6},{"fill":12,"row":6,"col":7},{"fill":3,"row":6,"col":8},{"fill":1,"row":6,"col":9}],
    [{"fill":1,"row":7,"col":0},{"fill":3,"row":7,"col":1},{"fill":12,"row":7,"col":2},{"fill":4,"row":7,"col":3},{"fill":2,"row":7,"col":4},{"fill":3,"row":7,"col":5},{"fill":13,"row":7,"col":6},{"fill":13,"row":7,"col":7},{"fill":4,"row":7,"col":8},{"fill":9,"row":7,"col":9}],
    [{"fill":1,"row":8,"col":0},{"fill":10,"row":8,"col":1},{"fill":2,"row":8,"col":2},{"fill":1,"row":8,"col":3},{"fill":0,"row":8,"col":4},{"fill":2,"row":8,"col":5},{"fill":4,"row":8,"col":6},{"fill":13,"row":8,"col":7},{"fill":4,"row":8,"col":8},{"fill":2,"row":8,"col":9}],
    [{"fill":1,"row":9,"col":0},{"fill":1,"row":9,"col":1},{"fill":1,"row":9,"col":2},{"fill":0,"row":9,"col":3},{"fill":0,"row":9,"col":4},{"fill":1,"row":9,"col":5},{"fill":10,"row":9,"col":6},{"fill":3,"row":9,"col":7},{"fill":10,"row":9,"col":8},{"fill":1,"row":9,"col":9}]
  ]
  const testBoardCode = "aa9IYZgjGAMbATFBjAbAI3rEwooCZtqBJLACxklqRXEICmtJs1kItAFgGY4jxUg5cArDgTgwIBI344SAThi9SM+EWigsQA"

  it('should convert a board to a boardCode', () => {
    const boardCode = makeBoardCode(testBoard, 9)
    expect(boardCode).toBe(testBoardCode)
  })

  it('should convert a boardCode to a board', () => {
    const [fillData, checkConfig] = sequenceFillData(testBoardCode)

    expect(checkConfig.GAME_LEVEL).toBe(9)

    // compare fill=17 with mine amidst 8 mines
    expect(fillData[5][3].fill).toBe(testBoard[5][3].fill)

    // compare fill=6 with pointer amidst 6 mines
    expect(fillData[1][1].fill).toBe(testBoard[1][1].fill)
  })
})

describe('Sanity checking on boardCode', () => {
  // suppress alarming messages in output
  beforeEach(() => console.error = jest.fn())

  test('should find wrong board size', () => {
    const wrongCode = '534JwRhrEAYrHyA'
    const wrongData = wrongCode.substring(0,3)
    sequenceFillData(wrongCode)
    expect(console.error).toHaveBeenLastCalledWith('Wrong board size with', wrongData, '... check for', 5, 'found', 4)
  })

  test('should find wrong mine count', () => {
    // size 4 en lvl 3,4,5 geven 2,3,3 mijnen
    const wrongCode = '443JwRhrEAYrHyA'
    const wrongData = wrongCode.substring(0,3)
    sequenceFillData(wrongCode)
    expect(console.error).toHaveBeenLastCalledWith('Wrong mine count with', wrongData, '... check for', 2, 'found', 3)
  })

  test('should not go wrong', () => {
    const goodCode = '444JwRhrEAYrHyA'
    sequenceFillData(goodCode)
    expect(console.error).not.toHaveBeenCalled()
  })
})
