import { MIN_DURATION } from '../../../common/constants'
import { AppConfig } from '../../../common/app-types'
import storage from '../../../common/storage'
import { GameState, CellStateStage, ScoreItem } from '../../../common/game-types'
import { leastClicksToWin, mostClicksToWin } from '../scoring'

export const victoryReducer = (state: GameState, config: AppConfig): GameState => {
  const { BOARD_SIZE, MINE_COUNT, PLAYER_NAME, MAX_SCORES } = config

  const duration = Math.max(state.tShift - state.tZero, MIN_DURATION)

  const moves = state.board
    .flat()
    .filter(cell => cell.stage === CellStateStage.TESTED)
    .length

  const leastMoves = leastClicksToWin(state)
  const mostMoves = mostClicksToWin(state)

  const clickEfficiency = (mostMoves - moves) / (mostMoves - leastMoves)

  const clickSpeed = moves / (duration / 1000)

  const score = Math.round(clickEfficiency * clickSpeed * 1000)

  const victory: ScoreItem = {
    time: state.tShift,
    duration: duration,
    user: PLAYER_NAME,
    cells: Math.pow(BOARD_SIZE, 2),
    mines: MINE_COUNT,
    moves: moves,
    least: leastMoves,
    most: mostMoves,
    score: score,
  }

  // add, beware of strict mode
  const { scores } = storage
  const isNotThere = !scores.find(scoreItem => scoreItem.time === victory.time)
  if (isNotThere) scores.push(victory)

  // rearrange
  scores.sort((a, b) => b.score - a.score)
  storage.scores = scores.slice(0, MAX_SCORES)

  const rank = 1 + scores.findIndex(score => score.time === victory.time)

  return {
    ...state,
    score: score,
    rank: rank
  }
}
