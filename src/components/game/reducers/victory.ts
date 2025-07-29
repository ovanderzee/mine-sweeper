import { MIN_DURATION } from '../../../common/constants'
import { AppConfig } from '../../../common/app-types'
import storage from '../../../common/storage'
import { GameState,
  GameScore, PlayScore, ScoreItem } from '../../../common/game-types'
import { precise, leastClicksToWin, mostClicksToWin, makeBoardCode, getMoves, calculateScore } from '../scoring'

export const victoryReducer = (state: GameState, config: AppConfig): GameState => {
  const { BOARD_SIZE, MINE_COUNT, PLAYER_NAME, MAX_SCORES } = config

  const victoryVars = {
    code: makeBoardCode(state.board),
    date: state.tShift,
    user: PLAYER_NAME,
  }

  const gameVars: GameScore = {
    cells: Math.pow(BOARD_SIZE, 2),
    mines: MINE_COUNT,
    effort: {
      least: leastClicksToWin(state),
      most: mostClicksToWin(state)
    }
  }

  // time in seconds
  const playVars: PlayScore = {
    moves: getMoves(state),
    duration: precise(Math.max(state.tShift - state.tZero, MIN_DURATION) / 1000, 5)
  }

  const victory: ScoreItem = {
    ...victoryVars,
    game: gameVars,
    play: playVars,
    score: calculateScore(gameVars, playVars),
  }

  // add, beware of strict mode
  const { scores } = storage
  const isNotThere = !scores.find(scoreItem => scoreItem.date === victory.date)
  if (isNotThere) scores.push(victory)

  // rearrange
  scores.sort((a, b) => b.score.points - a.score.points)
  storage.scores = scores.slice(0, MAX_SCORES)

  const rank = 1 + scores.findIndex(score => score.date === victory.date)

  return {
    ...state,
    score: victory.score.points,
    rank: rank
  }
}
