import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import GameCell from './GameCell'
import cellStates from './../../__mocks__/cell-states'
import { CellState } from './../../common/game-types'
import { LONG_PRESS_THRESHOLD } from '../../common/constants'
import { renderInProvider } from './../../__mocks__/render-helpers'

const trim = (str: string) => str.trim().replace(/\s+/, ' ')

describe('Gamecell, a party of properties', () => {
  let dispatchGameAction = jest.fn()

  const getCellByState = (cellState: CellState): React.ReactNode => {
    // key is only required within generating loop
    return <GameCell
      cell={cellState}
      onTouch={dispatchGameAction}
    />
  }

  describe('should reflect props in html', () => {

    it('pristine blank cell', () => {
      const cell = cellStates.pristine.blank
      renderInProvider(getCellByState(cell))
      const button = screen.getByRole('button')
      expect(button.id).toBe('row1col2')
      expect(button.innerHTML).toBe(' ')
      expect(trim(button.className)).toBe('pristine')
      expect(button.getAttribute('aria-label')).toBe('row 2 column 3, hidden')
      expect(button.getAttribute('style')).toBe('--cell-row: 2; --cell-col: 3;')
    })

    it('pristine value cell with flag', () => {
      const cell = cellStates.flagged.value
      renderInProvider(getCellByState(cell))
      const button = screen.getByRole('button')
      expect(button.id).toBe('row2col3')
      expect(button.innerHTML).toBe(' ')
      expect(trim(button.className)).toBe('pristine flag')
      expect(button.getAttribute('aria-label')).toBe('row 3 column 4, hidden')
      expect(button.getAttribute('style')).toBe('--cell-row: 3; --cell-col: 4;')
    })

    it('opened value cell', () => {
      const cell = cellStates.opened.value
      renderInProvider(getCellByState(cell))
      const button = screen.getByRole('button')
      expect(button.id).toBe('row2col3')
      expect(button.innerHTML).toBe('2')
      expect(trim(button.className)).toBe('touched')
      expect(button.getAttribute('aria-label')).toBe('row 3 column 4, open')
      expect(button.getAttribute('style')).toBe('--cell-row: 3; --cell-col: 4;')
    })

    it('opened mine cell', () => {
      const cell = cellStates.opened.mijn
      renderInProvider(getCellByState(cell))
      const button = screen.getByRole('button')
      expect(button.id).toBe('row3col4')
      expect(button.innerHTML).toBe(' <span class=\"burst\"></span>')
      expect(trim(button.className)).toBe('touched mijn')
      expect(button.getAttribute('aria-label')).toBe('row 4 column 5, open')
      expect(button.getAttribute('style')).toBe('--cell-row: 4; --cell-col: 5;')
    })

    it('clicked mine cell', () => {
      const cell = cellStates.clicked.mijn
      renderInProvider(getCellByState(cell))
      const button = screen.getByRole('button')
      expect(button.id).toBe('row3col4')
      expect(button.innerHTML).toBe(' <span class=\"burst\"></span>')
      expect(trim(button.className)).toBe('touched mijn explode')
      expect(button.getAttribute('aria-label')).toBe('row 4 column 5, open')
      expect(button.getAttribute('style')).toBe('--cell-row: 4; --cell-col: 5;')
    })
  })

  describe('should determine click type', () => {
    let cell: CellState, button: HTMLElement

    beforeEach(() => {
      jest.useFakeTimers()
      dispatchGameAction = jest.fn()
      cell = cellStates.pristine.mijn
      renderInProvider(getCellByState(cell))
      button = screen.getByRole('button')
    })

    afterEach(() => {
      jest.runAllTimers()
      jest.useRealTimers()
    })

    it('clicked mine cell', () => {
      fireEvent.pointerDown(button)
      jest.advanceTimersByTime(LONG_PRESS_THRESHOLD * .9) // ==> MOVE action
      fireEvent.pointerUp(button)
      const payload = {payload: JSON.stringify({cell, entry: {stage: 'clicked'}}), type: 'MOVE'}
      expect(dispatchGameAction).toHaveBeenCalledWith(payload)
    })

    it('flagged mine cell', () => {
      fireEvent.pointerDown(button)
      jest.advanceTimersByTime(LONG_PRESS_THRESHOLD * 1.1) // ==> FLAG action
      fireEvent.pointerUp(button)
      const payload = {payload: JSON.stringify({cell, entry: {locked: true}}), type: 'FLAG'}
      expect(dispatchGameAction).toHaveBeenCalledWith(payload)
    })
  })
})
