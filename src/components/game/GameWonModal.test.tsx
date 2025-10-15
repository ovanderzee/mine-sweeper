import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import React from 'react'
import GameWonModal from './GameWonModal'
import { wonGameState } from './../../__mocks__/game-states'
import { renderInProvider, newPortalLayer } from './../../__mocks__/render-helpers'

it('GameWonModal should return JSX.Element', () => {
  const props = {close: (next = false)=>Boolean(next), state: wonGameState}
  const GameWonModalJSX: React.JSX.Element = GameWonModal(props)
  expect( GameWonModalJSX ).toBeTruthy()
})

it('GameWonModal should close using an external function', () => {
  const closeFn = vi.fn()
  newPortalLayer('modal')
  renderInProvider(<GameWonModal close={closeFn} state={wonGameState} />)
  const dialog = screen.getByRole('dialog')
  fireEvent.click(dialog)
  vi.runAllTimers()

  expect(closeFn).toHaveBeenCalled()
})
