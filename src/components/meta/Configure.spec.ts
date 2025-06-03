import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import { startConfigurePageTesting, referAndNavigateTo,
  setDefaultConfig, getStoredConfig, getStoredScores
} from './../../__mocks__/helpers'
import { playingGameState } from './../../__mocks__/game-states'
import { liveScores } from './../../__mocks__/scores'
import { defaultChallengeConfig, microConfig } from './../../__mocks__/configs'

describe('The configure page sidebar', () => {
  beforeEach(() => {
    startConfigurePageTesting()
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
    expect(getStoredConfig().BOARD_SIZE).toBe(6)
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 8}})
    expect(getStoredConfig().BOARD_SIZE).toBe(8)
  })

  test("should enforce minimum board-size setting", () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 2}})
    expect(getStoredConfig().BOARD_SIZE).toBe(3)
  })

  test("should enforce maximum board-size setting", () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 10}})
    expect(getStoredConfig().BOARD_SIZE).toBe(8)
  })

  test("should trigger a new game on board-size change", () => {
    const initialGameState = sessionStorage.getItem('mv-game')
    const range = screen.getByLabelText('Gameboard dimensions')
    fireEvent.change(range, {target: {value: 7}})
    expect(getStoredConfig().BOARD_SIZE).toBe(7)
    const currentGameState = sessionStorage.getItem('mv-game')
    expect(currentGameState).not.toBe(initialGameState)
  })

  test("should change the gamelevel setting", () => {
    expect(getStoredConfig().GAME_LEVEL).toBe(3)
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 6}})
    expect(getStoredConfig().GAME_LEVEL).toBe(6)
  })

  test("should enforce minimum gamelevel setting", () => {
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 0}})
    expect(getStoredConfig().GAME_LEVEL).toBe(1)
  })

  test("should enforce maximum gamelevel setting", () => {
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 10}})
    expect(getStoredConfig().GAME_LEVEL).toBe(6)
  })

  test("should trigger a new game on gamelevel change", () => {
    const initialGameState = sessionStorage.getItem('mv-game')
    const range = screen.getByLabelText('Gamelevel')
    fireEvent.change(range, {target: {value: 5}})
    expect(getStoredConfig().GAME_LEVEL).toBe(5)
    const currentGameState = sessionStorage.getItem('mv-game')
    expect(currentGameState).not.toBe(initialGameState)
  })

  test("should change the language setting", () => {
    expect(getStoredConfig().LANGUAGE).toBe('en')
    const select = screen.getByLabelText('Translations')
    fireEvent.change(select, {target: {value: 'nl'}})
    expect(getStoredConfig().LANGUAGE).toBe('nl')
  })

  test("should change the zoom setting", () => {
    expect(getStoredConfig().FONT_SIZE).toBe(15)
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 12}})
    expect(getStoredConfig().FONT_SIZE).toBe(12)
  })

  test("should enforce a minimum zoom setting", () => {
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 9}})
    expect(getStoredConfig().FONT_SIZE).toBe(12)
  })

  test("should enforce a maximum zoom setting", () => {
    const range = screen.getByLabelText('Zoom display')
    fireEvent.change(range, {target: {value: 72}})
    expect(getStoredConfig().FONT_SIZE).toBe(36)
  })

  test("should change the name setting", () => {
    expect(getStoredConfig().PLAYER_NAME).toBe('anonymous')
    const input = screen.getByLabelText('Name in scores')
    fireEvent.change(input, {target: {value: 'Moorefly'}})
    expect(getStoredConfig().PLAYER_NAME).toBe('Moorefly')
  })

  test("should change the max-scores setting", () => {
    expect(getStoredConfig().MAX_SCORES).toBe(500)
    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 642}})
    expect(getStoredConfig().MAX_SCORES).toBe(642)
  })

  test("should not instantaneously remove scores", () => {
    localStorage.setItem('mv-scores', JSON.stringify(liveScores))
    expect(getStoredScores().length).toBe(62)

    const range = screen.getByLabelText('Max records')
    fireEvent.change(range, {target: {value: 33}})
    expect(getStoredScores().length).toBe(62)
  })

})

describe('The configure-page reset button', () => {
  describe('in playing game state with a non-default challenge', () => {

    beforeEach(() => {
//         setMicroConfig() // test errors in html on test.intro.minesweeper_1
      const config_NO_LANGUAGE = { ...microConfig, LANGUAGE: undefined }
      localStorage.setItem('mv-config', JSON.stringify(config_NO_LANGUAGE))
      sessionStorage.setItem('mv-game', JSON.stringify(playingGameState))
      startConfigurePageTesting()
    })

    test("should not change size and level and keep the current game on cancel", () => {
      const initialGameState = sessionStorage.getItem('mv-game')

      const icon = screen.getByText(/↺/i)
      fireEvent.click(icon)

      const dialog = screen.getByText(/Do you want to end the game\?/i)
      expect(dialog).toBeInTheDocument()
      const cancelBtn = document.querySelector('dialog button.cancel') as HTMLButtonElement
      fireEvent.click(cancelBtn)

      const currentGameState = sessionStorage.getItem('mv-game')
      expect(currentGameState).toBe(initialGameState)
    })

    test("should change size and level and force a new game on confirm", () => {
      const initialGameState = sessionStorage.getItem('mv-game')

      const icon = screen.getByText(/↺/i)
      fireEvent.click(icon)

      const dialog = screen.getByText(/Do you want to end the game\?/i)
      expect(dialog).toBeInTheDocument()
      const confirmBtn = document.querySelector('dialog button.confirm') as HTMLButtonElement
      fireEvent.click(confirmBtn)

      const currentGameState = sessionStorage.getItem('mv-game')
      expect(currentGameState).not.toBe(initialGameState)
    })
  })

  describe('in playing game state with a default challenge', () => {

    beforeEach(() => {defaultChallengeConfig
//         setMicroConfig() // test errors in html on test.intro.minesweeper_1
      const config_NO_LANGUAGE = { ...defaultChallengeConfig, LANGUAGE: undefined }
      localStorage.setItem('mv-config', JSON.stringify(config_NO_LANGUAGE))
      sessionStorage.setItem('mv-game', JSON.stringify(playingGameState))
      startConfigurePageTesting()
    })

    test("should just reset without a dialog", () => {
      const initialGameState = sessionStorage.getItem('mv-game')

      const icon = screen.getByText(/↺/i)
      fireEvent.click(icon)

      const confirmBtn = document.querySelector('dialog button.confirm')
      expect(confirmBtn).not.toBeInTheDocument()

      const currentGameState = sessionStorage.getItem('mv-game')
      expect(currentGameState).not.toBe(initialGameState)
    })
  })
})
