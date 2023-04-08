import { useContext } from 'react'
import { createPortal } from 'react-dom'
import PageContext from '../../store/page-context'
import './Modal.css'

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />
}

const Dialog = (props) => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const confirmHandler = () => {
    props.onConfirm()
    props.onClose()
  }

  const cancelHandler = () => {
    props.onCancel()
    props.onClose()
  }

  const confirmButton = <button type="button" onClick={confirmHandler}>{text.common.confirm}</button>
  const cancelButton = <button type="button" onClick={cancelHandler}>{text.common.cancel}</button>

  return (
    <div
      className="dialog"
      data-text-before={props.textBefore}
      data-text-after={props.textAfter}
      style={{fontSize: `${FONT_SIZE}px`}}
    >
      <h3 className="content">{props.children}</h3>
      <div className="buttons">
        {props.onCancel && cancelButton}
        {props.onConfirm && confirmButton}
      </div>
    </div>
  )
}

const Modality = (props) => {
  return (
    <div className={`${props.className}-modal`}>
      <Backdrop onClose={props.onClose} />
      <Dialog {...props}>{props.children}</Dialog>
    </div>
  )
}

const portalElement = document.getElementById('modal')

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Modality {...props} />,
        portalElement
      )}
    </>
  )
}

export default Modal
