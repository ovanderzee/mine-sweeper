import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HiScores from '../nav/HiScores'
import Help from '../nav/Help'
import GoBack from '../nav/GoBack'
import { translations } from '../../common/i18n'
import './Meta.css'
import './Configure.css'

function Configure() {
  const pageCtx = useContext(PageContext)
  const { BOARD_SIZE, GAME_LEVEL, LANGUAGE, PLAYER_NAME, MAX_SCORES } = pageCtx.config
  const text = pageCtx.text

  const exitCurrentGame = () => {
    sessionStorage.removeItem('mijnenvegerij')
  }

  const changeBoardSizeHandler = event => {
    exitCurrentGame()
    const prev = pageCtx.config
    pageCtx.configure({
      BOARD_SIZE: +event.target.value,
      MINE_COUNT: Math.ceil(Math.pow(+event.target.value, 2) * prev.GAME_LEVEL / 30)
    })
  }

  const changeGameLevelHandler = event => {
    exitCurrentGame()
    const prev = pageCtx.config
    pageCtx.configure({
      GAME_LEVEL: +event.target.value,
      MINE_COUNT: Math.ceil(Math.pow(prev.BOARD_SIZE, 2) * +event.target.value / 30)
    })
  }

  const onbeginContent = (
    <fieldset id="on-begin-play">
      <legend>{text.settings['On begin Play']}</legend>
      <h5>{text.settings['Will destroy current game']}</h5>

      <div className="field">
        <label htmlFor="size">{text.settings['Size Gameboard']}</label>
        <div>
          <em>{text.settings['%n cells'].replace('%n', Math.pow(BOARD_SIZE, 2))}</em>
          <input
            id="size"
            type="range"
            value={BOARD_SIZE}
            min="3"
            max="8"
            onChange={changeBoardSizeHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="level">{text.settings['Gamelevel']}</label>
        <div>
          <em>{text.settings['one mine to %n cells'].replace('%n', (30 / GAME_LEVEL))}</em>
          <input
            id="level"
            type="range"
            value={GAME_LEVEL}
            min="1"
            max="6"
            onChange={changeGameLevelHandler}
          />
        </div>
      </div>
    </fieldset>
  )

  const translationIds = Object.keys(translations)
  const translationNames = Object.values(translations)

  const changeLanguageHandler = event => {
    pageCtx.configure({ LANGUAGE: event.target.value })
  }

  const genericContent = (
    <fieldset id="general-settings">
      <legend>{text.settings['General Settings']}</legend>

      <div className="field">
        <label htmlFor="language">{text.settings['Translations']}</label>
        <div>
          <em>{text.settings['choose your language']}</em>
          <select
            id="language"
            defaultValue={LANGUAGE}
            onChange={changeLanguageHandler}
          >
            {translationIds.map((transId, index) => (
              <option key={transId} value={transId}>
                {translationNames[index]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* enlarge font-size */}
    </fieldset>
  )

  const changePlayerNameHandler = event => {
    pageCtx.configure({ PLAYER_NAME: event.target.value })
  }

  const changeMaxScoresHandler = event => {
    pageCtx.configure({ MAX_SCORES: +event.target.value })
  }

  const recordContent = (
    <fieldset id="record-score">
      <legend>{text.settings['Record Scores']}</legend>

      <div className="field">
        <label htmlFor="user">{text.settings['Name in Scores']}</label>
        <div>
          <em>{text.settings['type your name']}</em>
          <input
            id="user"
            type="text"
            value={PLAYER_NAME}
            onChange={changePlayerNameHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="max">{text.settings['Max records']}</label>
        <div>
          <em>{text.settings['clip to %n'].replace('%n', MAX_SCORES)}</em>
          <input
            id="max"
            type="range"
            value={MAX_SCORES}
            min="8"
            max="1024"
            onChange={changeMaxScoresHandler}
          />
        </div>
      </div>
    </fieldset>
  )

  const configNavigation = (
    <nav>
      <HiScores />
      <Help />
      {/* <Settings /> */}
      <GoBack />
    </nav>
  )

  return (
    <section className="screen">
      <form>
        {onbeginContent}
        {genericContent}
        {recordContent}
      </form>
      {configNavigation}
    </section>
  )
}

export default Configure
