import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import GameWonModal from './GameWonModal'
import { wonGameState } from './../../__mocks__/game-states'
import { renderInProvider } from './../../__mocks__/render-helpers'

test('GameWonModal should return JSX.Element', () => {
  const props = {close: (next = false)=>Boolean(next), state: wonGameState}
  const GameWonModalJSX: React.JSX.Element = GameWonModal(props)
  expect( GameWonModalJSX ).toBeTruthy()
})

test('GameWonModal should close using an external function', () => {
  const closeFn = jest.fn()
  renderInProvider(<GameWonModal close={closeFn} state={wonGameState} />)
  const dialog = screen.getByRole('dialog')
  fireEvent.click(dialog)
  jest.runAllTimers()

  expect(closeFn).toHaveBeenCalled()
})
