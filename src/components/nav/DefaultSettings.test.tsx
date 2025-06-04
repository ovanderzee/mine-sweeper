
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import DEFAULTS from './../../common/defaults'
import DefaultSettings from './DefaultSettings'
import { microConfig, defaultChallengeConfig, simpleHardConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState, wonGameState } from './../../__mocks__/game-states'
import { renderInContext, renderInProvider } from './../../__mocks__/render-helpers'

describe('DefaultSettings Component', () => {
  let configure: () => {}, spyShowModal: jest.SpyInstance

  beforeEach(() => {
    sessionStorage.removeItem('mv-game')
    localStorage.removeItem('mv-config')
    configure = jest.fn()
    spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
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
    renderInProvider(<DefaultSettings />)
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(localStorage.getItem('mv-config')).toBe(JSON.stringify(DEFAULTS))
  })

  test('should effect default config when clicked while game is not touched', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(newGameState))
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is lost', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(lostGameState))
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is won', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(wonGameState))
    renderInContext(<DefaultSettings />, { config: microConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is playing and challenge is as in default', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(playingGameState))
    renderInContext(<DefaultSettings />, { config: defaultChallengeConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith()
  })

  test('should effect default config when clicked while game is playing and challenge is different', () => {
    sessionStorage.setItem('mv-game', JSON.stringify(playingGameState))
    renderInContext(<DefaultSettings />, { config: simpleHardConfig, configure })
    const button = screen.getByText(/↺/i)
    fireEvent.click(button)
    expect(spyShowModal).toHaveBeenCalledTimes(1)
    const cancelDialog = screen.getByText(/Cancel/i)
    fireEvent.click(cancelDialog)
    expect(configure).toHaveBeenCalledTimes(0)
    const effectDialog = screen.getByText(/Ok/i)
    fireEvent.click(effectDialog)
    expect(configure).toHaveBeenCalledTimes(1)
  })

})
