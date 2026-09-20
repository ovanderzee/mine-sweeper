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
  return {
    ...DEFAULTS,
    ...partial,
    get MINE_COUNT() {
      return calculateMineCount(this)
    }
  }
}
