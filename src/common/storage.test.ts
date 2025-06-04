import storage from './storage'
import DEFAULTS from './defaults'

describe('Configuration storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should set data', () => {
    const data = {FONT_SIZE: 18, PLAYER_NAME: 'Breadbrood'}
    storage.config = data

    const readStorage = JSON.parse(localStorage.getItem('mv-config') as string)
    expect(readStorage.FONT_SIZE).toBe(18)
    expect(readStorage.PLAYER_NAME).toBe('Breadbrood')
  })

  test('should get data', () => {
    const data = {FONT_SIZE: 18, PLAYER_NAME: 'Breadbrood'}
    localStorage.setItem('mv-config', JSON.stringify(data))

    expect(storage.config.FONT_SIZE).toBe(18)
    expect(storage.config.PLAYER_NAME).toBe('Breadbrood')
  })

  test('should get a complete config', () => {
    const data = {FONT_SIZE: 18, PLAYER_NAME: 'Breadbrood'}
    localStorage.setItem('mv-config', JSON.stringify(data))

    const config = storage.config
    expect(config.BOARD_SIZE).toBe(DEFAULTS.BOARD_SIZE)
    expect(config.GAME_LEVEL).toBe(DEFAULTS.GAME_LEVEL)
    expect(config.MINE_COUNT).toBe(DEFAULTS.MINE_COUNT)
    expect(config.LANGUAGE).toBe(DEFAULTS.LANGUAGE)
    expect(config.FONT_SIZE).toBe(18)
    expect(config.PLAYER_NAME).toBe('Breadbrood')
    expect(config.MAX_SCORES).toBe(DEFAULTS.MAX_SCORES)
  })

  test('should get defaults when no localStorage item exists', () => {
    // localStorage cleared
    const config = storage.config
    expect(config.BOARD_SIZE).toBe(DEFAULTS.BOARD_SIZE)
    expect(config.GAME_LEVEL).toBe(DEFAULTS.GAME_LEVEL)
    expect(config.MINE_COUNT).toBe(DEFAULTS.MINE_COUNT)
    expect(config.LANGUAGE).toBe(DEFAULTS.LANGUAGE)
    expect(config.FONT_SIZE).toBe(DEFAULTS.FONT_SIZE)
    expect(config.PLAYER_NAME).toBe(DEFAULTS.PLAYER_NAME)
    expect(config.MAX_SCORES).toBe(DEFAULTS.MAX_SCORES)
  })

  test('should stack values in order of appearance', () => {
    // localStorage cleared
    const data = {FONT_SIZE: 18, PLAYER_NAME: 'Breadbrood'}
    storage.config = data
    const dataThree = {BOARD_SIZE: 3, GAME_LEVEL: 3}
    storage.config = dataThree
    const dataElse = {GAME_LEVEL: 5, PLAYER_NAME: 'Heidi'}
    storage.config = dataElse

    const config = storage.config
    expect(config.BOARD_SIZE).toBe(3)
    expect(config.GAME_LEVEL).toBe(5)
    expect(config.MINE_COUNT).toBe(DEFAULTS.MINE_COUNT)
    expect(config.LANGUAGE).toBe(DEFAULTS.LANGUAGE)
    expect(config.FONT_SIZE).toBe(18)
    expect(config.PLAYER_NAME).toBe('Heidi')
    expect(config.MAX_SCORES).toBe(DEFAULTS.MAX_SCORES)
  })
})

describe('Game storage', () => {
})

describe('Scores storage', () => {
})
