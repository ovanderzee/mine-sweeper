// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
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
