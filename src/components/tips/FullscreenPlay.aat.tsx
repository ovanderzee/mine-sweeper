import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../../__mocks__/aat-helpers'
import { NORMAL } from  './../../common/defaults'

describe('FullscreenPlay Component', () => {

  let
    screen: RenderResult,
    playgroundElement: HTMLDivElement

  const defaultPixelFontSize = 15

  beforeEach(async () => {
    sessionStorage.setItem('mv-session', JSON.stringify(NORMAL))
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

      // try to get the locator until it exists
      const windowedButton = screen.getByTitle('Play in a window')
      await expect.element(windowedButton).toBeInTheDocument()

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

      await expect.element(screen.getByTitle('Have all cells visible')).toBeVisible()
      await expect.element(screen.getByTitle('Revert magnification')).toBeVisible()
      expect(coverFit).not.toBeVisible()
    })

    it('should contain all cells and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      expect(containFit).toBeVisible()

      await containFit.click()
      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
      // pxFontSize 24.4898px
      expect(parseInt(pxFontSize)).toBeGreaterThan(defaultPixelFontSize)

      await expect.element(screen.getByTitle('Fill screen with cells')).toBeVisible()
      await expect.element(screen.getByTitle('Revert magnification')).toBeVisible()
      expect(containFit).not.toBeVisible()
    })

    it('should not magnify and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      await containFit.click()

      const revertFit = screen.getByTitle('Revert magnification')
      await revertFit.click()

      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
      // pxFontSize 15px
      expect(parseInt(pxFontSize)).toBe(defaultPixelFontSize)

      await expect.element(screen.getByTitle('Revert magnification')).not.toBeVisible()
      await expect.element(screen.getByTitle('Fill screen with cells')).toBeVisible()
      await expect.element(screen.getByTitle('Have all cells visible')).toBeVisible()
    })

  })
})
