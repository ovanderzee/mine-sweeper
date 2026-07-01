import { texts, currentLanguage } from './i18n'
import { AppCheckConfig, BoardFit, PlayMode } from './app.d'

export const GAME_DIVISOR = 60

export const calculateMineCount = ((cfg: AppCheckConfig): number => {
  const approx = Math.pow(cfg.BOARD_SIZE, 2) * cfg.GAME_LEVEL / GAME_DIVISOR
  return Math.ceil(approx)
})

export const DEFAULTS = {
  BOARD_SIZE: 6,
  GAME_LEVEL: 6,
  MINE_COUNT: Math.ceil(6 * 6 * 6 / 60),
  LANGUAGE: currentLanguage,
  FONT_SIZE: 15,
  PLAYER_NAME: texts[currentLanguage].config['default player'],
  MAX_SCORES: 999,
  PLAY_MODE: PlayMode.NORMAL,
}

export const NORMAL = {
  MAGNIFICATION: 1,
  BOARD_FIT: BoardFit.NORMAL,
}
