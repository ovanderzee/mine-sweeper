import React, { useContext, useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
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

const ModalComponent = (props: ModalProps): React.ReactNode => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const dialogRef = useRef(null)
  let dialogElement!: HTMLDialogElement | null

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
    dialogElement = dialogRef?.current ? dialogRef.current as HTMLDialogElement : null
    if (dialogElement) {
      dialogElement.showModal()
      dialogElement.setAttribute('open', 'true')
      dialogElement.focus()
    }
  }, [dialogRef])

  const [endState, setEndState] = useState('')

  const timedCloseModal = () => {
    setEndState('ending')
    setTimeout(() => {
        if (dialogElement) {
          dialogElement.setAttribute('open', 'false')
          dialogElement.removeAttribute('open')
          dialogElement.close()
        }
        props.closeModal()
      },
      OVERLAY_FADE_OUT_TIME
    )
  }

  const keystrokeShortcut = (event: React.KeyboardEvent): void => {
    event!.stopPropagation()
    switch (event.key) {
      case 'Escape':
        cancelHandler()
        break
      case 'Enter':
        confirmHandler()
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
  MODAL_ELEMENT!
)

export default Modal
