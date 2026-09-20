import { Languages, PlayMode } from '../common/app.d'
import { configFactory } from  '../common/defaults'

//  BOARD_SIZE, GAME_LEVEL, MINE_COUNT as in DEFAULTS
export const defaultChallengeConfig = configFactory({
  "LANGUAGE": Languages.en,
  "PLAYER_NAME":"Hyacinth"
})

// fits various gamestates
export const microConfig = configFactory({
  "BOARD_SIZE":3,
  "GAME_LEVEL":8,
  "LANGUAGE":Languages.en,
  "PLAYER_NAME":"Midas",
})

export const simpleEasyConfig = configFactory({
  "BOARD_SIZE":4,
  "GAME_LEVEL":6,
  "LANGUAGE": Languages.en,
  "PLAYER_NAME":"Hans",
})

export const simpleHardConfig = configFactory({
  "BOARD_SIZE":4,
  "GAME_LEVEL":10,
  "LANGUAGE": Languages.en,
  "PLAYER_NAME":"Jonathan",
  "PLAY_MODE": PlayMode.BARE
})

export const scoringConfig = configFactory({
  "BOARD_SIZE":7,
  "GAME_LEVEL":8,
  "LANGUAGE":Languages.en,
  "PLAYER_NAME":"Florance",
})
