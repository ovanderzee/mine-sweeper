// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom';
import { texts } from './common/i18n'

/* Fake Context */

const pageCtx = {
  navigate: () => {},
  text: texts['en']
}
jest.spyOn(React, 'useContext').mockReturnValue(pageCtx)

/* overcome lacking document object */

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: HTMLElement): HTMLElement => node,
  }
})


