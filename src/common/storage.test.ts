import storage from './storage'
import DEFAULTS from './defaults'
import { GameState } from './game-types'
import { newGameState, wonGameState } from '../__mocks__/game-states'
import { liveScores } from '../__mocks__/scores'
import { microConfig } from '../__mocks__/configs'

describe('Configuration storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should set data', () => {
    storage.config = {FONT_SIZE: 18, PLAYER_NAME: 'Breadbrood'}

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

  test('should not set falsy data and thus not remove the config', () => {
    localStorage.setItem('mv-config', JSON.stringify(microConfig))
    storage.config = {}

    const readStorage = JSON.parse(localStorage.getItem('mv-config') as string)

    expect(readStorage).toStrictEqual(microConfig)
  })

  test('could not offer a eraseConfig function', () => {
    expect('eraseConfig' in storage).toBe(false)
  })

  test('should get a complete config when getting', () => {
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
    expect(config).toStrictEqual(DEFAULTS)
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

  test('should catch a JSON.parse error and return the default config', () => {
    const stringified = '{"FONT_SIZE": 48, "PLAYER_NAME": "Flo'
    localStorage.setItem('mv-config', stringified)
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const config = storage.config

    expect(config).toStrictEqual(DEFAULTS)
    expect(consoleErrorSpy).toHaveBeenLastCalledWith('Invalid configuration found, replace by defaults...')
  })
})


describe('Game storage', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  test('should set data', () => {
    storage.game = newGameState

    const read = JSON.parse(sessionStorage.getItem('mv-game') as string)
    expect(read.board).toStrictEqual(newGameState.board)
    expect(read.stage).toBe('game-new')
  })

  test('should get data', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(newGameState))

    const gameState = storage.game as GameState
    expect(gameState.board).toStrictEqual(newGameState.board)
    expect(gameState.stage).toBe('game-new')
  })

  test('should set and overwrite', () => {
    storage.game = { ...wonGameState, extra: 123 } as GameState

    const read1 = JSON.parse(sessionStorage.getItem('mv-game') as string)
    expect(read1.stage).toBe('game-won')
    expect(read1.extra).toBeTruthy()

    storage.game = newGameState

    const read2 = JSON.parse(sessionStorage.getItem('mv-game') as string)
    expect(read2.stage).toBe('game-new')
    expect(read2.extra).toBeFalsy()
  })

  test('should be removable by method', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(newGameState))

    storage.eraseGame()

    const read = localStorage.getItem('mv-victory') as string
    expect(read).toBe(null)

    const parse = JSON.parse(read)
    expect(parse).toBe(null)
  })

  test('should be removable by garbage', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(newGameState))
    const eraseGameSpy = jest.spyOn(storage, 'eraseGame')

    storage.game = null

    expect(eraseGameSpy).toHaveBeenCalled()
    jest.clearAllMocks()
  })

  test('should catch a JSON.parse error and return null', () => {
    const stringified = '{"stage":"game-new","board":[[{"stage":"touched'
    sessionStorage.setItem('mv-game', stringified)
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const game = storage.game

    expect(game).toBe(null)
    expect(consoleErrorSpy).toHaveBeenLastCalledWith('Invalid game found, start new game...')
  })
})

describe('Scores storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should set data', () => {
    storage.scores = liveScores

    const read = JSON.parse(localStorage.getItem('mv-victory') as string)
    expect(read[10]).toStrictEqual(liveScores[10])
  })

  test('should get data', () => {
    localStorage.setItem('mv-victory', JSON.stringify(liveScores))

    const scores = storage.scores
    expect(scores[10]).toStrictEqual(liveScores[10])
  })

  test('should set and overwrite', () => {
    storage.scores = liveScores

    const read1 = JSON.parse(localStorage.getItem('mv-victory') as string)
    expect(read1.length).toBe(liveScores.length)

    const someScores = liveScores.slice(0,9)
    storage.scores = someScores

    const read2 = JSON.parse(localStorage.getItem('mv-victory') as string)
    expect(read2.length).toBe(someScores.length)
  })

  test('should be removable by method', () => {
    localStorage.setItem('mv-victory', JSON.stringify(liveScores))

    storage.eraseScores()

    const read = localStorage.getItem('mv-victory') as string
    expect(read).toBe(null)

    const parse = JSON.parse(read)
    expect(parse?.length).toBe(undefined)
    expect(parse).toBe(null)
  })

  test('should be removable by garbage', () => {
    localStorage.setItem('mv-victory', JSON.stringify(liveScores))
    const eraseScoresSpy = jest.spyOn(storage, 'eraseScores')

    storage.scores = []

    expect(eraseScoresSpy).toHaveBeenCalled()
    jest.clearAllMocks()
  })

  test('should catch a JSON.parse error and return an empty array', () => {
    const stringified = '[{"code":"331Aw3CMxA","date":1755'
    localStorage.setItem('mv-victory', stringified)
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    const scores = storage.scores

    expect(scores).toStrictEqual([])
    expect(consoleErrorSpy).toHaveBeenLastCalledWith('Invalid scorelist found, start with new list...')
  })
})
