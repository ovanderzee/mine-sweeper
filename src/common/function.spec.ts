import '@testing-library/jest-dom'
import { fireEvent, screen, within } from '@testing-library/react'
import { referAndNavigateTo, startPageTesting } from '../__mocks__/specification-helpers'

describe('Flip focus', () => {
  let keyTarget: Element | null

  beforeEach(() => {
    startPageTesting()
  })

  describe('between controls in content and nav areas', () => {
    let contentArea: HTMLElement | null, navArea: HTMLElement | null

    beforeEach(() => {
      referAndNavigateTo.config()
      keyTarget = document.querySelector('section.screen')
      contentArea = document.querySelector('section.screen > article, section.screen > form')
      navArea = document.querySelector('section.screen > nav')
    })

    it('should move focus from control in nav to control in content', async () => {
      const aButtonInNav = navArea ? await within(navArea).getByTitle('Explanation') : null
      aButtonInNav?.focus()
      if (keyTarget) fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      const firstButtonInCnt = contentArea ? await within(contentArea).getByLabelText('Gameboard dimensions', {selector: 'input'}) : null
      expect(document?.activeElement?.id).toBe(firstButtonInCnt?.id)
    })

    it('should move focus from control in content to control in nav', async () => {
      const anInputInCnt = contentArea ? await within(contentArea).getByLabelText('Translations', {selector: 'select'}) : null
      anInputInCnt?.focus()
      if (keyTarget) fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      const firstButtonInNav = navArea ? await within(navArea).getByTitle('Revert to Defaults') : null
      expect(document?.activeElement?.id).toBe(firstButtonInNav?.id)
    })
  })

  describe('between available controls at about page', () => {
    let aButton: HTMLElement | null, firstButton: HTMLElement | null, lastButton: HTMLElement | null

    beforeEach(async () => {
      referAndNavigateTo.about()
      keyTarget = document.querySelector('section.screen')
      aButton = await screen.getByTitle('Settings')
      firstButton = await screen.getByTitle('Hall of Fame')
      lastButton = await screen.getByTitle('Return to Game')
    })

    it('should move focus from a control to last control', async () => {
      aButton?.focus()
      if (keyTarget) fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      expect(document?.activeElement?.id).toBe(firstButton?.id)
    })

    it('should move focus from last control to first control', async () => {
      lastButton?.focus()
      if (keyTarget) fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      expect(document?.activeElement?.id).toBe(firstButton?.id)
    })

    it('should move focus from first control to last control', async () => {
      firstButton?.focus()
      if (keyTarget) fireEvent.keyDown(keyTarget, {altKey: true, key: 'Tab'})

      expect(document?.activeElement?.id).toBe(lastButton?.id)
    })
  })
})
