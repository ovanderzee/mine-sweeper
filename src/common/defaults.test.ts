import { DEFAULTS, calculateMineCount, configFactory } from './defaults'
import { microConfig, scoringConfig } from '../__mocks__/configs'

/**
 * GAME_LEVEL
 * mines per 60 cells:
 * 4 = 1 mine in 15 cells; 6.7% coverage
 * 6 = 1 in 10; 10%
 * 8 = 1 in 7.5; 13.3%
 * 10 = 1 in 6; 16.7%
 * 12 = 1 in 5; 20%
 * 14 = 1 in 4.3; 23.3%
 */

it('Some boardSize and gameLevel to mineCount scenarios' , ()=>{
  const microCount = calculateMineCount(microConfig)
  const microConf = configFactory(microConfig)
  expect(microConf.MINE_COUNT).toBe(microCount) // 2

  const scoringCount = calculateMineCount(scoringConfig)
  const scoringConf = configFactory(scoringConfig)
  expect(scoringConf.MINE_COUNT).toBe(scoringCount) // 7

  const standardCount = calculateMineCount(DEFAULTS)
  const standardConf = configFactory(DEFAULTS)
  expect(standardConf.MINE_COUNT).toBe(standardCount) // 4

  const zeroCount = calculateMineCount({BOARD_SIZE: 10, GAME_LEVEL: 0})
  const zeroConf = configFactory({BOARD_SIZE: 10, GAME_LEVEL: 0})
  expect(zeroConf.MINE_COUNT).toBe(zeroCount) // 0
})

describe('configFactory', () => {
  test('should behave default when called with blank value', () => {
    const config = configFactory({})
    const {BOARD_SIZE, GAME_LEVEL, MINE_COUNT, FONT_SIZE} = config
    expect(BOARD_SIZE).toBe(DEFAULTS.BOARD_SIZE)
    expect(GAME_LEVEL).toBe(DEFAULTS.GAME_LEVEL)
    expect(MINE_COUNT).toBe(DEFAULTS.MINE_COUNT)
    expect(FONT_SIZE).toBe(DEFAULTS.FONT_SIZE)
  })

  test('should return mine-count on-demand', () => {
    const configChange = {BOARD_SIZE: 9, GAME_LEVEL: 9}
    const config = configFactory(configChange)
    expect(config.MINE_COUNT).toBe(13)
  })

  test('should always adopt new properties', () => {
    // @ts-ignore // error TS2339: Property 'NEW_PROP' does not exist on type ...
    DEFAULTS.NEW_PROP = 'jaja'
    const config = configFactory({BOARD_SIZE: 12, GAME_LEVEL: 6})
    expect(config.MINE_COUNT).toBe(15)
    // @ts-ignore // error TS2339: Property 'NEW_PROP' does not exist on type ...
    expect(config.NEW_PROP).toBe('jaja')
  })
})
