import { beforeEach, describe, expect, it } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { ReactNode, RefObject, useRef } from 'react'
import { renderInApp } from './../../__mocks__/aat-helpers'
import FullscreenPlay from './FullscreenPlay'

describe('FullscreenPlay Component', () => {

  let
    screen: RenderResult,
    playgroundRef: RefObject<HTMLElement | null>

  const defaultPixelFontSize = 15

  const TestParent = () => {
    playgroundRef = useRef<HTMLElement | null>(null)
    const playgroundStyle = {background: '#975', fontSize: `${defaultPixelFontSize}px`}
    const playgroundHtml = <div ref={playgroundRef} id="playground" style={playgroundStyle}>
      <button className="pristine">1</button>
      <button className="touched">1</button>
      <FullscreenPlay playgroundRef={playgroundRef} />
    </div>
    return playgroundHtml
  }

  beforeEach(async () => {
    screen = await renderInApp(<TestParent />)
  })

  it('should be tested in a fullscreen enabled environment', async () => {
    expect(window.document.fullscreenEnabled).toBeTruthy()
  })

  describe('changes the view mode', () => {

    it('should go in fullscreen mode', async () => {
      const fullscreenButton = screen.getByTitle('Play on fullscreen')
      await fullscreenButton.click()
      expect(playgroundRef?.current).toBe(document.fullscreenElement)
    })

    it('should go in windowed mode', async () => {
      const fullscreenButton = screen.getByTitle('Play on fullscreen')
      await fullscreenButton.click()

      const windowedButton = screen.getByTitle('Play in a window')
      await windowedButton.click()
      expect(document.fullscreenElement).toBeFalsy()
    })
  })

  describe('magnifies the playground', () => {

    it('should cover the view with cells and show other view options', async () => {
      const coverFit = screen.getByTitle('Fill screen with cells')
      expect(coverFit).toBeVisible()

      await coverFit.click()
      const coverPixelFontSize = parseInt(playgroundRef?.current?.style.fontSize || '0')
      expect(coverPixelFontSize).toBeGreaterThan(defaultPixelFontSize)

      expect(coverFit).not.toBeVisible
      expect(screen.getByTitle('Have all cells visible')).toBeVisible
      expect(screen.getByTitle('Revert magnification')).toBeVisible
    })

    it('should contain all cells and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      expect(containFit).toBeVisible()

      await containFit.click()
      const containPixelFontSize = parseInt(playgroundRef?.current?.style.fontSize || '0')
      expect(containPixelFontSize).toBeGreaterThan(defaultPixelFontSize)

      expect(containFit).not.toBeVisible
      expect(screen.getByTitle('Fill screen with cells')).toBeVisible
      expect(screen.getByTitle('Revert magnification')).toBeVisible
    })

    it('should not magnify and show other view options', async () => {
      const containFit = screen.getByTitle('Have all cells visible')
      const revertFit = screen.getByTitle('Revert magnification')

      await containFit.click()
      await revertFit.click()

      const revertPixelFontSize = parseInt(playgroundRef?.current?.style.fontSize || '0')
      expect(revertPixelFontSize).toBe(defaultPixelFontSize)

// ?? should work      expect(revertFit).not.toBeVisible()
      expect(screen.getByTitle('Fill screen with cells')).toBeVisible()
      expect(containFit).toBeVisible()
    })

  })
})
