import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import PageContext from '../../store/page-context'
import { ShieldByRank } from './Shield'
import { MODAL_ELEMENT, OVERLAY_FADE_OUT_TIME } from '../../common/constants'
import { Primitive } from '../../common/app-types'
import './Modal.css'

interface ModalProps {
  children: React.ReactNode,
  className: string,
  onConfirm: () => void,
  onCancel?: () => void,
  closeModal: () => void,
  textBefore?: Primitive,
  textAfter?: Primitive,
}

const ModalComponent = (props: ModalProps) => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const confirmHandler = () => {
    props.onConfirm && props.onConfirm()
    timedCloseModal()
  }

  const cancelHandler = () => {
    props?.onCancel && props.onCancel()
    timedCloseModal()
  }

  const confirmButton = <button type="button" className="confirm" onClick={confirmHandler}>{text.common.confirm}</button>
  const cancelButton = <button type="button" className="cancel" onClick={cancelHandler}>{text.common.cancel}</button>

  const [endState, setEndState] = useState('')

  const timedCloseModal = () => {
    setEndState('ending')
    setTimeout(
      props.closeModal,
      OVERLAY_FADE_OUT_TIME
    )
  }

  return (
    <section
      className={`modal ${props.className}-modal ${endState}`}
      onClick={timedCloseModal}
    >
      <div className="backdrop" />

      <div
        className="dialog"
        data-text-before={props.textBefore}
        data-text-after={props.textAfter}
        style={{fontSize: `${FONT_SIZE}px`}}
      >
        <h3 className="content">{props.children}</h3>
        <div className="buttons">
          {props?.onCancel && cancelButton}
          {confirmButton}
        </div>
      </div>

      {props.className === 'game-won' && props?.textBefore
          && <ShieldByRank rank={Number(props.textBefore)} />}
    </section>
  )
}

const Modal = (props: ModalProps) => createPortal(
  <ModalComponent {...props} />,
  MODAL_ELEMENT!
)

export default Modal
