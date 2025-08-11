import { ClockTypes, Languages } from '../common/app-types'
import DEFAULTS from '../common/defaults'

//  BOARD_SIZE, GAME_LEVEL, MINE_COUNT as in DEFAULTS
export const defaultChallengeConfig = {
  ...DEFAULTS,
  "LANGUAGE": Languages.en,
  "FONT_SIZE":18,
  "PLAYER_NAME":"Hyacinth",
  "MAX_SCORES":10,
  "CLOCK_TYPE": ClockTypes.NONE
}

// fits various gamestates
export const microConfig = {
  "BOARD_SIZE":3,
  "GAME_LEVEL":4,
  "MINE_COUNT":2,
  "LANGUAGE":Languages.en,
  "FONT_SIZE":15,
  "PLAYER_NAME":"Midas",
  "MAX_SCORES":500,
  "CLOCK_TYPE": ClockTypes.DIGITAL
}

export const simpleEasyConfig = {
  "BOARD_SIZE":4,
  "GAME_LEVEL":3,
  "MINE_COUNT":2,
  "LANGUAGE": Languages.en,
  "FONT_SIZE":18,
  "PLAYER_NAME":"Hans",
  "MAX_SCORES":500,
  "CLOCK_TYPE": ClockTypes.NONE
}

export const simpleHardConfig = {
  "BOARD_SIZE":4,
  "GAME_LEVEL":6,
  "MINE_COUNT":4,
  "LANGUAGE": Languages.en,
  "FONT_SIZE":12,
  "PLAYER_NAME":"Jonathan",
  "MAX_SCORES":500,
  "CLOCK_TYPE": ClockTypes.NONE
}

export const scoringConfig = {
  "BOARD_SIZE":7,
  "GAME_LEVEL":4,
  "MINE_COUNT":7,
  "LANGUAGE":Languages.en,
  "FONT_SIZE":16,
  "PLAYER_NAME":"Floor",
  "MAX_SCORES":500,
  "CLOCK_TYPE": ClockTypes.NONE
}
