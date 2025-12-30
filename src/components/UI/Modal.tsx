import React, { useContext, useState, useRef, useEffect } from 'react'
import PageContext from '../../store/page-context'
import { ShieldByRank } from './Shield'
import { FADE_OUT_TIME } from '../../common/constants'
import './Modal.css'

interface ModalProps {
  label?: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  isShowModal: boolean,
  endShowModal: () => void,
}

interface AbstractProps extends ModalProps {
  kind: string
}

const AbstractModal = (props: AbstractProps): React.ReactNode => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [endState, setEndState] = useState('')

  const timedCloseModal = () => {
    const eventSubject = event?.target as Element
    const validTargets = ['DIALOG', 'BUTTON', 'USE', 'TEXT']
    const targetedByPurpose = validTargets.includes(eventSubject?.tagName.toUpperCase())
    if (event?.type === 'click' && !targetedByPurpose) return;

    setEndState('ending')
    setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.close()
        }
        props.endShowModal()
        setEndState('')
      },
      FADE_OUT_TIME
    )
  }

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
    if (props.isShowModal) {
      dialogRef.current?.showModal()
      dialogRef.current?.focus()
    }
  }, [props.isShowModal])

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
      aria-label={props.label}
      className={`${props.kind}-modal ${endState}`}
      ref={dialogRef}
      onClick={timedCloseModal}
      onKeyDown={keystrokeShortcut}
    >
      {props.kind === 'approve' &&
        <div className="dialog-body">
          <h2 className="h3 content">{props.message}</h2>
          <div className="buttons">
            {props?.onCancel && cancelButton}
            {confirmButton}
          </div>
        </div>
      }
      {props.kind === 'shield' &&
        <ShieldByRank rank={Number(props.message)} />
      }
    </dialog>
  )
}

export const ApproveModal = (props: ModalProps): React.ReactNode => {
  return <AbstractModal
    kind="approve"
    label={props.message}
    message={props.message}
    onConfirm={props.onConfirm}
    onCancel={props.onCancel}
    isShowModal={props.isShowModal}
    endShowModal={props.endShowModal}
  />
}

export const ShieldModal = (props: ModalProps): React.ReactNode => {
  return <AbstractModal
    kind="shield"
    label={props.label}
    message={props.message}
    onConfirm={props.onConfirm}
    onCancel={props.onConfirm}
    isShowModal={props.isShowModal}
    endShowModal={props.endShowModal}
  />
}

