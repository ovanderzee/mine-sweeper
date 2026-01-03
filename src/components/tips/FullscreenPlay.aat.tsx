import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../../__mocks__/aat-helpers'

describe('FullscreenPlay Component', () => {

  let
    screen: RenderResult,
    playgroundElement: HTMLDivElement

  const defaultPixelFontSize = 15

  beforeEach(async () => {
    screen = await renderWithApp()
    playgroundElement = document.getElementById('playground') as HTMLDivElement
  })

  it('should be tested in a fullscreen enabled environment', async () => {
    expect(window.document.fullscreenEnabled).toBeTruthy()
  })

  describe('changes the view mode', () => {

    it('should go into fullscreen mode', async () => {
      const fullscreenButton = screen.getByTitle('Play on fullscreen')
      await fullscreenButton.click()
      expect(playgroundElement).toBe(document.fullscreenElement)
    })

    it('should go into windowed mode', async () => {
      const fullscreenButton = screen.getByTitle('Play on fullscreen')
      await fullscreenButton.click()

      const windowedButton = await vi.waitFor(() => {
        // try to get the locator until it exists
        const loc = screen.getByTitle('Play in a window')
        expect(loc).toBeInTheDocument()
        return loc
      })

      await windowedButton.click()
      expect(document.fullscreenElement).toBeFalsy()
    })
  })

  describe('magnifies the playground', () => {

    it('should cover the view with cells and show other view options', async () => {
      const coverFit = screen.getByTitle('Fill screen with cells')
      expect(coverFit).toBeVisible()

      await coverFit.click()
      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
      // pxFontSize 32.6531px
      expect(parseInt(pxFontSize)).toBeGreaterThan(defaultPixelFontSize)

      expect(coverFit).not.toBeVisible()
      expect(screen.getByTitle('Have all cells visible')).toBeVisible()
      expect(screen.getByTitle('Revert magnification')).toBeVisible()
    })

    it('should contain all cells and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      expect(containFit).toBeVisible()

      await containFit.click()
      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
      // pxFontSize 24.4898px
      expect(parseInt(pxFontSize)).toBeGreaterThan(defaultPixelFontSize)

      expect(containFit).not.toBeVisible()
      expect(screen.getByTitle('Fill screen with cells')).toBeVisible()
      expect(screen.getByTitle('Revert magnification')).toBeVisible()
    })

    it('should not magnify and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      const revertFit = screen.getByTitle('Revert magnification')

      await containFit.click()
      await revertFit.click()

      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
      // pxFontSize 15px
      expect(parseInt(pxFontSize)).toBe(defaultPixelFontSize)

      expect(revertFit).not.toBeVisible()
      expect(screen.getByTitle('Fill screen with cells')).toBeVisible()
      expect(containFit).toBeVisible()
    })

  })
})
