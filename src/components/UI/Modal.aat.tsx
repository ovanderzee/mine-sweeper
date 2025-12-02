import { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Locator, userEvent } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import { renderInApp } from './../../__mocks__/aat-helpers'
import { FADE_OUT_TIME } from '../../common/constants'
import { ApproveModal, ShieldModal } from './Modal'

describe('Modal Dialog', () => {
  let modalDialog!: Locator,
    cancelFn: () => void,
    confirmFn: () => void,
    endFn: () => void,
    isShowModal: boolean

  const getSimpleModal = (): ReactNode => {
    return <ApproveModal
      message={'Hallo!'}
      onCancel={cancelFn}
      onConfirm={confirmFn}
      isShowModal={isShowModal}
      endShowModal={endFn}
    />
  }

  beforeEach(() => {
    cancelFn = vi.fn()
    confirmFn = vi.fn()
    endFn = vi.fn()
    isShowModal = true;
  })

  it('should normally render a ready to use dialog element', async () => {
    isShowModal = false;
    const screen = await renderInApp(getSimpleModal())
    modalDialog = screen.getByRole('dialog')

    expect(modalDialog).not.toBeInTheDocument() // but it is in the html
  })

  it('should put op a dialog element', async () => {
    isShowModal = true;
    const screen = await renderInApp(getSimpleModal())
    modalDialog = screen.getByRole('dialog')

    expect(modalDialog).toBeVisible()
  })

  describe('should cancel and close the dialog', () => {
    let screen: RenderResult,
      cancelButton: Locator

    beforeEach(async () => {
      isShowModal = true;
      screen = await renderInApp(getSimpleModal())
      cancelButton = screen.getByText(/Cancel/i)
    })

    it('by clicking the cancel-button', async () => {
      await cancelButton.click()
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(endFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter on focussed cancel-button', async () => {
      await cancelButton.element().focus()
      await userEvent.keyboard('{Enter}')
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalled() // twice
      expect(confirmFn).not.toHaveBeenCalled()
      expect(endFn).toHaveBeenCalled() // twice
    })

    it('by pressing Escape when dialog just opened', async () => {
      await modalDialog.element().focus()
      await userEvent.keyboard('{Escape}')
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(1)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(endFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should confirm and close the dialog', () => {
    let screen: RenderResult,
      confirmButton: Locator

    beforeEach(async () => {
      isShowModal = true;
      screen = await renderInApp(getSimpleModal())
      confirmButton = screen.getByText(/OK/i)
    })

    it('by clicking the confirm-button', async () => {
      await confirmButton.click()
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(endFn).toHaveBeenCalledTimes(1)
    })

    it('by pressing Enter on focussed confirm-button', async () => {
      await confirmButton.element().focus()
      await userEvent.keyboard('{Enter}')
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).not.toHaveBeenCalled()
      expect(confirmFn).toHaveBeenCalled() // twice
      expect(endFn).toHaveBeenCalled() // twice
    })

    it('by pressing Enter when dialog just opened', async () => {
      await modalDialog.element().focus()
      await userEvent.keyboard('{Enter}')
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(1)
      expect(endFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('should stay', () => {
    let screen: RenderResult

    beforeEach(async () => {
      isShowModal = true;
      screen = await renderInApp(getSimpleModal())
      modalDialog = screen.getByRole('dialog')
    })

    it('when it\'s content is clicked', async () => {
      const dialogContent = modalDialog.element().children[0] as HTMLElement
      await dialogContent.click()
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(endFn).toHaveBeenCalledTimes(0)
    })


    it('but disappearing when the backdrop is clicked', async () => {
      await modalDialog.click()
      vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

      expect(cancelFn).toHaveBeenCalledTimes(0)
      expect(confirmFn).toHaveBeenCalledTimes(0)
      expect(endFn).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Shield as Modal Dialog', () => {
  let
    screen: RenderResult,
    confirmFn: () => void,
    endFn: () => void

  const getShieldModal = (): ReactNode => {
    return <ShieldModal
      label="You win!"
      message="123"
      onConfirm={confirmFn}
      isShowModal={true}
      endShowModal={endFn}
    />
  }

  beforeEach(async () => {
    confirmFn = vi.fn()
    endFn = vi.fn()
    screen = await renderInApp(getShieldModal())
  })

  it('should show the rank', () => {
    const svgElement = screen.getByRole('img')
    const rankText = screen.getByText(/123/i)

    expect(svgElement).toBeInTheDocument()
    expect(rankText).toBeInTheDocument()
  })

  it('should vanish when the shield is clicked', async () => {
    // not testable on the SVG element
    const rankText = screen.getByText(/123/i)
    await rankText.click()
    vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

    expect(confirmFn).toHaveBeenCalledTimes(0)
    expect(endFn).toHaveBeenCalledTimes(1)
    expect(rankText).not.toBeVisible()
  })

  it('should vanish when Enter is pressed', async () => {
    await userEvent.keyboard('{Enter}')
    vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

    expect(confirmFn).toHaveBeenCalledTimes(1)
    expect(endFn).toHaveBeenCalledTimes(1)
  })

  it('should vanish when Escape is pressed', async () => {
    await userEvent.keyboard('{Escape}')
    vi.advanceTimersByTime(FADE_OUT_TIME * 1.1)

    expect(confirmFn).toHaveBeenCalledTimes(1)
    expect(endFn).toHaveBeenCalledTimes(1)
  })
})

