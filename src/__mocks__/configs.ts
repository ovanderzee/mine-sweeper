import { Languages, PlayMode } from '../common/app.d'
import { DEFAULTS } from  '../common/defaults'

//  BOARD_SIZE, GAME_LEVEL, MINE_COUNT as in DEFAULTS
export const defaultChallengeConfig = {
  ...DEFAULTS,
  "LANGUAGE": Languages.en,
  "PLAYER_NAME":"Hyacinth",
}

// fits various gamestates
export const microConfig = {
  ...DEFAULTS,
  "BOARD_SIZE":3,
  "GAME_LEVEL":8,
  "MINE_COUNT":2,
  "LANGUAGE":Languages.en,
  "PLAYER_NAME":"Midas",
}

export const simpleEasyConfig = {
  ...DEFAULTS,
  "BOARD_SIZE":4,
  "GAME_LEVEL":6,
  "MINE_COUNT":2,
  "LANGUAGE": Languages.en,
  "PLAYER_NAME":"Hans",
}

export const simpleHardConfig = {
  ...DEFAULTS,
  "BOARD_SIZE":4,
  "GAME_LEVEL":10,
  "MINE_COUNT":4,
  "LANGUAGE": Languages.en,
  "PLAYER_NAME":"Jonathan",
  "PLAY_MODE": PlayMode.BARE
}

export const scoringConfig = {
  ...DEFAULTS,
  "BOARD_SIZE":7,
  "GAME_LEVEL":8,
  "MINE_COUNT":7,
  "LANGUAGE":Languages.en,
  "PLAYER_NAME":"Florance",
}
