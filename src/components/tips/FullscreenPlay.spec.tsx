import '@testing-library/jest-dom/vitest'
import { startPageTesting } from './../../__mocks__/specification-helpers'

describe('FullscreenPlay Component', () => {

  let
    containFit: HTMLElement | null,
    coverFit: HTMLElement | null,
    goFullscreen: HTMLElement | null,
    goWindowed: HTMLElement | null

  describe('in window mode', () => {

    beforeEach(async () => {
      startPageTesting()
      containFit = document.querySelector('#contain-fit')
      coverFit = document.querySelector('#cover-fit')
      goWindowed = document.querySelector('#window-mode')
      goFullscreen = document.querySelector('#fullscreen-mode')
    })

    it('should display only go-fullscreen button initially', () => {
      expect(containFit).not.toBeInTheDocument()
      expect(coverFit).not.toBeInTheDocument()
      expect(goWindowed).not.toBeInTheDocument()
      expect(goFullscreen).toBeInTheDocument()
    })
  })

})

