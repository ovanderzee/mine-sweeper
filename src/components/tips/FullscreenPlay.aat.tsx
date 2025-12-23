import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { ReactNode, useRef } from 'react'
import { renderWithProvider } from './../../__mocks__/aat-helpers'
import FullscreenPlay from './FullscreenPlay'

describe('FullscreenPlay Component', () => {

  let
    screen: RenderResult,
    playgroundElement: HTMLDivElement

  const defaultPixelFontSize = 15

  const TestParent = () => {
    const playgroundRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
    const playgroundStyle = {background: '#975', fontSize: `${defaultPixelFontSize}px`}
    const playgroundHtml = <div ref={playgroundRef} id="playground" style={playgroundStyle}>
      <button className="pristine">1</button>
      <button className="touched">1</button>
      <FullscreenPlay playgroundRef={playgroundRef} />
    </div> as ReactNode
    return playgroundHtml
  }

  beforeEach(async () => {
    screen = await renderWithProvider(<TestParent />)
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
//       console.log('cover', pxFontSize) // 32.6531px
      expect(parseInt(pxFontSize)).toBeGreaterThan(defaultPixelFontSize)

//       expect(coverFit).not.toBeVisible()
      expect(screen.getByTitle('Have all cells visible')).toBeVisible()
      expect(screen.getByTitle('Revert magnification')).toBeVisible()
    })

    it('should contain all cells and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      expect(containFit).toBeVisible()

      await containFit.click()
      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
//       console.log('contain', pxFontSize) // 24.4898px
      expect(parseInt(pxFontSize)).toBeGreaterThan(defaultPixelFontSize)

//       expect(containFit).not.toBeVisible()
      expect(screen.getByTitle('Fill screen with cells')).toBeVisible()
      expect(screen.getByTitle('Revert magnification')).toBeVisible()
    })

    it('should not magnify and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      const revertFit = screen.getByTitle('Revert magnification')

      await containFit.click()
      await revertFit.click()

      const pxFontSize = window.getComputedStyle(playgroundElement).fontSize
//       console.log('revert', pxFontSize) // 15px
      expect(parseInt(pxFontSize)).toBe(defaultPixelFontSize)

// ?? should work      expect(revertFit).not.toBeVisible()
      expect(screen.getByTitle('Fill screen with cells')).toBeVisible()
      expect(containFit).toBeVisible()
    })

  })
})
