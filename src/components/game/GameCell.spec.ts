import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { vi, MockInstance } from 'vitest'
import userEvent, { UserEvent } from '@testing-library/user-event'
import * as fn from '../../common/functions'
import storage from './../../common/storage'
import { getButtonFromState, startPageTesting } from './../../__mocks__/specification-helpers'
import { newGameState, playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'

describe('GameCell keystrokes', () => {
  let button!: HTMLButtonElement,
    flipFocusSpy: MockInstance,
    user: UserEvent

  beforeEach(async () => {
    // flipFocus listener is applied high in the DOM tree
    flipFocusSpy = vi.spyOn(fn, 'flipFocus')
    storage.config = microConfig
    storage.game = newGameState
    user = userEvent.setup()
    startPageTesting()
    button = document.querySelector('.pristine') as HTMLButtonElement
    button.focus()
  })

  it('should stop propagation for own "Enter" key', async () => {
    await waitFor(() => user.keyboard('{Enter}'))
    expect(flipFocusSpy).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "Spacebar" key', async () => {
    await waitFor(() => user.keyboard(' '))
    expect(flipFocusSpy).not.toHaveBeenCalled()
  })

  // TODO does not work for arrows; all expections fail, all test ArrowUp
  // also find a positive test event.stopPropagation toHaveBeenCalled
  it.skip('should stop propagation for own "ArrowUp" key', async () => {
    await waitFor(() => user.keyboard('{arrowUp}'))
    expect(flipFocusSpy).not.toHaveBeenCalled()
  })

  it.skip('should stop propagation for own "ArrowRight" key', async () => {
    await waitFor(() => user.keyboard('{ArrowRight}'))
    expect(flipFocusSpy).not.toHaveBeenCalled()
  })

  it.skip('should stop propagation for own "ArrowDown" key', async () => {
    await waitFor(() => user.keyboard('{ArrowDown}'))
    expect(flipFocusSpy).not.toHaveBeenCalled()
  })

  it.skip('should stop propagation for own "ArrowLeft" key', async () => {
    await waitFor(() => user.keyboard('{ArrowLeft}'))
    expect(flipFocusSpy).not.toHaveBeenCalled()
  })

  // this must be the last keyboard test
  it('should leave unregistered keysdowns to listeners up the dom tree', async () => {
    await waitFor(() => user.keyboard('_'))
    expect(flipFocusSpy).toHaveBeenCalled()
  })
})

describe('navigate gameboard by keyboard', () => {
  let initialButton: HTMLButtonElement,
    user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    storage.config = microConfig
    storage.game = playingGameState
    startPageTesting()
    initialButton = getButtonFromState({ row: 1, col: 1,  fill: 0 })
  })

  it('should accept arrowUp key to activate upper cells ', async () => {
    initialButton.focus()
    await waitFor(() => user.keyboard('{ArrowUp}'))
    const upButton = getButtonFromState({ row: 0, col: 1,  fill: 0 })
    expect(document.activeElement).toBe(upButton)
    // one more up, hit the edge, no change
    await waitFor(() => user.keyboard('{ArrowUp}'))
    const edgeButton = getButtonFromState({ row: 0, col: 1,  fill: 0 })
    expect(document.activeElement).toBe(edgeButton)
    expect(edgeButton).toBe(upButton)
  })

  it('should accept arrowRight keys to activate right cells', async () => {
    initialButton.focus()
    await waitFor(() => user.keyboard('{ArrowRight}'))
    const rightButton = getButtonFromState({ row: 1, col: 2,  fill: 0 })
    expect(document.activeElement).toBe(rightButton)
    // one more right, hit the edge, no change
    await waitFor(() => user.keyboard('{ArrowRight}'))
    const edgeButton = getButtonFromState({ row: 1, col: 2,  fill: 0 })
    expect(document.activeElement).toBe(edgeButton)
    expect(edgeButton).toBe(rightButton)
  })

  it('should accept ArrowDown keys to activate lower cells', async () => {
    initialButton.focus()
    await waitFor(() => user.keyboard('{ArrowDown}'))
    const downButton = getButtonFromState({ row: 2, col: 1,  fill: 0 })
    expect(document.activeElement).toBe(downButton)
    // one more down, hit the edge, no change
    await waitFor(() => user.keyboard('{ArrowDown}'))
    const edgeButton = getButtonFromState({ row: 2, col: 1,  fill: 0 })
    expect(document.activeElement).toBe(edgeButton)
    expect(edgeButton).toBe(downButton)
  })

  it('should accept ArrowLeft keys to activate left cells', async () => {
    initialButton.focus()
    await waitFor(() => user.keyboard('{ArrowLeft}'))
    const leftButton = getButtonFromState({ row: 1, col: 0,  fill: 0 })
    expect(document.activeElement).toBe(leftButton)
    // one more left, hit the edge, no change
    await waitFor(() => user.keyboard('{ArrowLeft}'))
    const edgeButton = getButtonFromState({ row: 1, col: 0,  fill: 0 })
    expect(document.activeElement).toBe(edgeButton)
    expect(edgeButton).toBe(leftButton)
  })
})
