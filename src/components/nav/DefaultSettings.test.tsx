
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
    storage.game = null
    configure = jest.fn()
  })

  test('should display the "Revolve Back" sign', () => {
    renderInContext(<DefaultSettings />)
    const button = screen.getByTitle('Revert to Defaults')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-reset"]')
    expect(svg).toBeInTheDocument()
  })

  test('should effect default config when clicked and no game is open (spy)', () => {
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked and no game is open (storage)', () => {
    storage.config = microConfig
    renderInProvider(<DefaultSettings />)
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(storage.config).toStrictEqual(DEFAULTS)
  })

  test('should effect default config when clicked while game is not touched', () => {
    storage.game = newGameState
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is lost', () => {
    storage.game = lostGameState
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is won', () => {
    storage.game = wonGameState
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is playing and challenge is as in default', () => {
    storage.game = playingGameState
    renderInContext(<DefaultSettings />, { config: defaultChallengeConfig, configure })
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
  })

  test('should effect default config when clicked while game is playing and challenge is different', () => {
    storage.game = playingGameState
    const spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
    renderInContext(<DefaultSettings />, { config: simpleHardConfig, configure })
    const button = screen.getByTitle('Revert to Defaults')
    fireEvent.click(button)
    expect(spyShowModal).toHaveBeenCalledTimes(1)
    const cancelDialog = screen.getByText(/Cancel/i)
    fireEvent.click(cancelDialog)
    expect(configure).toHaveBeenCalledTimes(0)
    const effectDialog = screen.getByText(/OK/i)
    fireEvent.click(effectDialog)
    expect(configure).toHaveBeenCalledTimes(1)
  })

})
