import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { ReactNode, act } from 'react'
import { renderInProvider } from '../../__mocks__/render-helpers'
import Modal from './Modal'

describe('Modal Dialog', () => {
  let modalDialog!: HTMLDialogElement,
    cancelFn: () => void,
    confirmFn: () => void,
    closeFn: () => void

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
    cancelFn = jest.fn()
    confirmFn = jest.fn()
    closeFn = jest.fn()
    renderInProvider(getSimpleModal())
    modalDialog = screen.getByRole('dialog')
  })

  it('should put op a dialog element', () => {
    expect(modalDialog).toBeInTheDocument()
  })

  describe('should cancel and close the dialog', () => {
    it('by clicking the cancel button', async () => {
      const cancelButton = screen.getByText(/Cancel/i)
      fireEvent.click(cancelButton)
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter while focussed cancel button', async () => {
      const cancelButton = screen.getByText(/Cancel/i)
      fireEvent.focus(cancelButton)
      fireEvent.keyDown(cancelButton, {key: 'Enter'})
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Escape when dialog just opened', async () => {
      fireEvent.keyDown(modalDialog, {key: 'Escape'})
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should confirm and close the dialog', () => {
    it('by clicking the confirm button', async () => {
      const confirmButton = screen.getByText(/OK/i)
      fireEvent.click(confirmButton)
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter while focussed confirm button', async () => {
      const confirmButton = screen.getByText(/OK/i)
      fireEvent.focus(confirmButton)
      fireEvent.keyDown(confirmButton, {key: 'Enter'})
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter when dialog just opened', async () => {
      fireEvent.keyDown(modalDialog, {key: 'Enter'})
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should stay', () => {
    it('when it\'s content is clicked', async () => {
      const dialogContent = modalDialog.children[0]
      fireEvent.click(dialogContent)
      act(() => {
        // to wait for element not to be removed
        jest.advanceTimersByTime(1000)
      })
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(0)
    })

    it('not when the backdrop is clicked', async () => {
      const clickTarget = screen.getByRole('dialog')
      fireEvent.click(clickTarget)
      await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })
})


describe('Shield as Modal Dialog', () => {
  let
    // modalDialog!: HTMLDialogElement,
    cancelFn: () => void,
    confirmFn: () => void,
    closeFn: () => void

  const getShieldModal = (): ReactNode => {
    return <Modal
      onCancel={cancelFn}
      onConfirm={confirmFn}
      closeModal={closeFn}
      className={'game-won'}
      textBefore={'123'}
      textAfter={''}
    />
  }

  beforeEach(() => {
    cancelFn = jest.fn()
    confirmFn = jest.fn()
    closeFn = jest.fn()
    renderInProvider(getShieldModal())
    // modalDialog = screen.getByRole('dialog')
  })

  it('should show the rank', () => {
    const svgElement = document.querySelector('svg.shield.blue')

    expect(svgElement).toBeInTheDocument()
    const rankText = screen.getByText(/123/i)
    expect(rankText).toBeInTheDocument()
    expect(rankText.tagName.toUpperCase()).toBe('TEXT')
  })

  /* Does not seem to work with SVG
  it('should vanish when the shield is clicked', async () => {
    const clickTarget = screen.getByRole('img')
    expect(clickTarget).toBeInTheDocument()
    fireEvent.click(clickTarget)

    await waitForElementToBeRemoved(() => screen.getByRole('dialog'))

    expect(cancelFn).toHaveBeenCalledTimes(0)
    expect(confirmFn).toHaveBeenCalledTimes(0)
    expect(closeFn).toHaveBeenCalledTimes(1)
    expect(clickTarget).not.toBeInTheDocument()
  })
  */
})

