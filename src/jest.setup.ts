
import '@testing-library/jest-dom'

/* overcome lacking document object */

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom')
  return {
    ...original,
    createPortal: (node: HTMLElement): HTMLElement => node,
  }
})

/* <dialog> lacking in jest-dom */

HTMLDialogElement.prototype.show = jest.fn();
HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();

/* scrollIntoView is not implemented in jsdom */

window.HTMLElement.prototype.scrollIntoView = function() {};
