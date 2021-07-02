import text from '../../common/i18n'

const NewGame = (props) => {
  const newGameHandler = () => {
    props.onNew({ type: 'NEW' })
  }

  return (
    <button type="button" title={text.nav['New Game']} onClick={newGameHandler}>
      &#x25b6;
    </button>
  )
}

export default NewGame
