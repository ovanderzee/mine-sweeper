import { texts, defaultLanguage } from './i18n'

/**
 * BOARD_SIZE
 * width and height of gameboard, hence BOARD_SIZE^2 cells on board
 */

/**
 * GAME_LEVEL
 * mines per 30 cells:
 * 2 = 1 mine in 15 cells; 6.7% coverage
 * 3 = 1 in 10; 10%
 * 4 = 1 in 7.5; 13.3%
 * 5 = 1 in 6; 16.7%
 * 6 = 1 in 5; 20%
 * 7 = 1 in 4.3; 23.3%
 */

const DEFAULTS = {
  BOARD_SIZE: 6,
  GAME_LEVEL: 3,
  MINE_COUNT: Math.ceil(6 * 6 * 3 / 30),
  LANGUAGE: defaultLanguage,
  FONT_SIZE: 15,
  PLAYER_NAME: texts[defaultLanguage].config['default player'],
  MAX_SCORES: 500,
}

export default DEFAULTS
