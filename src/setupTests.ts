// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: HTMLElement): HTMLElement => node, // overcome lacking document object
  };
});


/*
  Overcome error rendering using createPortal

const portals = ['overlay', 'modal']

portals.forEach(id => {
    const elem = document.createElement("div")
    elem.setAttribute("id", id)
    document.body!.appendChild(elem)
  }
)
*/

