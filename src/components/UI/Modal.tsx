import React, { useContext, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PageContext from '../../store/page-context'
import { ShieldByRank } from './Shield'
import { MODAL_ELEMENT, OVERLAY_FADE_OUT_TIME } from '../../common/constants'
import { trapFocus } from '../../common/functions'
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

const ModalComponent = (props: ModalProps): React.ReactNode => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const keystrokeHandler = (event: React.KeyboardEvent, handler: ()=>void) => {
    event!.stopPropagation()
    if (event.key && event.key === 'Enter') handler()
  }

  const confirmHandler = () => {
    props.onConfirm && props.onConfirm()
    timedCloseModal()
  }

  const cancelHandler = () => {
    props?.onCancel && props.onCancel()
    timedCloseModal()
  }

  const confirmButton = <button type="button" className="confirm"
    onClick={confirmHandler}
    onKeyDown={(event)=>keystrokeHandler(event, confirmHandler)}
  >{text.common.confirm}</button>
  const cancelButton = <button type="button" className="cancel"
    onClick={cancelHandler}
    onKeyDown={(event)=>keystrokeHandler(event, cancelHandler)}
  >{text.common.cancel}</button>

  useEffect(() => {
    trapFocus(true)
  }, [])

  const [endState, setEndState] = useState('')

  const timedCloseModal = () => {
    setEndState('ending')
    setTimeout(() => {
        props.closeModal()
        trapFocus(false)
      },
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
      onKeyDown={timedCloseModal}
    >
      <div className="backdrop" />

      {props.className !== 'game-won' &&
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
      }

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
