import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Locator, userEvent } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../../__mocks__/aat-helpers'
import { newGameState, playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'
import { flipFocus } from '../../common/functions'
import storage from './../../common/storage'

describe('GameCell keystrokes', () => {
  vi.mock('./../../common/functions', { spy: true })

  let
    screen: RenderResult,
    button: Locator

  beforeEach(async () => {
    storage.config = microConfig
    storage.game = newGameState
    screen = await renderWithApp()
    button = screen.getByRole('main').getByRole('button').first()
    await button.element().focus()
  })

  it('should stop propagation for own "Enter" key', async () => {
    await vi.waitFor(() => userEvent.keyboard('{Enter}'))
    expect(flipFocus).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "Spacebar" key', async () => {
    await vi.waitFor(() => userEvent.keyboard(' '))
    expect(flipFocus).not.toHaveBeenCalled()
  })

  // TODO does not work for arrows; all expections fail for ArrowUp and ArrowLeft
  it.skip('should stop propagation for own "ArrowUp" key', async () => {
    await userEvent.keyboard('{arrowUp}')
    await vi.waitFor(() => expect(flipFocus).not.toHaveBeenCalled())
  })

  it('should stop propagation for own "ArrowRight" key', async () => {
    await userEvent.keyboard('{ArrowRight}')
    await vi.waitFor(() => expect(flipFocus).not.toHaveBeenCalled())
  })

  it('should stop propagation for own "ArrowDown" key', async () => {
    await userEvent.keyboard('{ArrowDown}')
    await vi.waitFor(() => expect(flipFocus).not.toHaveBeenCalled())
  })

  it.skip('should stop propagation for own "ArrowLeft" key', async () => {
    await userEvent.keyboard('{ArrowLeft}')
    await vi.waitFor(() => expect(flipFocus).not.toHaveBeenCalled())
  })

  it('should delegate unregistered keysdowns to listeners up the dom tree', async () => {
    await userEvent.keyboard('_')
    await vi.waitFor(() => expect(flipFocus).toHaveBeenCalled())
  })
})

describe('navigate gameboard by keyboard', () => {
  let
    screen: RenderResult,
    gameButtons: Locator

  beforeEach(async () => {
    storage.config = microConfig
    storage.game = playingGameState
    screen = await renderWithApp()
    gameButtons = screen.getByRole('main').getByRole('button')
    await gameButtons.nth(4).element().focus()
  })

  it('should accept arrowUp key to activate upper cells ', async () => {
    await userEvent.keyboard('{ArrowUp}')
    const upButton = gameButtons.nth(1)
    await vi.waitFor(() => expect(upButton.element()).toBe(document.activeElement))
    // one more up, hit the edge, no change
    await userEvent.keyboard('{ArrowUp}')
    const edgeButton = gameButtons.nth(1)
    await vi.waitFor(() => expect(edgeButton.element()).toBe(document.activeElement))
    expect(edgeButton).toStrictEqual(upButton)
  })

  it('should accept arrowRight keys to activate right cells', async () => {
    await userEvent.keyboard('{arrowRight}')
    const fwdButton = gameButtons.nth(5)
    await vi.waitFor(() => expect(fwdButton.element()).toBe(document.activeElement))
    // one more up, hit the edge, no change
    await userEvent.keyboard('{arrowRight}')
    const edgeButton = gameButtons.nth(5)
    await vi.waitFor(() => expect(edgeButton.element()).toBe(document.activeElement))
    expect(edgeButton).toStrictEqual(fwdButton)
  })

  it('should accept ArrowDown keys to activate lower cells', async () => {
    await userEvent.keyboard('{ArrowDown}')
    const downButton = gameButtons.nth(7)
    await vi.waitFor(() => expect(downButton.element()).toBe(document.activeElement))
    // one more up, hit the edge, no change
    await userEvent.keyboard('{ArrowDown}')
    const edgeButton = gameButtons.nth(7)
    await vi.waitFor(() => expect(edgeButton.element()).toBe(document.activeElement))
    expect(edgeButton).toStrictEqual(downButton)
  })

  it('should accept ArrowLeft keys to activate left cells', async () => {
    await userEvent.keyboard('{ArrowLeft}')
    const rewButton = gameButtons.nth(3)
    await vi.waitFor(() => expect(rewButton.element()).toBe(document.activeElement))
    // one more up, hit the edge, no change
    await userEvent.keyboard('{ArrowLeft}')
    const edgeButton = gameButtons.nth(3)
    await vi.waitFor(() => expect(edgeButton.element()).toBe(document.activeElement))
    expect(edgeButton).toStrictEqual(rewButton)
  })

})
