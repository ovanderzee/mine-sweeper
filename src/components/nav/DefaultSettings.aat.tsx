
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { renderInApp, renderInPage } from './../../__mocks__/aat-helpers'
import { microConfig, defaultChallengeConfig } from './../../__mocks__/configs'
import { newGameState, playingGameState, lostGameState, wonGameState } from './../../__mocks__/game-states'
import DEFAULTS from './../../common/defaults'
import storage from './../../common/storage'
import { GameState } from './../../common/game.d'
import { AppConfig } from './../../common/app.d'
import DefaultSettings from './DefaultSettings'

describe('DefaultSettings Component in PageContext', () => {

  it('should display the "Revolve Back" sign', async () => {
    const screen = await renderInPage(<DefaultSettings />)

    expect(screen.getByTitle('Revert to Defaults')).toBeInTheDocument()
    expect(screen.getByLabelText('counterclockwise revolving arrow')).toBeInTheDocument()
  })

  describe('should effect default config when clicked', () => {
    let configure: () => void,
      screen: RenderResult

    beforeEach(async () => {
      storage.eraseGame()
      configure = vi.fn()
    })

    const startWithContext = (async (gameState: GameState | null, config: AppConfig) => {
      if (gameState) storage.game = gameState
      screen = await renderInPage(<DefaultSettings />, { config, configure })
      await screen.getByTitle('Revert to Defaults').click()
    })

    it('and no game is open (spy)', async () => {
      await startWithContext(null, microConfig)
      expect(configure).toHaveBeenCalledTimes(1)
      expect(configure).toHaveBeenCalledWith()
    })

    it('and game is new (spy)', async () => {
      await startWithContext(newGameState, microConfig)
      expect(configure).toHaveBeenCalledTimes(1)
      expect(configure).toHaveBeenCalledWith()
    })

    it('and game is playing and action is cancelled (spy)', async () => {
      await startWithContext(playingGameState, microConfig)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      await dialog.getByRole('button', {name: 'Cancel'}).click()
      expect(configure).not.toHaveBeenCalled()
    })

    it('and game is playing and action is confirmed (spy)', async () => {
      await startWithContext(playingGameState, microConfig)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      await dialog.getByRole('button', {name: 'Ok'}).click()
      expect(configure).toHaveBeenCalledTimes(1)
      expect(configure).toHaveBeenCalledWith()
    })

    it('and game is playing with default challenge (spy)', async () => {
      await startWithContext(playingGameState, defaultChallengeConfig)
      const dialog = screen.getByRole('dialog')
      expect(dialog).not.toBeInTheDocument()
      expect(configure).toHaveBeenCalledTimes(1)
      expect(configure).toHaveBeenCalledWith()
    })

    it('and game is lost (spy)', async () => {
      await startWithContext(lostGameState, microConfig)
      expect(configure).toHaveBeenCalledTimes(1)
      expect(configure).toHaveBeenCalledWith()
    })

    it('and game is won (spy)', async () => {
      await startWithContext(wonGameState, microConfig)
      expect(configure).toHaveBeenCalledTimes(1)
      expect(configure).toHaveBeenCalledWith()
    })

  })

  describe('should effect default config when clicked', () => {
    let screen: RenderResult

    beforeEach(async () => {
      storage.eraseGame()
    })

    const startWithProvider = (async (gameState: GameState | null, config: AppConfig) => {
      if (gameState) storage.game = gameState
      if (config) storage.config = config
      screen = await renderInApp(<DefaultSettings />)
      await screen.getByTitle('Revert to Defaults').click()
    })

    it('and no game is open (storage)', async () => {
      await startWithProvider(null, microConfig)
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

    it('and game is new (storage)', async () => {
      await startWithProvider(newGameState, microConfig)
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

    it('and game is playing and action is cancelled (storage)', async () => {
      await startWithProvider(playingGameState, microConfig)
      const dialog = screen.getByRole('dialog')
      await dialog.getByRole('button', {name: 'Cancel'}).click()
      expect(storage.config).toStrictEqual(microConfig)
    })

    it('and game is playing and action is confirmed (storage)', async () => {
      await startWithProvider(playingGameState, microConfig)
      const dialog = screen.getByRole('dialog')
      await dialog.getByRole('button', {name: 'Ok'}).click()
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

    it('and game is playing with default challenge (storage)', async () => {
      await startWithProvider(playingGameState, defaultChallengeConfig)
      const dialog = screen.getByRole('dialog')
      expect(dialog).not.toBeInTheDocument()
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

    it('and game is lost (storage)', async () => {
      await startWithProvider(lostGameState, microConfig)
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

    it('and game is won (storage)', async () => {
      await startWithProvider(wonGameState, microConfig)
      expect(storage.config).toStrictEqual(DEFAULTS)
    })

  })

  describe('should provide visual feedback when settings were reverted', () => {
    let screen: RenderResult

    const startWithProvider = (async (gameState: GameState, config: AppConfig) => {
      if (gameState) storage.game = gameState
      if (config) storage.config = config
      screen = await renderInApp(<DefaultSettings />)
      const button = screen.getByTitle('Revert to Defaults')
      await button.click()
      return button.element()
    })

    it('and game is new (feedback)', async () => {
      const buttonElement = await startWithProvider(newGameState, microConfig)
      expect(buttonElement.className).toContain('active')
     })

    it('and game is playing and action is cancelled (feedback)', async () => {
      const buttonElement = await startWithProvider(playingGameState, microConfig)
      const dialog = screen.getByRole('dialog')
      await dialog.getByRole('button', {name: 'Cancel'}).click()
      expect(buttonElement.className).not.toContain('active')
    })

    it('and game is playing and action is confirmed (feedback)', async () => {
      const buttonElement = await startWithProvider(playingGameState, microConfig)
      const dialog = screen.getByRole('dialog')
      await dialog.getByRole('button', {name: 'Ok'}).click()
      expect(buttonElement.className).toContain('active')
    })

    it('and game is playing with default challenge (feedback)', async () => {
      const buttonElement = await startWithProvider(playingGameState, defaultChallengeConfig)
      expect(buttonElement.className).toContain('active')
    })

    it('and game is lost (feedback)', async () => {
      const buttonElement = await startWithProvider(lostGameState, microConfig)
      expect(buttonElement.className).toContain('active')
    })

    it('and game is won (feedback)', async () => {
      const buttonElement = await startWithProvider(wonGameState, microConfig)
      expect(buttonElement.className).toContain('active')
    })

  })
})
