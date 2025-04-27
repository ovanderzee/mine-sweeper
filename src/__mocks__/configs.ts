import { Languages } from '../common/app-types'

const simpleEasyConfig = {
  "BOARD_SIZE":4,
  "GAME_LEVEL":3,
  "MINE_COUNT":2,
  "LANGUAGE": Languages.nl,
  "FONT_SIZE":18,
  "PLAYER_NAME":"Hans",
  "MAX_SCORES":500
}

const simpleHardConfig = {
  "BOARD_SIZE":4,
  "GAME_LEVEL":6,
  "MINE_COUNT":4,
  "LANGUAGE": Languages.nl,
  "FONT_SIZE":12,
  "PLAYER_NAME":"Jonathan",
  "MAX_SCORES":500
}

export { simpleEasyConfig, simpleHardConfig }
