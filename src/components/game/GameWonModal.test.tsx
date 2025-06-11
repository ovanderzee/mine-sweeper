import React from 'react'
import GameWonModal from './GameWonModal'
import { wonGameState } from './../../__mocks__/game-states'

test('GameWonModal should return JSX.Element', () => {
  const props = {close: (next = false)=>Boolean(next), state: wonGameState}
  const GameWonModalJSX: React.JSX.Element = GameWonModal(props)
  expect( GameWonModalJSX ).toBeTruthy()
})
