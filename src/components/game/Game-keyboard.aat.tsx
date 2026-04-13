import { Locator, userEvent } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../../__mocks__/aat-helpers'
import { newGameState, playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'
import { NORMAL } from  './../../common/defaults'
import { rootKeyListener } from '../../common/functions'
import storage from './../../common/storage'

vi.mock('./../../common/functions', { spy: true })

describe('GameCell keystrokes', () => {
  let
    screen: RenderResult,
    button: Locator

  beforeEach(async () => {
    storage.config = microConfig
    storage.game = newGameState
    screen = await renderWithApp()
    button = screen.getByRole('gridcell').nth(4)
    await button.element().focus()
  })

  it('should stop propagation for own "Enter" key', async () => {
    await userEvent.keyboard('{Enter}')
    expect(rootKeyListener).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "Spacebar" key', async () => {
    await userEvent.keyboard(' ')
    expect(rootKeyListener).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "ArrowUp" key', async () => {
    await userEvent.keyboard('{arrowUp}')
    expect(rootKeyListener).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "ArrowRight" key', async () => {
    await userEvent.keyboard('{ArrowRight}')
    expect(rootKeyListener).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "ArrowDown" key', async () => {
    await userEvent.keyboard('{ArrowDown}')
    expect(rootKeyListener).not.toHaveBeenCalled()
  })

  it('should stop propagation for own "ArrowLeft" key', async () => {
    await userEvent.keyboard('{ArrowLeft}')
    expect(rootKeyListener).not.toHaveBeenCalled()
  })

  it('should delegate unregistered key-downs to listeners up the dom tree', async () => {
    await userEvent.keyboard('_')
    expect(rootKeyListener).toHaveBeenCalled()
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
    gameButtons = screen.getByRole('gridcell')
    await gameButtons.nth(4).element().focus()
  })

  it('should accept arrowUp key to activate upper cells ', async () => {
    await userEvent.keyboard('{ArrowUp}')
    const upButton = gameButtons.nth(1)
    await expect.element(upButton).toBe(document.activeElement)
    // one more up, hit the edge, no change
    await userEvent.keyboard('{ArrowUp}')
    const edgeButton = gameButtons.nth(1)
    await expect.element(edgeButton).toBe(document.activeElement)
    expect(edgeButton).toStrictEqual(upButton)
  })

  it('should accept arrowRight keys to activate right cells', async () => {
    await userEvent.keyboard('{arrowRight}')
    const rightButton = gameButtons.nth(5)
    await expect.element(rightButton).toBe(document.activeElement)
    // one more up, hit the edge, no change
    await userEvent.keyboard('{arrowRight}')
    const edgeButton = gameButtons.nth(5)
    await expect.element(edgeButton).toBe(document.activeElement)
    expect(edgeButton).toStrictEqual(rightButton)
  })

  it('should accept ArrowDown keys to activate lower cells', async () => {
    await userEvent.keyboard('{ArrowDown}')
    const downButton = gameButtons.nth(7)
    await expect.element(downButton).toBe(document.activeElement)
    // one more up, hit the edge, no change
    await userEvent.keyboard('{ArrowDown}')
    const edgeButton = gameButtons.nth(7)
    await expect.element(edgeButton).toBe(document.activeElement)
    expect(edgeButton).toStrictEqual(downButton)
  })

  it('should accept ArrowLeft keys to activate left cells', async () => {
    await userEvent.keyboard('{ArrowLeft}')
    const leftButton = gameButtons.nth(3)
    await expect.element(leftButton).toBe(document.activeElement)
    // one more up, hit the edge, no change
    await userEvent.keyboard('{ArrowLeft}')
    const edgeButton = gameButtons.nth(3)
    await expect.element(edgeButton).toBe(document.activeElement)
    expect(edgeButton).toStrictEqual(leftButton)
  })
})


describe('Global keystrokes for accessibility', () => {
  beforeEach(() => {
    storage.config = microConfig
    storage.session = { ...NORMAL, ACTIVE_CELL_ID: 'row1col2' }
  })

  it('should show a clean interface and therefore not focus the current cell in a new game', async () => {
    storage.game = newGameState
    await renderWithApp()

    expect(document.querySelectorAll('button[role=gridcell]')).not.toContain(document.activeElement)
  })

  it('should focus the current cell in a playing game', async () => {
    storage.game = playingGameState
    await renderWithApp()

    expect(document.querySelectorAll('button[role=gridcell]')).toContain(document.activeElement)
  })

  it('and accept Arrows to store the cell id', async () => {
    storage.game = playingGameState
    const screen = await renderWithApp()
    await screen.getByRole('gridcell').first().click()

    await vi.waitFor(async () => {
      expect(storage.session['ACTIVE_CELL_ID']).toBe('row0col0')
    })

    await userEvent.keyboard('{ArrowRight}')

    await vi.waitFor(async () => {
      expect(storage.session['ACTIVE_CELL_ID']).toBe('row0col1')
    })
  })
})

