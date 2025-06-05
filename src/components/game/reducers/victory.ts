import { MIN_DURATION } from '../../../common/constants'
import { AppConfig } from '../../../common/app-types'
import storage from '../../../common/storage'
import { GameState, CellStateStage, ScoreItem } from '../../../common/game-types'

const victoryReducer = (state: GameState, config: AppConfig): GameState => {
  const { BOARD_SIZE, GAME_LEVEL, MINE_COUNT, PLAYER_NAME, MAX_SCORES } = config

  const duration = Math.max(state.end - state.begin, MIN_DURATION)

  const moves = state.board
    .flat()
    .filter(cell => cell.stage === CellStateStage.TESTED)
    .length

  const score = Math.round(
    Math.pow(BOARD_SIZE, 2)
    * GAME_LEVEL
    * 10000
    / moves
    / Math.pow(duration, 0.5)
  )

  const victory: ScoreItem = {
    begin: state.begin,
    duration: duration,
    user: PLAYER_NAME,
    cells: Math.pow(BOARD_SIZE, 2),
    mines: MINE_COUNT,
    moves: moves,
    score: score,
  }

  // add
  const { scores } = storage
  const isThere = scores.find(score => score.begin === victory.begin)
  if (!isThere) scores.push(victory)

  // rearrange
  scores.sort((a, b) => b.score - a.score)
  storage.scores = scores.slice(0, MAX_SCORES)

  const rank = 1 + scores.findIndex(score => score.begin === victory.begin)

  return {
    ...state,
    score: score,
    rank: rank
  }
}

export default victoryReducer
