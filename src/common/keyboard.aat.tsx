import { Locator, userEvent } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../__mocks__/aat-helpers'
import { liveScores } from '../__mocks__/scores'
import { rootKeyListener, focusFirstNavButton } from './functions'
import storage from './storage'
import { ScoreItem } from './game.d'

vi.mock('./functions', { spy: true })

describe('Flip focus', () => {
  const altTabEvent = {
    altKey: true, bubbles: true, charCode: 0, code: "Tab", isTrusted: true,
    key: "Tab", keyCode: 9, stopPropagation: () => {}, type: "keydown"
  } as KeyboardEvent

  describe('between landmarks', () => {
    it('should set focus somewhere', async () => {
      // try on structure-wise most standard screen
      const screen = await renderWithApp('Configure')
      expect(document.body).toBe(document.activeElement)

      // await userEvent.tab({ alt: true })
      await userEvent.keyboard('{Alt>}{Tab}{/Alt}')
      expect(rootKeyListener).toHaveBeenCalled()
      // the second cell gets focus, instead of the first
      // await expect.element(screen.getByRole('main').getByRole('slider').first()).toBe(document.activeElement)
      await expect.element(screen.getByRole('main')).toContain(document.activeElement)

      await userEvent.keyboard('{Alt>}{Tab}{/Alt}')
      expect(rootKeyListener).toHaveBeenCalled()
      // the second button gets focus, instead of the first
      // await expect.element(screen.getByRole('navigation').getByRole('button').first()).toBe(document.activeElement)
      await expect.element(screen.getByRole('navigation')).toContain(document.activeElement)
    })
  })

  describe('between controls in board and tips sections and navigation landmark', () => {
    let
      screen: RenderResult

    beforeEach(async () => {
      screen = await renderWithApp()
    })

    it('should move focus from control in navigation to first control in board', async () => {
      const navButton = screen.getByRole('navigation').getByTitle('Description')
      await navButton.element().focus()
      expect(navButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      await vi.waitFor(async () => {
        await expect.element(screen.getByRole('gridcell').first()).toBe(document.activeElement)
      })
    })

    it('should move focus from control in board to the "New Game" button, the first control in toolbar', async () => {
      const boardCell = screen.getByRole('gridcell').first()
      await boardCell.element().focus()
      expect(boardCell).toHaveFocus()
      rootKeyListener(altTabEvent)

      await vi.waitFor(async () => {
        await expect.element(screen.getByRole('toolbar').getByRole('button').first()).toBe(document.activeElement)
        await expect.element(screen.getByRole('toolbar').getByTitle('New Game')).toBe(document.activeElement)
      })
    })

    it('should move focus from control in toolbar to the "New Game" button, the first control in navigation', async () => {
      const toolButton = screen.getByRole('toolbar').getByRole('button').first()
      await toolButton.element().focus()
      expect(toolButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      await vi.waitFor(async () => {
        await expect.element(screen.getByRole('navigation').getByRole('button').first()).toBe(document.activeElement)
        await expect.element(screen.getByRole('navigation').getByTitle('New Game')).toBe(document.activeElement)
      })
    })
  })

  describe('between controls in main and navigation landmarks, Configure screen', () => {
    let
      screen: RenderResult

    beforeEach(async () => {
      screen = await renderWithApp('Configure')
    })

    it('should move focus from control in navigation to first control in main', async () => {
      const navButton = screen.getByRole('navigation').getByTitle('Description')
      await navButton.element().focus()
      expect(navButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      await vi.waitFor(async () => {
        await expect.element(screen.getByRole('main').getByRole('slider').first()).toBe(document.activeElement)
      })
    })

    it('should move focus from control in main to the "Revert to Defaults" button, the first control in navigation', async () => {
      const mainInput = screen.getByRole('main').getByLabelText('Gamelevel')
      await mainInput.element().focus()
      expect(mainInput).toHaveFocus()
      rootKeyListener(altTabEvent)

      await vi.waitFor(async () => {
        await expect.element(screen.getByRole('navigation').getByRole('button').first()).toBe(document.activeElement)
        await expect.element(screen.getByRole('navigation').getByTitle('Revert to Defaults')).toBe(document.activeElement)
       })
    })
  })

  describe('between controls in main and navigation landmarks, Hall of Fame screen', () => {
    let
      screen: RenderResult

    beforeEach(async () => {
      storage.scores = liveScores as ScoreItem[]
      screen = await renderWithApp('HallOfFame')
    })

    it('should move focus from control in main to the "Clear List" button, the first control in navigation', async () => {
      const mainButton = screen.getByRole('main').getByRole('button').last()
      await mainButton.element().focus()
      expect(mainButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      await vi.waitFor(async () => {
        await expect.element(screen.getByRole('navigation').getByRole('button').first()).toBe(document.activeElement)
        await expect.element(screen.getByRole('navigation').getByTitle('Clear List')).toBe(document.activeElement)
       })
    })
  })

  describe('between available controls at about page', () => {
    let
      screen: RenderResult,
      aButton: Locator,
      firstButton: Locator,
      lastButton: Locator

    beforeEach(async () => {
      screen = await renderWithApp('About')
      aButton = screen.getByRole('navigation').getByTitle('Settings')
      const allButtons = screen.getByRole('button')
      firstButton = allButtons.first()
      lastButton = allButtons.last()
    })

    it('should first not be the last', async () => {
      await expect(firstButton.element()).not.toBe(lastButton.element())
    })

    it('should move focus from a control to first control', async () => {
      aButton?.element().focus()
      expect(aButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      expect(firstButton).toHaveFocus()
    })

    it('should move focus from last control to first control', async () => {
      lastButton?.element().focus()
      expect(lastButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      expect(firstButton).toHaveFocus()
    })

    it('should move focus from first control to last control', async () => {
      firstButton?.element().focus()
      expect(firstButton).toHaveFocus()
      rootKeyListener(altTabEvent)

      expect(lastButton).toHaveFocus()
    })
  })
})


describe('focusFirstNavButton', () => {
  it('should move focus to first button in navigation landmark', async () => {
    const screen = await renderWithApp()
    const firstNavButton = screen.getByRole('navigation').getByRole('button').first()
    focusFirstNavButton()
    vi.advanceTimersByTime(1000)

    expect(firstNavButton).toHaveFocus()
  })
})


describe('pollGameCell', () => {
  const altBackspaceEvent = {
    altKey: true, bubbles: true, charCode: 0, code: "Backspace", isTrusted: true,
    key: "Backspace", keyCode: 8, stopPropagation: () => {}, type: "keydown"
  } as KeyboardEvent

  describe('on page screen', () => {
    let
      screen: RenderResult,
      gameBoard: Locator

    beforeEach(async () => {
      screen = await renderWithApp()
      expect(document.body).toBe(document.activeElement)
      gameBoard = screen.getByRole('grid')
    })

    it('should focus and open a random cell', async () => {
      rootKeyListener(altBackspaceEvent)
      await expect.element(gameBoard).toContain(document.activeElement)
      const targetButton = document.activeElement as HTMLElement

      expect(targetButton.id).toMatch(/row\dcol\d/i)
      await expect.element(targetButton).toHaveClass('touched')
      await expect.element(targetButton).toHaveFocus()
    })

    it('should not act when game ended', async () => {
      // first end the game
      const gameCells = gameBoard.getByRole('gridcell').elements()
      for (const cell of gameCells) {
        await cell.focus()
        await userEvent.keyboard('{Enter}')
        await cell.blur()
      }
      // then press alt+backspace
      rootKeyListener(altBackspaceEvent)
      expect(document.body).toBe(document.activeElement)
    })

    it('should not act when not viewing game-board', async () => {
      document.querySelector('#game-board')?.remove()
      rootKeyListener(altBackspaceEvent)
      expect(document.body).toBe(document.activeElement)
    })
  })
})

