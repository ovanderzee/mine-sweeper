import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import DEFAULTS from './../../common/defaults'
import storage from './../../common/storage'
import * as fn from './../../common/functions'
import { startConfigurePageTesting, referAndNavigateTo,
  setDefaultConfig, setMicroConfig
} from './../../__mocks__/specification-helpers'
import { microConfig } from './../../__mocks__/configs'
import { playingGameState } from './../../__mocks__/game-states'
import { liveScores } from './../../__mocks__/scores'
import { RANGES } from '../../common/constants'

describe('The configure page sidebar', () => {
  beforeEach(() => {
    startConfigurePageTesting()
  })

  test("should restore default config", () => {
    storage.config = microConfig
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(storage.config).toStrictEqual(DEFAULTS)
  })

  test("should navigate to About page", () => {
    referAndNavigateTo.about()
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to HallOfFame page", () => {
    referAndNavigateTo.hallOfFame()
    const heading = screen.getByText(/Hall of Fame/i)
    expect(heading).toBeTruthy()
  })

  test("should navigate to Game board", () => {
    referAndNavigateTo.gameBoard()
    const cells = document.querySelectorAll('#playground button')
    expect(cells.length).toBe(36)
  })
})

describe('The configure controls', () => {
  beforeEach(() => {
    setDefaultConfig()
    startConfigurePageTesting()
  })

  test("should change the board-size setting", () => {
    expect(storage.config.BOARD_SIZE).toBe(6)
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 8}})
    expect(storage.config.BOARD_SIZE).toBe(8)
  })

  test("should enforce minimum board-size setting", () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 2}})
    expect(storage.config.BOARD_SIZE).toBe(RANGES.SIZE.min)
  })

  test("should enforce maximum board-size setting", () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 10}})
    expect(storage.config.BOARD_SIZE).toBe(RANGES.SIZE.max)
  })

  test("should trigger a new game on board-size change", () => {
    const initialGameState = storage.game
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 7}})
    expect(storage.config.BOARD_SIZE).toBe(7)
    const currentGameState = storage.game
    expect(currentGameState).not.toStrictEqual(initialGameState)
  })

  test("should change the gamelevel setting", () => {
    expect(storage.config.GAME_LEVEL).toBe(3)
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 6}})
    expect(storage.config.GAME_LEVEL).toBe(6)
  })

  test("should enforce minimum gamelevel setting", () => {
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 0}})
    expect(storage.config.GAME_LEVEL).toBe(RANGES.LEVEL.min)
  })

  test("should enforce maximum gamelevel setting", () => {
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 10}})
    expect(storage.config.GAME_LEVEL).toBe(RANGES.LEVEL.max)
  })

  test("should trigger a new game on gamelevel change", () => {
    const initialGameState = storage.game
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 5}})
    expect(storage.config.GAME_LEVEL).toBe(5)
    const currentGameState = storage.game
    expect(currentGameState).not.toStrictEqual(initialGameState)
  })

  test("should change the language setting", () => {
    expect(storage.config.LANGUAGE).toBe('en')
    const select = screen.getByLabelText('Translations')
    fireEvent.change(select, {target: {value: 'nl'}})
    expect(storage.config.LANGUAGE).toBe('nl')
  })

  test("should change the zoom setting", () => {
    expect(storage.config.FONT_SIZE).toBe(15)
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 12}})
    expect(storage.config.FONT_SIZE).toBe(12)
  })

  test("should enforce a minimum zoom setting", () => {
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 5}})
    expect(storage.config.FONT_SIZE).toBe(RANGES.FONT.min)
  })

  test("should enforce a maximum zoom setting", () => {
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 72}})
    expect(storage.config.FONT_SIZE).toBe(RANGES.FONT.max)
  })

  test("should change the name setting", () => {
    expect(storage.config.PLAYER_NAME).toBe('anonymous')
    const input = screen.getByLabelText('Name in scores')
    fireEvent.change(input, {target: {value: 'Moorefly'}})
    expect(storage.config.PLAYER_NAME).toBe('Moorefly')
  })

  test("should change the max-scores setting", () => {
    expect(storage.config.MAX_SCORES).toBe(500)
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 642}})
    expect(storage.config.MAX_SCORES).toBe(642)
  })

  test("should not instantaneously remove scores", () => {
    storage.scores = liveScores
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 33}})
    expect(storage.scores.length).toBe(liveScores.length)
  })

  test("should enforce minimum max-scores setting", () => {
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 0}})
    expect(storage.config.MAX_SCORES).toBe(RANGES.SCORES.min)
  })

  test("should enforce maximum max-scores setting", () => {
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 1940}})
    expect(storage.config.MAX_SCORES).toBe(RANGES.SCORES.max)
  })
})

describe('The configure-page reset button', () => {
  describe('in playing game state with a non-default challenge', () => {

    beforeEach(() => {
      setMicroConfig()
      storage.game = playingGameState
      startConfigurePageTesting()
    })

    test("should not change size and level and keep the current game on cancel", () => {
      const initialGameState = storage.game

      const icon = screen.getByText(/↺/i)
      fireEvent.click(icon)

      const dialog = screen.getByText(/Do you want to end the game\?/i)
      expect(dialog).toBeInTheDocument()
      const cancelBtn = document.querySelector('dialog button.cancel') as HTMLButtonElement
      fireEvent.click(cancelBtn)

      const currentGameState = storage.game
      expect(currentGameState).toStrictEqual(initialGameState)
    })

    test("should change size and level and force a new game on confirm", () => {
      const initialGameState = storage.game

      const icon = screen.getByText(/↺/i)
      fireEvent.click(icon)

      const dialog = screen.getByText(/Do you want to end the game\?/i)
      expect(dialog).toBeInTheDocument()
      const confirmBtn = document.querySelector('dialog button.confirm') as HTMLButtonElement
      fireEvent.click(confirmBtn)

      const currentGameState = storage.game
      expect(currentGameState).not.toStrictEqual(initialGameState)
    })
  })

  describe('in playing game state with a default challenge', () => {

    beforeEach(() => {
      setDefaultConfig()
      storage.game = playingGameState
      startConfigurePageTesting()
    })

    test("should just reset without a dialog", () => {
      const initialGameState = storage.game

      const icon = screen.getByText(/↺/i)
      fireEvent.click(icon)

      const confirmBtn = document.querySelector('dialog button.confirm')
      expect(confirmBtn).not.toBeInTheDocument()

      const currentGameState = storage.game
      expect(currentGameState).not.toStrictEqual(initialGameState)
    })
  })
})

describe('The semantic form', () => {
  beforeEach(() => {
    startConfigurePageTesting()
  })

  test('should call function to suppress submitting', () => {
    const preventFn = jest.spyOn(fn, 'preventReloadByEnter')
    const formField = screen.getByLabelText('Name in scores')

    formField.focus()
    fireEvent.keyDown(formField, {key: 'Enter'})

    expect(formField).toBeInTheDocument()
    expect(preventFn).toHaveBeenCalled()
  })
})
