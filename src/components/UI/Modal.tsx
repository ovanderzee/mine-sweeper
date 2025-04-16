import React, { useContext, useState, useRef, useEffect } from 'react'
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

  const confirmRef = useRef(null)
  const cancelRef = useRef(null)

  const focusOtherButton = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return
    event.preventDefault()
    event.stopPropagation()

    if (document.activeElement === cancelRef.current) {
      const current = confirmRef.current as unknown as HTMLButtonElement
      current.focus()
    } else if (document.activeElement === confirmRef.current) {
      const current = cancelRef.current as unknown as HTMLButtonElement
      current.focus()
    }
  }

  const confirmButton = <button type="button" className="confirm"
    onClick={confirmHandler}
    onKeyDown={focusOtherButton}
    ref={confirmRef}
  >{text.common.confirm}</button>
  const cancelButton = <button type="button" className="cancel"
    onClick={cancelHandler}
    onKeyDown={focusOtherButton}
    ref={cancelRef}
  >{text.common.cancel}</button>

  useEffect(() => {
    const current = confirmRef?.current ? confirmRef.current as HTMLButtonElement : undefined
    if (current) current.focus()
  })

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
      role="dialog"
      aria-labelledby="dialog-label"
      aria-modal="true"
      className={`modal ${props.className}-modal ${endState}`}
      onClick={timedCloseModal}
      onKeyDown={(ev) => {if (ev.key === 'Escape') timedCloseModal()}}
    >
      <div className="backdrop" />

      <div
        className="dialog"
        data-text-before={props.textBefore}
        data-text-after={props.textAfter}
        style={{fontSize: `${FONT_SIZE}px`}}
      >
        <h3 id="dialog-label" className="content">{props.children}</h3>
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
