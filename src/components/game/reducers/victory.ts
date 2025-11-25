import { MIN_DURATION } from '../../../common/constants'
import { AppConfig } from '../../../common/app.d'
import storage from '../../../common/storage'
import { GameState,
  GameScore, PlayScore, ScoreItem } from '../../../common/game.d'
import { precise, rankScores, leastClicksToWin, mostClicksToWin,
  makeBoardCode, countMoves, calculateScore } from '../../../common/scoring'

export const victoryReducer = (state: GameState, config: AppConfig): GameState => {
  const { BOARD_SIZE, GAME_LEVEL, MINE_COUNT, PLAYER_NAME, MAX_SCORES } = config

  const victoryVars = {
    code: makeBoardCode(state.board, GAME_LEVEL),
    date: state.tShift,
    user: PLAYER_NAME,
    rank: 0,
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
    moves: countMoves(state),
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
  const foundIndex = scores.findIndex(scoreItem => scoreItem.date === victory.date)
  if (foundIndex === -1) {
    scores.push(victory)
  } else { // strict mode
    scores[foundIndex] = victory
  }

  rankScores(scores)
  storage.scores = scores.slice(0, MAX_SCORES)

  return {
    ...state,
    score: victory
  }
}
