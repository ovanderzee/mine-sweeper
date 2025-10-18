import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { act, fireEvent, screen, within } from '@testing-library/react'
import { referAndNavigateTo, startPageTesting } from '../__mocks__/specification-helpers'
import { interactionSelectors } from './functions'

describe('Flip focus', () => {
  let keyTarget: HTMLElement | null

  beforeEach(() => {
    startPageTesting()
    vi.advanceTimersByTimeAsync(50)
    keyTarget = document.querySelector('section.screen')
  })

  afterEach(() => {
    vi.runAllTimers()
  })

  describe('between controls in content and nav areas', () => {
    let contentArea: HTMLElement | null, navArea: HTMLElement | null

    beforeEach(() => {
      referAndNavigateTo.config()
      contentArea = keyTarget?.querySelector('form') || null
      navArea = keyTarget?.querySelector('nav') || null
    })

    it('should move focus from control in nav to first control in content', async () => {
      const aButtonInNav = navArea ? await screen.getByTitle('Explanation') : null
      aButtonInNav?.focus()
      expect(aButtonInNav).toHaveFocus()
      keyTarget && fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      const firstButtonInCnt = contentArea ? await screen.getByLabelText('Gameboard dimensions', {selector: 'input'}) : null
      expect(firstButtonInCnt).toHaveFocus()
    })

    it('should move focus from control in content to last control in nav', async () => {
      const anInputInCnt = contentArea ? await screen.getByLabelText('Translations', {selector: 'select'}) : null
      anInputInCnt?.focus()
      expect(anInputInCnt).toHaveFocus()
      keyTarget && fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      const lastButtonInNav = navArea ? await screen.getByTitle('Return to Game') : null
      expect(lastButtonInNav).toHaveFocus()
    })
  })

  describe('between available controls at about page', () => {
    let aButton: HTMLElement | null, firstButton: HTMLElement | null, lastButton: HTMLElement | null

    beforeEach(async () => {
      referAndNavigateTo.about()
      aButton = await keyTarget && within(keyTarget!).getByTitle('Settings')
      firstButton = await keyTarget && within(keyTarget!).getByTitle('Hall of Fame')
      const allButtons = keyTarget?.querySelectorAll('button') || []
      lastButton = allButtons[allButtons.length -1]
    })

    it('should move focus from a control to last control', async () => {
      aButton?.focus()
      keyTarget && fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})
      vi.advanceTimersByTimeAsync(50)

      expect(lastButton).toHaveFocus()
    })

    it('should move focus from last control to first control', async () => {
      lastButton?.focus()
      keyTarget && fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})
      vi.advanceTimersByTimeAsync(50)

      expect(firstButton).toHaveFocus()
    })

    it('should move focus from first control to last control', async () => {
      firstButton?.focus()
      keyTarget && fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})
      vi.advanceTimersByTimeAsync(50)

      expect(lastButton).toHaveFocus()
    })

    it('should let the browser set focus to the body', async () => {
      document.body.blur()

      // remove interaction
      act(() => {
        const sectionScreen =  document.querySelector('section.screen')
        const interactors = sectionScreen?.querySelectorAll(interactionSelectors) || []
        for (let interactor of interactors) {
          interactor?.remove()
        }
      })

      keyTarget && fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      expect(document?.activeElement).toBe(document.body)
      expect(document.body).toHaveFocus()
    })
  })
})
