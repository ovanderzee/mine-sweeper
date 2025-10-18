import React, { useContext, useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PageContext from '../../store/page-context'
import { ShieldByRank } from './Shield'
import { MODAL_ELEMENT, FADE_OUT_TIME } from '../../common/constants'
import { Primitive } from '../../common/app.d'
import './Modal.css'

interface ModalProps {
  children?: React.ReactNode,
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

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const keystrokeHandler = (event: React.KeyboardEvent, handler: (event: React.KeyboardEvent)=>void) => {
    if (event.key && event.key === 'Enter') handler(event)
  }

  const confirmHandler = (event: React.UIEvent) => {
    event.stopPropagation()
    props.onConfirm && props.onConfirm()
    timedCloseModal()
  }

  const cancelHandler = (event: React.UIEvent) => {
    event.stopPropagation()
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
    if (dialogRef.current) {
      dialogRef.current.showModal()
      dialogRef.current.setAttribute('open', 'true')
      dialogRef.current.focus()
    }
  }, [dialogRef])

  const [endState, setEndState] = useState('')

  const timedCloseModal = () => {
    const eventSubject = event?.target as Element
    const targetedByPurpose = eventSubject?.tagName === 'DIALOG' || eventSubject?.tagName === 'BUTTON'
    if (event?.type === 'click' && !targetedByPurpose) return;

    setEndState('ending')
    setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.removeAttribute('open')
          dialogRef.current.close()
        }
        props.closeModal()
      },
      FADE_OUT_TIME
    )
  }

  const keystrokeShortcut = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case 'Escape':
        cancelHandler(event)
        break
      case 'Enter':
        confirmHandler(event)
        break
    }
  }

  return (
    <dialog
      aria-labelledby="dialog-label"
      className={`modal ${props.className}-modal ${endState}`}
      ref={dialogRef}
      onClick={timedCloseModal}
      onKeyDown={keystrokeShortcut}
      style={{fontSize: `${FONT_SIZE}px`}}
    >
      {props.className !== 'game-won' &&
        <div
          className="dialog"
          data-text-before={props.textBefore}
          data-text-after={props.textAfter}
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
    </dialog>
  )
}

const Modal = (props: ModalProps) => ReactDOM.createPortal(
  <ModalComponent {...props} />,
  document.getElementById(MODAL_ELEMENT)!
)

export default Modal
