import { fireEvent, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { renderInProvider } from '../../__mocks__/render-helpers'
import Modal from './Modal'

describe('Modal Dialog', () => {
  let cancelFn: () => void
  let confirmFn: () => void
  let closeFn: () => void
  const getSimpleModal = (): ReactNode => {
    return <Modal
      onCancel={cancelFn}
      onConfirm={confirmFn}
      closeModal={closeFn}
      className={'test-modal'}
      textBefore={'before'}
      textAfter={'after'}
    >
      {'Hallo!'}
    </Modal>
  }

  beforeEach(() => {
    jest.useFakeTimers()
    cancelFn = jest.fn()
    confirmFn = jest.fn()
    closeFn = jest.fn()
    renderInProvider(getSimpleModal())
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should put op a dialog element', () => {
    const modalDialog = screen.getByRole('dialog')
    expect(modalDialog).toBeInTheDocument
  })

  describe('should cancel and close the dialog', () => {
    it('by clicking the cancel button', () => {
      const cancelButton = screen.getByText(/Cancel/i)
      fireEvent.click(cancelButton)
      jest.runAllTimers()
      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter while focussed cancel button', () => {
      const cancelButton = screen.getByText(/Cancel/i)
      fireEvent.focus(cancelButton)
      fireEvent.keyDown(cancelButton, {key: 'Enter'})
      jest.runAllTimers()
      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Escape when dialog just opened', () => {
      const modalDialog = screen.getByRole('dialog')
      fireEvent.keyDown(modalDialog, {key: 'Escape'})
      jest.runAllTimers()
      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should confirm and close the dialog', () => {
    it('by clicking the confirm button', () => {
      const confirmButton = screen.getByText(/OK/i)
      fireEvent.click(confirmButton)
      jest.runAllTimers()
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter while focussed confirm button', () => {
      const confirmButton = screen.getByText(/OK/i)
      fireEvent.focus(confirmButton)
      fireEvent.keyDown(confirmButton, {key: 'Enter'})
      jest.runAllTimers()
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter when dialog just opened', () => {
      const modalDialog = screen.getByRole('dialog')
      fireEvent.keyDown(modalDialog, {key: 'Enter'})
      jest.runAllTimers()
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should show a shield when winning the game', () => {
    const getShieldModal = (): ReactNode => {
      return <Modal
        onCancel={()=>{}}
        onConfirm={()=>{}}
        closeModal={()=>{}}
        className={'game-won'}
        textBefore={'123'}
        textAfter={''}
      />
    }

    it('showing the rank', () => {
      renderInProvider(getShieldModal())
      const svgElement = document.querySelector('svg.shield.blue')
      expect(svgElement).toBeInTheDocument()
      const rankText = screen.getByText(/123/i)
      expect(rankText).toBeInTheDocument()
    })
  })
})
