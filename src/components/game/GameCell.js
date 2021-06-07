import { useState, useEffect } from 'react'
import './GameCell.css'

const GameCell = (props) => {
  const initialDomProps = { content: '', className: 'pristine' }
  const [domProps, setDomProps] = useState(initialDomProps)

  const evaluateCell = () => {
    if (domProps.content) return
    if (props.fill === 0) {
      setDomProps({ content: ' ', className: 'touched' })
    } else if (props.fill === 9) {
      setDomProps({ content: ' ', className: 'touched mijn' })
    } else {
      setDomProps({ content: props.fill, className: 'touched' })
    }
  }

  const { content } = domProps
  const { row, col, onTouch } = props
  useEffect(() => {
    content && onTouch(row, col)
  }, [content, row, col, onTouch])

  return (
    <button type="button" className={domProps.className} onClick={evaluateCell}>
      {domProps.content}
    </button>
  )
}

export default GameCell
