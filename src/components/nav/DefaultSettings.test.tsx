
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import DEFAULTS from './../../common/defaults'
import storage from './../../common/storage'
import DefaultSettings from './DefaultSettings'
import { microConfig, defaultChallengeConfig, simpleHardConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState, wonGameState } from './../../__mocks__/game-states'
import { renderInContext, renderInProvider } from './../../__mocks__/render-helpers'

describe('DefaultSettings Component', () => {
  let configure: () => void

  beforeEach(() => {
    storage.eraseGame()
    configure = jest.fn()
  })

  test('should display the "Revolve Back" sign', () => {
    renderInContext(<DefaultSettings />)
    const button = screen.getByText(/↺/i)
    expect(button).toBeInTheDocument()
  })

  test('should effect default config when clicked and no game is open (spy)', () => {
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked and no game is open (storage)', () => {
    storage.config = microConfig
    renderInProvider(<DefaultSettings />)
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(storage.config).toStrictEqual(DEFAULTS)
  })

  test('should effect default config when clicked while game is not touched', () => {
    storage.game = newGameState
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is lost', () => {
    storage.game = lostGameState
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is won', () => {
    storage.game = wonGameState
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is playing and challenge is as in default', () => {
    storage.game = playingGameState
    renderInContext(<DefaultSettings />, { config: defaultChallengeConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  describe('Modal integration, check storage', () => {
    let spyShowModal: jest.SpyInstance

    beforeEach(() => {
      spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test(`should keep the same config and show no visual feedback
      when dialog was cancelled
      in playing game with non-standard challenge`, () => {
      storage.game = playingGameState
      storage.config = simpleHardConfig
      renderInProvider(<DefaultSettings />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(spyShowModal).toHaveBeenCalledTimes(1)
      const cancelDialog = screen.getByText(/Cancel/i)
      fireEvent.click(cancelDialog)
      expect(button.className).not.toContain('active')
      expect(storage.config).toStrictEqual(simpleHardConfig)
    })

    test(`should revert to default config and show visual feedback
      when dialog was confirmed
      in playing game with non-standard challenge`, () => {
      storage.game = playingGameState
      storage.config = simpleHardConfig
      renderInProvider(<DefaultSettings />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(spyShowModal).toHaveBeenCalledTimes(1)
      const confirmDialog = screen.getByText(/OK/i)
      fireEvent.click(confirmDialog)
      expect(button.className).toContain('active')
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

    test(`should revert to default config and show visual feedback
      in ended game with non-standard challenge`, () => {
      storage.game = lostGameState
      storage.config = simpleHardConfig
      renderInProvider(<DefaultSettings />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(button.className).toContain('active')
      expect(storage.config).toStrictEqual(DEFAULTS)
    })
  })
})
