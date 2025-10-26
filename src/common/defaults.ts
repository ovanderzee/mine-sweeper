import { texts, currentLanguage } from './i18n'
import { AppCheckConfig } from './app.d'

export const GAME_DIVISOR = 30

export const calculateMineCount = ((cfg: AppCheckConfig): number => {
  const approx = Math.pow(cfg.BOARD_SIZE, 2) * cfg.GAME_LEVEL / GAME_DIVISOR
  return Math.ceil(approx)
})

const DEFAULTS = {
  BOARD_SIZE: 6,
  GAME_LEVEL: 3,
  MINE_COUNT: Math.ceil(6 * 6 * 3 / 30),
  LANGUAGE: currentLanguage,
  FONT_SIZE: 15,
  PLAYER_NAME: texts[currentLanguage].config['default player'],
  MAX_SCORES: 500,
}

export default DEFAULTS
