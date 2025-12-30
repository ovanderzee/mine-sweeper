import { vi } from 'vitest'

/* instead of jest.config fakeTimers: {"enableGlobally": true}, */
beforeEach(() => {
  vi.useFakeTimers();
});

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
// @ts-expect-error // error TS2540: Cannot assign to 'fullscreenEnabled' because it is a read-only property.
document.fullscreenElement = null
// @ts-expect-error // error TS2540: Cannot assign to 'fullscreenEnabled' because it is a read-only property.
document.fullscreenEnabled = true
Element.prototype.onfullscreenchange = vi.fn()
Element.prototype.onfullscreenerror = vi.fn()

