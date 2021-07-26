import useLocalStorage from '../../common/useLocalStorage'
import DEFAULTS from '../../common/defaults'
import HiScores from '../nav/HiScores'
import Help from '../nav/Help'
import GoBack from '../nav/GoBack'
import text from '../../common/i18n'
import './Meta.css'
import './Configure.css'

function Configure() {
  const [config, setConfig] = useLocalStorage('mijnenveger', DEFAULTS)

  const exitCurrentGame = () => {
    sessionStorage.removeItem('mijnenvegerij')
  }

  const changeBoardSizeHandler = event => {
    exitCurrentGame()
    setConfig(prev => {
      return {
        ...prev,
        BOARD_SIZE: +event.target.value,
        MINE_COUNT: Math.ceil(Math.pow(+event.target.value, 2) * prev.GAME_LEVEL / 30)
      }
    })
  }

  const changeGameLevelHandler = event => {
    exitCurrentGame()
    setConfig(prev => {
      return {
        ...prev,
        GAME_LEVEL: +event.target.value,
        MINE_COUNT: Math.ceil(Math.pow(prev.BOARD_SIZE, 2) * +event.target.value / 30)
      }
    })
  }

  const onbeginContent = (
    <fieldset id="on-begin-play">
      <legend>{text.settings['On begin Play']}</legend>
      <h5>{text.settings['Will destroy current game']}</h5>

      <div className="field">
        <label htmlFor="size">{text.settings['Size Gameboard']}</label>
        <div>
          <em>{text.settings['%n cells'].replace('%n', Math.pow(config.BOARD_SIZE, 2))}</em>
          <input
            id="size"
            type="range"
            value={config.BOARD_SIZE}
            min="3"
            max="8"
            onChange={changeBoardSizeHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="level">{text.settings['Gamelevel']}</label>
        <div>
          <em>{text.settings['one mine to %n cells'].replace('%n', (30 / config.GAME_LEVEL))}</em>
          <input
            id="level"
            type="range"
            value={config.GAME_LEVEL}
            min="1"
            max="6"
            onChange={changeGameLevelHandler}
          />
        </div>
      </div>
    </fieldset>
  )

  const changePlayerNameHandler = event => {
    setConfig(prev => {
      return {
        ...prev,
        PLAYER_NAME: event.target.value,
      }
    })
  }

  const changeMaxScoresHandler = event => {
    setConfig(prev => {
      return {
        ...prev,
        MAX_SCORES: +event.target.value,
      }
    })
  }

  const recordContent = (
    <fieldset id="record-score">
      <legend>{text.settings['Record Scores']}</legend>

      <div className="field">
        <label htmlFor="user">{text.settings['Name in Scores']}</label>
        <em>{text.settings['type your name']}</em>
        <div>
          <input
            id="user"
            type="text"
            value={config.PLAYER_NAME}
            onChange={changePlayerNameHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="max">{text.settings['Max records']}</label>
        <div>
          <em>{text.settings['clip to %n'].replace('%n', config.MAX_SCORES)}</em>
          <input
            id="max"
            type="range"
            value={config.MAX_SCORES}
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
        {recordContent}
      </form>
      {configNavigation}
    </section>
  )
}

export default Configure
