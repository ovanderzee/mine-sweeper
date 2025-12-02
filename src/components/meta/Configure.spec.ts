import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import DEFAULTS from './../../common/defaults'
import storage from './../../common/storage'
import * as fn from './../../common/functions'
import { startConfigurePageTesting, clickNavigationButtonTo,
  setDefaultConfig, setMicroConfig
} from './../../__mocks__/specification-helpers'
import { newPortalLayer } from '../../__mocks__/render-helpers'
import { microConfig } from './../../__mocks__/configs'
import { playingGameState } from './../../__mocks__/game-states'
import { liveScores } from './../../__mocks__/scores'
import { RANGES } from '../../common/constants'

describe('The configure page sidebar', () => {
  beforeEach(() => {
    newPortalLayer('modal')
    startConfigurePageTesting()
  })

  it('should restore default config', () => {
    storage.config = microConfig
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(storage.config).toStrictEqual(DEFAULTS)
  })

  it('should navigate to About page', () => {
    clickNavigationButtonTo.about()
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  it('should navigate to HallOfFame page', () => {
    clickNavigationButtonTo.hallOfFame()
    const heading = screen.getByText(/Hall of Fame/i)
    expect(heading).toBeTruthy()
  })

  it('should navigate to Game board', () => {
    clickNavigationButtonTo.gameBoard()
    const cells = document.querySelectorAll('#game-board button')
    expect(cells.length).toBe(36)
  })
})

describe('The configure controls', () => {
  beforeEach(() => {
    setDefaultConfig()
    startConfigurePageTesting()
  })

  it('should change the board-size setting', () => {
    expect(storage.config.BOARD_SIZE).toBe(6)
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 8}})
    expect(storage.config.BOARD_SIZE).toBe(8)
  })

  it('should enforce minimum board-size setting', () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 2}})
    expect(storage.config.BOARD_SIZE).toBe(RANGES.SIZE.min)
  })

  it('should enforce maximum board-size setting', () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 40}})
    expect(storage.config.BOARD_SIZE).toBe(RANGES.SIZE.max)
  })

  it('should trigger a new game on board-size change', () => {
    const initialGameState = storage.game
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 7}})
    expect(storage.config.BOARD_SIZE).toBe(7)
    const currentGameState = storage.game
    expect(currentGameState).not.toStrictEqual(initialGameState)
  })

  it('should change the gamelevel setting', () => {
    expect(storage.config.GAME_LEVEL).toBe(3)
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 6}})
    expect(storage.config.GAME_LEVEL).toBe(6)
  })

  it('should enforce minimum gamelevel setting', () => {
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 0}})
    expect(storage.config.GAME_LEVEL).toBe(RANGES.LEVEL.min)
  })

  it('should enforce maximum gamelevel setting', () => {
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 10}})
    expect(storage.config.GAME_LEVEL).toBe(RANGES.LEVEL.max)
  })

  it('should trigger a new game on gamelevel change', () => {
    const initialGameState = storage.game
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 5}})
    expect(storage.config.GAME_LEVEL).toBe(5)
    const currentGameState = storage.game
    expect(currentGameState).not.toStrictEqual(initialGameState)
  })

  it('should change the language setting', () => {
    expect(storage.config.LANGUAGE).toBe('en')
    const select = screen.getByLabelText('Translations')
    fireEvent.change(select, {target: {value: 'nl'}})
    expect(storage.config.LANGUAGE).toBe('nl')
  })

  it('should change the zoom setting', () => {
    expect(storage.config.FONT_SIZE).toBe(15)
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 12}})
    expect(storage.config.FONT_SIZE).toBe(12)
  })

  it('should enforce a minimum zoom setting', () => {
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 5}})
    expect(storage.config.FONT_SIZE).toBe(RANGES.FONT.min)
  })

  it('should enforce a maximum zoom setting', () => {
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 72}})
    expect(storage.config.FONT_SIZE).toBe(RANGES.FONT.max)
  })

  it('should change the name setting', () => {
    expect(storage.config.PLAYER_NAME).toBe('anonymous')
    const input = screen.getByLabelText('Name in scores')
    fireEvent.change(input, {target: {value: 'Moorefly'}})
    expect(storage.config.PLAYER_NAME).toBe('Moorefly')
  })

  it('should change the max-scores setting', () => {
    expect(storage.config.MAX_SCORES).toBe(500)
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 642}})
    expect(storage.config.MAX_SCORES).toBe(642)
  })

  it('should not instantaneously remove scores', () => {
    storage.scores = liveScores
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 33}})
    expect(storage.scores.length).toBe(liveScores.length)
  })

  it('should enforce minimum max-scores setting', () => {
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 0}})
    expect(storage.config.MAX_SCORES).toBe(RANGES.SCORES.min)
  })

  it('should enforce maximum max-scores setting', () => {
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

    it('should not change size and level and keep the current game on cancel', () => {
      const initialGameState = storage.game

      const button = screen.getByTitle('Revert to Defaults')
      fireEvent.click(button)

      const dialog = screen.getByText(/Do you want to end the game\?/i)
      expect(dialog).toBeInTheDocument()
      const cancelBtn = document.querySelector('dialog button.cancel') as HTMLButtonElement
      fireEvent.click(cancelBtn)

      const currentGameState = storage.game
      expect(currentGameState).toStrictEqual(initialGameState)
    })

    /*it('should change size and level and force a new game on confirm', () => {
      const initialGameState = storage.game

      const button = screen.getByTitle('Revert to Defaults')
      fireEvent.click(button)

      const dialog = screen.getByText(/Do you want to end the game\?/i)
      expect(dialog).toBeInTheDocument()
      const confirmBtn = document.querySelector('dialog button.confirm') as HTMLButtonElement
      fireEvent.click(confirmBtn)

      const currentGameState = storage.game
      expect(currentGameState).not.toStrictEqual(initialGameState)
    })*/
  })

  describe('in playing game state with a default challenge', () => {

    beforeEach(() => {
      setDefaultConfig()
      storage.game = playingGameState
      startConfigurePageTesting()
    })

    it('should just reset without a dialog', () => {
      const initialGameState = storage.game

      const button = screen.getByTitle('Revert to Defaults')
      fireEvent.click(button)

      const confirmBtn = document.querySelector('dialog button.confirm')
//       expect(confirmBtn).not.toBeInTheDocument()
      expect(confirmBtn).not.toBeVisible()

      const currentGameState = storage.game
      expect(currentGameState).not.toStrictEqual(initialGameState)
    })
  })
})

describe('The semantic form', () => {
  beforeEach(() => {
    startConfigurePageTesting()
  })

  it('should call function to suppress submitting', () => {
    const preventFn = vi.spyOn(fn, 'preventReloadByEnter')
    const formField = screen.getByLabelText('Name in scores')

    formField.focus()
    fireEvent.keyDown(formField, {key: 'Enter'})

    expect(formField).toBeInTheDocument()
    expect(preventFn).toHaveBeenCalled()
  })
})
