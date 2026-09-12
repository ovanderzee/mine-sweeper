import { texts, currentLanguage } from './i18n'
import { AppConfig, AppSubConfig, BoardFit, PlayMode } from './app.d'

export const GAME_DIVISOR = 60

export const calculateMineCount = ((cfg: { BOARD_SIZE: number, GAME_LEVEL: number }): number => {
  const approx = Math.pow(cfg.BOARD_SIZE, 2) * cfg.GAME_LEVEL / GAME_DIVISOR
  return Math.ceil(approx)
})

export const DEFAULTS = {
  BOARD_SIZE: 6,
  GAME_LEVEL: 6,
  get MINE_COUNT() {return calculateMineCount(this)},
  LANGUAGE: currentLanguage,
  FONT_SIZE: 15,
  PLAYER_NAME: texts[currentLanguage].config['default player'],
  PLAY_MODE: PlayMode.NORMAL,
  VERBOSE_BTN: true,
}

export const NORMAL = {
  MAGNIFICATION: 1,
  BOARD_FIT: BoardFit.NORMAL,
}

export const configFactory = function (partial: AppSubConfig): AppConfig {
  const base = Object.create({
    ...DEFAULTS,
    get MINE_COUNT() {
      // @ts-ignore // error TS2345: Argument of type '{}' is not assignable to parameter of type ...
      return calculateMineCount(this)
    },
  })
  for (let prop in partial) {
    base[prop] = partial[prop]
  }
  return base
}
/*
    const change1 = {BOARD_SIZE: 9, GAME_LEVEL: 9} // MINE_COUNT 13
    const config1 = configFactory(change1)
    console.log('config1.FONT_SIZE', config1.FONT_SIZE)
    console.log('config1 getProtoOf', Object.getPrototypeOf(config1))
    console.log('config1.MINE_COUNT', config1.MINE_COUNT)
    console.log('input constructed for config1', {...config1})

    const change2 = {FONT_SIZE: 11, GAME_LEVEL: 12} // MINE_COUNT 8
    const config2 = configFactory(change2)
    console.log('config2.BOARD_SIZE', config2.BOARD_SIZE)
    console.log('config2 getProtoOf', Object.getPrototypeOf(config2))
    console.log('config2.MINE_COUNT', config2.MINE_COUNT)
    let {BOARD_SIZE, MINE_COUNT} = config2
    console.log('selection pulled from config2 (BOARD_SIZE, MINE_COUNT)', BOARD_SIZE, MINE_COUNT)
*/
/*
export class newConfiguration {
  constructor (subConfig: AppSubConfig) {
    this.#build()
    for (let prop in subConfig) {
      this[prop] = subConfig[prop]
    }
  }

  #build = () => {
    for (prop in DEFAULTS) {
      this[prop] = DEFAULTS[prop]
    }
  }
}

    const changeC = {FONT_SIZE: 11, GAME_LEVEL: 12} // MINE_COUNT 8
    const configC = newConfiguration(changeC)
    console.log('configC.BOARD_SIZE', configC.BOARD_SIZE)
    console.log('configC getProtoOf', Object.getPrototypeOf(configC))
    console.log('configC.MINE_COUNT', configC.MINE_COUNT)
*/
