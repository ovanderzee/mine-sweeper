import QuestionMark from '../symbols/QuestionMark'
import text from '../../common/i18n'

const Help = () => {
  return (
    <button type="button" title={text.nav['Help']}>
      <QuestionMark />
    </button>
  )
}

export default Help
