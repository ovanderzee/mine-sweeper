import { MIN_DURATION } from '../../../common/constants'
import { AppConfig } from '../../../common/app.d'
import storage from '../../../common/storage'
import { GameState,
  GameScore, PlayScore, ScoreItem } from '../../../common/game.d'
import { precise, refineScores, leastClicksToWin, mostClicksToWin,
  makeBoardCode, countMoves, calculateScore } from '../../../common/scoring'

export const victoryReducer = (state: GameState, config: AppConfig): GameState => {
  const { BOARD_SIZE, GAME_LEVEL, MINE_COUNT, PLAYER_NAME, PLAY_MODE } = config

  const victoryVars = {
    code: makeBoardCode(state.board, GAME_LEVEL, PLAY_MODE),
    date: state.tShift,
    user: PLAYER_NAME,
    rank: 0,
  }

  const gameVars: GameScore = {
    cells: Math.pow(BOARD_SIZE, 2),
    mines: MINE_COUNT,
    level: GAME_LEVEL,
    mode: PLAY_MODE,
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

  const richScores = refineScores(scores)
  storage.scores = scores

  return {
    ...state,
    score: richScores.find(scoreItem => scoreItem.date === victory.date)!
  }
}
