import CogWheel from '../symbols/CogWheel'
import text from '../../common/i18n'

const Settings = () => {
  return (
    <button type="button" title={text.nav['Settings']}>
      <CogWheel />
    </button>
  )
}

export default Settings
