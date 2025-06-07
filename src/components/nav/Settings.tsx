import { useContext } from 'react'
import PageContext from '../../store/page-context'
import Configure from '../meta/Configure'
import { CogWheel } from '../symbols/Symbols'

const Settings = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const showHandler = () => pageCtx.navigate(<Configure />)

  return (
    <button type="button" title={text.nav['Settings']} onClick={showHandler}>
      <CogWheel />
    </button>
  )
}

export default Settings
