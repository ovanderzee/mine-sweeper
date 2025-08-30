import DEFAULTS, { calculateMineCount } from './defaults'
import { microConfig, scoringConfig } from '../__mocks__/configs'

/**
 * GAME_LEVEL
 * mines per 30 cells:
 * 2 = 1 mine in 15 cells; 6.7% coverage
 * 3 = 1 in 10; 10%
 * 4 = 1 in 7.5; 13.3%
 * 5 = 1 in 6; 16.7%
 * 6 = 1 in 5; 20%
 * 7 = 1 in 4.3; 23.3%
 */

test('Some boardSize and gameLevel to mineCount scenarios' , ()=>{
  const micro = calculateMineCount(microConfig)
  expect(micro).toBe(2)

  const scoring = calculateMineCount(scoringConfig)
  expect(scoring).toBe(7)

  const standard = calculateMineCount(DEFAULTS)
  expect(standard).toBe(4)

  const zero = calculateMineCount({BOARD_SIZE: 10, GAME_LEVEL: 0})
  expect(zero).toBe(0)
})
