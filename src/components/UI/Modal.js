import { createPortal } from 'react-dom'
import text from '../../common/i18n'
import './Modal.css'

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />
}

const Modality = (props) => {
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
      className={`modal ${props.className}`}
      data-text-before={props.textBefore}
      data-text-after={props.textAfter}
    >
      <h3 className="content">{props.children}</h3>
      <div className="buttons">
        {props.onCancel && cancelButton}
        {props.onConfirm && confirmButton}
      </div>
    </div>
  )
}

const portalElement = document.getElementById('modal')

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {createPortal(
          <Modality {...props}>{props.children}</Modality>,
        portalElement
      )}
    </>
  )
}

export default Modal
