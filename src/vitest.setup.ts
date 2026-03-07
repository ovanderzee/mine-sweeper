
/* instead of jest.config fakeTimers: {"enableGlobally": true}, */
beforeEach(() => {
  vi.useFakeTimers();
});

/* scroll functions not implemented in jsdom */

HTMLElement.prototype.scrollIntoView = vi.fn()
HTMLElement.prototype.scrollIntoViewIfNeeded = vi.fn()

/* fullscreen api lacking in jsdom and jest-dom */

// @ts-expect-error // error TS2540: Cannot assign to 'fullscreenEnabled' because it is a read-only property.
Document.prototype.fullscreenEnabled = true
Document.prototype.exitFullscreen = vi.fn()
Element.prototype.requestFullscreen = vi.fn()
Element.prototype.onfullscreenchange = vi.fn()
Element.prototype.onfullscreenerror = vi.fn()
