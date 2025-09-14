import { useContext } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import DefaultSettings from '../nav/DefaultSettings'
import HiScores from '../nav/HiScores'
import Help from '../nav/Help'
import GoBack from '../nav/GoBack'
import { ClockTypes, Languages, LanguageTranslation } from '../../common/app-types'
import { RANGES } from '../../common/constants'
import { GAME_DIVISOR } from '../../common/defaults'
import storage from '../../common/storage'
import { preventReloadByEnter, scrollIntoViewTowardsCenter } from '../../common/functions'
import './Meta.css'
import './Configure.css'

function Configure() {
  const pageCtx = useContext(PageContext)
  const { config, text } = pageCtx

  const exitCurrentGame = () => {
    storage.eraseGame()
  }

  const changeBoardSizeHandler = (event: React.ChangeEvent) => {
    exitCurrentGame()
    const ctrl = event.target as HTMLInputElement
    const value = Math.min(
      RANGES.SIZE.max,
      Math.max(RANGES.SIZE.min, +ctrl.value)
    )
    pageCtx.configure({ BOARD_SIZE: value })
  }

  const changeGameLevelHandler = (event: React.ChangeEvent) => {
    exitCurrentGame()
    const ctrl = event.target as HTMLInputElement
    const value = Math.min(
      RANGES.LEVEL.max,
      Math.max(RANGES.LEVEL.min, +ctrl.value)
    )
    pageCtx.configure({ GAME_LEVEL: value })
  }

  const cellCount = Math.pow(config.BOARD_SIZE, 2)
  const cellsPerMine = Math.round(GAME_DIVISOR * 10 / config.GAME_LEVEL) / 10
  const onbeginContent = (
    <fieldset id="on-begin-play">
      <legend>{text.settings['On begin Play']}</legend>
      <h5 className="warning">{text.settings['Will destroy current game']}</h5>

      <div className="field">
        <label htmlFor="size">{text.settings['Size Gameboard']}</label>
        <div>
          <em>{text.settings['%n cells'].replace('%n', cellCount.toString())}</em>
          <input
            id="size"
            type="range"
            value={config.BOARD_SIZE}
            min={RANGES.SIZE.min}
            max={RANGES.SIZE.max}
            onChange={changeBoardSizeHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="level">{text.settings['Gamelevel']}</label>
        <div>
          <em>{text.settings['one mine to %n cells'].replace('%n', cellsPerMine.toString())}</em>
          <input
            id="level"
            type="range"
            value={config.GAME_LEVEL}
            min={RANGES.LEVEL.min}
            max={RANGES.LEVEL.max}
            onChange={changeGameLevelHandler}
          />
          <em>{text.settings['total %n mines'].replace('%n', config.MINE_COUNT.toString())}</em>
        </div>
      </div>
    </fieldset>
  )

  const changeLanguageHandler = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLSelectElement
    pageCtx.configure({ LANGUAGE: ctrl.value as Languages })
  }

  const changeFontSizeHandler = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLInputElement
    scrollIntoViewTowardsCenter(ctrl)
    const value = Math.min(
      RANGES.FONT.max,
      Math.max(RANGES.FONT.min, +ctrl.value)
    )
    pageCtx.configure({ FONT_SIZE: value })
  }

  const changeClockTypeHandler = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLInputElement
    pageCtx.configure({ CLOCK_TYPE: ctrl.value as ClockTypes })
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
            value={config.LANGUAGE}
            onChange={changeLanguageHandler}
          >
            {Object.entries(LanguageTranslation).map(([key, value]) => (
              <option
                key={key}
                value={key}
              >{value}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="zoom">{text.settings['Zoom Display']}</label>
        <div>
          <em>{text.settings['font-size to %n pixels'].replace('%n', config.FONT_SIZE.toString())}</em>
          <input
            id="zoom"
            type="range"
            value={config.FONT_SIZE}
            min={RANGES.FONT.min}
            max={RANGES.FONT.max}
            onChange={changeFontSizeHandler}
          />
        </div>
      </div>

      <div className="field">
        <div className="label">{text.settings['Clock']}</div>
        <div>
          <em>{text.settings['display playtime']}</em>
          <label><input
            type="radio"
            name="clock"
            value={ClockTypes.NONE}
            checked={config.CLOCK_TYPE === ClockTypes.NONE}
            onChange={changeClockTypeHandler}
          /> <span>{text.settings['No clock']}</span></label>
          <label><input
            type="radio"
            name="clock"
            value={ClockTypes.ANALOG}
            checked={config.CLOCK_TYPE === ClockTypes.ANALOG}
            onChange={changeClockTypeHandler}
          /> <span>{text.settings['Analog clock']}</span></label>
          <label><input
            type="radio"
            name="clock"
            value={ClockTypes.DIGITAL}
            checked={config.CLOCK_TYPE === ClockTypes.DIGITAL}
            onChange={changeClockTypeHandler}
          /> <span>{text.settings['Digital clock']}</span></label>
        </div>
      </div>
    </fieldset>
  )

  const changePlayerNameHandler = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLInputElement
    pageCtx.configure({ PLAYER_NAME: ctrl.value })
  }

  const changeMaxScoresHandler = (event: React.ChangeEvent) => {
    const ctrl = event.target as HTMLInputElement
    const value = Math.min(
      RANGES.SCORES.max,
      Math.max(RANGES.SCORES.min, +ctrl.value)
    )
    pageCtx.configure({ MAX_SCORES: value })
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
            value={config.PLAYER_NAME}
            onChange={changePlayerNameHandler}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="max">{text.settings['Max records']}</label>
        <div>
          <em>{text.settings['clip to %n'].replace('%n', config.MAX_SCORES.toString())}</em>
          <input
            id="max"
            type="range"
            value={config.MAX_SCORES}
            min={RANGES.SCORES.min}
            max={RANGES.SCORES.max}
            onChange={changeMaxScoresHandler}
          />
        </div>
      </div>
    </fieldset>
  )

  const configNavigation = (
    <NavOptionsBar>
      <DefaultSettings />
      <HiScores />
      <Help />
      <GoBack />
    </NavOptionsBar>
  )

  return (
    <>
      <form
          onKeyDown={(event) => preventReloadByEnter(event)}
        >
        {onbeginContent}
        {genericContent}
        {recordContent}
      </form>
      {configNavigation}
    </>
  )
}

export default Configure
