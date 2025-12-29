import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import cellStates from './../../__mocks__/cell-states'
import { renderWithProvider } from './../../__mocks__/aat-helpers'
import { CellState } from './../../common/game.d'
// import { LONG_PRESS_THRESHOLD } from '../../common/constants'
import GameCell from './GameCell'

const trim = (str: string) => str.trim().replace(/\s+/, ' ')

describe('Gamecell, a party of properties', () => {
  let dispatchGameAction = vi.fn()

  const getCellByState = (cellState: CellState): React.ReactNode => {
    // key is only required within generating loop
    return <GameCell
      cell={cellState}
      onTouch={dispatchGameAction}
    />
  }

  describe('should reflect props in html', () => {

    it('pristine blank cell', async () => {
      const cell = cellStates.pristine.blank
      const screen = await renderWithProvider(getCellByState(cell))
      const button = screen.getByRole('button').element()
      expect(button.id).toBe('row1col2')
      expect(button.innerHTML).toBe(' ')
      expect(trim(button.className)).toBe('pristine')
      expect(button.getAttribute('aria-label')).toBe('row 2 column 3, hidden')
      expect(button.getAttribute('style')).toBe('--cell-row: 2; --cell-col: 3;')
    })

    it('pristine value cell with flag', async () => {
      const cell = cellStates.flagged.value
      const screen = await renderWithProvider(getCellByState(cell))
      const button = screen.getByRole('button').element()
      expect(button.id).toBe('row2col3')
      expect(button.innerHTML).toBe(' ')
      expect(trim(button.className)).toBe('pristine flag')
      expect(button.getAttribute('aria-label')).toBe('row 3 column 4, hidden')
      expect(button.getAttribute('style')).toBe('--cell-row: 3; --cell-col: 4;')
    })

    it('opened value cell', async () => {
      const cell = cellStates.opened.value
      const screen = await renderWithProvider(getCellByState(cell))
      const button = screen.getByRole('button').element()
      expect(button.id).toBe('row2col3')
      expect(button.innerHTML).toBe('2')
      expect(trim(button.className)).toBe('touched')
      expect(button.getAttribute('aria-label')).toBe('row 3 column 4, open')
      expect(button.getAttribute('style')).toBe('--cell-row: 3; --cell-col: 4;')
    })

    it('opened mine cell', async () => {
      const cell = cellStates.opened.mijn
      const screen = await renderWithProvider(getCellByState(cell))
      const button = screen.getByRole('button').element()
      expect(button.id).toBe('row3col4')
      expect(button.innerHTML).toBe(' <span class="burst"></span>')
      expect(trim(button.className)).toBe('touched mijn')
      expect(button.getAttribute('aria-label')).toBe('row 4 column 5, open')
      expect(button.getAttribute('style')).toBe('--cell-row: 4; --cell-col: 5;')
    })

    it('clicked mine cell', async () => {
      const cell = cellStates.clicked.mijn
      const screen = await renderWithProvider(getCellByState(cell))
      const button = screen.getByRole('button').element()
      expect(button.id).toBe('row3col4')
      expect(button.innerHTML).toBe(' <span class="burst"></span>')
      expect(trim(button.className).startsWith('touched mijn explode')).toBe(true)
      expect(button.getAttribute('aria-label')).toBe('row 4 column 5, open')
      expect(button.getAttribute('style')).toBe('--cell-row: 4; --cell-col: 5;')
     })
  })

//   taken out because of longclick/longpress
//   describe('should determine click action', () => {
//     let cell: CellState, button: HTMLElement
//
//     beforeEach(() => {
//       dispatchGameAction = vi.fn()
//     })
//
//     it('clicked mine cell', async () => {
//       const cell = cellStates.pristine.mijn
//       const screen = await renderWithProvider(getCellByState(cell))
//       button = screen.getByRole('button')
//
//       await button.pointerDown()
//       vi.advanceTimersByTime(LONG_PRESS_THRESHOLD * .9) // ==> MOVE action
//       await button.pointerUp()
//       const payload = {payload: JSON.stringify({cell, entry: {stage: 'clicked', burst: true}}), type: 'MOVE'}
//       expect(dispatchGameAction).toHaveBeenCalledWith(payload)
//     })
//
//     it('flagged mine cell', async () => {
//       const cell = cellStates.pristine.mijn
//       const screen = await renderWithProvider(getCellByState(cell))
//       button = screen.getByRole('button')
//
//       await button.pointerDown()
//       vi.advanceTimersByTime(LONG_PRESS_THRESHOLD * 1.1) // ==> FLAG action
//       await button.pointerUp()
//       const payload = {payload: JSON.stringify({cell, entry: {locked: true}}), type: 'FLAG'}
//       expect(dispatchGameAction).toHaveBeenCalledWith(payload)
//     })
//
//     it('no action when mouse moved out of bounds', async () => {
//       const cell = cellStates.pristine.mijn
//       const screen = await renderWithProvider(getCellByState(cell))
//       button = screen.getByRole('button')
//
//       await button.pointerDown()
//       vi.advanceTimersByTimeAsync(20)
//       await button.pointerLeave()
//       vi.advanceTimersByTimeAsync(20)
//       await button.pointerUp()
//
//       expect(dispatchGameAction).not.toHaveBeenCalled()
//     })
//
//     it('no click action when cell was already opened', async () => {
//       const cell = cellStates.opened.blank
//       const screen = await renderWithProvider(getCellByState(cell))
//       button = screen.getByRole('button')
//
//       await button.pointerDown()
//       vi.advanceTimersByTimeAsync(LONG_PRESS_THRESHOLD * .9) // ==> MOVE action
//       await button.pointerUp()
//       expect(dispatchGameAction).not.toHaveBeenCalled()
//     })
//
//     it('no click action when cell was flagged', async () => {
//       const cell = cellStates.flagged.blank
//       const screen = await renderWithProvider(getCellByState(cell))
//       button = screen.getByRole('button')
//
//       await button.pointerDown()
//       vi.advanceTimersByTimeAsync(LONG_PRESS_THRESHOLD * 0.9) // ==> MOVE action
//       await button.pointerUp()
//       expect(dispatchGameAction).not.toHaveBeenCalled()
//     })
//   })

  describe('should respond to keystrokes', async () => {
    let cell: CellState

    beforeEach(async () => {
      dispatchGameAction = vi.fn()
      cell = cellStates.pristine.mijn
      const screen = await renderWithProvider(getCellByState(cell))
      screen.getByRole('button').element().focus()
    })

    it('and accept "Enter" to open a cell', async () => {
      await userEvent.keyboard('{Enter}')
      const response = {payload: JSON.stringify({cell, entry: {stage: 'clicked', burst: true}}), type: 'MOVE'}
      expect(dispatchGameAction).toHaveBeenCalledWith(response)
    })

    it('and accept Spacebar key to flag a cell', async () => {
      await userEvent.keyboard(' ')
      const response = {payload: JSON.stringify({cell, entry: {locked: true}}), type: 'FLAG'}
      expect(dispatchGameAction).toHaveBeenCalledWith(response)
    })
  })
})
