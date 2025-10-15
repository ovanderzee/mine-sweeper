import { fireEvent, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { ReactNode } from 'react'
import { renderInProvider, newPortalLayer } from '../../__mocks__/render-helpers'
import { FADE_OUT_TIME } from '../../common/constants'
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
    cancelFn = vi.fn()
    confirmFn = vi.fn()
    closeFn = vi.fn()
    newPortalLayer('modal')
    renderInProvider(getSimpleModal())
    modalDialog = screen.getByRole('dialog')
  })

  it('should put op a dialog element', () => {
    expect(modalDialog).toBeInTheDocument()
  })

  describe('should cancel and close the dialog', () => {
    it('by clicking the cancel button', async () => {
      const cancelButton = within(modalDialog).getByText(/Cancel/i)
      fireEvent.click(cancelButton)
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter while focussed cancel button', async () => {
      const cancelButton = within(modalDialog).getByText(/Cancel/i)
      fireEvent.focus(cancelButton)
      fireEvent.keyDown(cancelButton, {key: 'Enter'})
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Escape when dialog just opened', async () => {
      fireEvent.keyDown(modalDialog, {key: 'Escape'})
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should confirm and close the dialog', () => {
    it('by clicking the confirm button', async () => {
      const confirmButton = within(modalDialog).getByText(/OK/i)
      fireEvent.click(confirmButton)
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter while focussed confirm button', async () => {
      const confirmButton = within(modalDialog).getByText(/OK/i)
      fireEvent.focus(confirmButton)
      fireEvent.keyDown(confirmButton, {key: 'Enter'})
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter when dialog just opened', async () => {
      fireEvent.keyDown(modalDialog, {key: 'Enter'})
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should stay', () => {
    it('when it\'s content is clicked', async () => {
      const dialogContent = modalDialog.children[0]
      fireEvent.click(dialogContent)
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(0)
    })
  })
})

describe('Modal Shield', () => {
  let
    modalDialog!: HTMLDialogElement,
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
    cancelFn = vi.fn()
    confirmFn = vi.fn()
    closeFn = vi.fn()
    newPortalLayer('modal')
    renderInProvider(getShieldModal())
    modalDialog = screen.getByRole('dialog')
  })

  describe('should show a shield when winning the game', () => {
    it('showing the rank', () => {
      const svgElement = document.querySelector('svg.shield.blue')
      expect(svgElement).toBeInTheDocument()
      const rankText = screen.getByText(/123/i)
      expect(rankText).toBeInTheDocument()
    })

    it('disappearing when it\'s content is clicked', async () => {
      fireEvent.click(modalDialog)
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(closeFn).toHaveBeenCalledTimes(1)
    })
  })
})
