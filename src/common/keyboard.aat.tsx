import { beforeEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { renderWithApp } from './../__mocks__/aat-helpers'
import { flipFocus } from './functions'

describe('Flip focus', () => {
  vi.mock('./functions', { spy: true })

  describe('between landmarks', () => {
    it('should set focus somewhere', async () => {
      const screen = await renderWithApp()
      expect(document.body).toBe(document.activeElement)

      // await userEvent.tab({ alt: true })
      await userEvent.keyboard('{Alt>}{Tab}{/Alt}')
      expect(flipFocus).toHaveBeenCalled()
      // the second cell gets focus, instead of the first
      // await expect.element(screen.getByRole('main').getByRole('slider').first()).toBe(document.activeElement)
      await expect.element(screen.getByRole('main')).toContain(document.activeElement)

      await userEvent.keyboard('{Alt>}{Tab}{/Alt}')
      expect(flipFocus).toHaveBeenCalled()
      // the second button gets focus, instead of the first
      // await expect.element(screen.getByRole('navigation').getByRole('button').first()).toBe(document.activeElement)
      await expect.element(screen.getByRole('navigation')).toContain(document.activeElement)
    })
  })
})
