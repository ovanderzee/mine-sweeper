import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Reset from '../symbols/Reset'

const DefaultSettings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const resetHandler = () => {
    pageCtx.configure()
  }

  return (
    <>
      <button
        type="button"
        title={text.nav['Reinstate Defaults']}
        onClick={resetHandler}
      >
        <Reset />
      </button>
    </>
  )
}

export default DefaultSettings
