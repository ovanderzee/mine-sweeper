import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

/* instead of jest.config fakeTimers: {"enableGlobally": true}, */
beforeEach(() => {
  vi.useFakeTimers();
});

/* overcome lacking document object */

vi.mock('react-dom', async () => {
  const original = await vi.importActual('react-dom')
  return {
    ...original,
    createPortal: (node: HTMLElement): HTMLElement => node,
  }
})

/* <dialog> lacking in jest-dom */

HTMLDialogElement.prototype.show = vi.fn();
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

/* scroll functions not implemented in jsdom */

window.scrollTo = function() {};
window.HTMLElement.prototype.scrollIntoView = function() {};

/* fullscreen api lacking in jsdom and jest-dom */

Element.prototype.requestFullscreen = vi.fn()
document.exitFullscreen = vi.fn()
// @ts-ignore // is read-only
document.fullscreenElement = null
// @ts-ignore // is read-only
document.fullscreenEnabled = true
Element.prototype.onfullscreenchange = vi.fn()
Element.prototype.onfullscreenerror = vi.fn()

