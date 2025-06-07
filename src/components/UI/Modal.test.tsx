import { screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { renderInProvider } from '../../__mocks__/render-helpers'
import Modal from './Modal'

/*
interface ModalProps {
  children: React.ReactNode,
  className: string,
  onConfirm: () => void,
  onCancel?: () => void,
  closeModal: () => void,
  textBefore?: Primitive,
  textAfter?: Primitive,
}
*/

describe('Modal Dialog', () => {
  let closeFunction: () => void
  const getSimpleModal = (): ReactNode => {
    return <Modal
      onConfirm={() => {}}
      closeModal={() => closeFunction()}
      className={'test-modal'}
      textBefore={'before'}
      textAfter={'after'}
    >
      {'Hallo!'}
    </Modal>
  }

  beforeEach(() => {
    closeFunction = jest.fn()
  })

  it('should put op a dialog element', () => {
    renderInProvider(getSimpleModal())

    const modalDialog = screen.getByRole('dialog')
    expect(modalDialog).toBeInTheDocument
  })


})
