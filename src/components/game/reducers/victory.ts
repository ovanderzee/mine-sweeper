import { MIN_DURATION } from '../../../common/constants'
import { AppConfig, PlayMode } from '../../../common/app.d'
import storage from '../../../common/storage'
import { CellStateStage, GameState,
  GameScore, PlayScore, ScoreItem } from '../../../common/game.d'
import { significant, refineScores, leastClicksToWin, mostClicksToWin,
  makeBoardCode, countMoves, calculateScore, countByFillType } from '../../../common/scoring'

export const victoryReducer = (state: GameState, config: AppConfig): GameState => {
  const { BOARD_SIZE, GAME_LEVEL, MINE_COUNT, PLAYER_NAME, PLAY_MODE } = config

  const victoryVars = {
    code: makeBoardCode(state.board, GAME_LEVEL, PLAY_MODE),
    date: state.tShift,
    user: PLAYER_NAME,
  }

  const gameVars: GameScore = {
    cells: Math.pow(BOARD_SIZE, 2),
    blanks: countByFillType(state, (fill: number) => fill===0),
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
    flags: state.board.flat().filter(c => c.locked).length,
    moves: countMoves(state),
    duration: significant(Math.max(state.tShift - state.tZero, MIN_DURATION) / 1000, 5)
  }

  if (PLAY_MODE === PlayMode.SHARP) {
    playVars.remaining = state.board.flat().filter(c => c.stage === CellStateStage.HIDDEN).length
  }

  const victory: ScoreItem = refineScores([{
    ...victoryVars,
    game: gameVars,
    play: playVars,
    score: calculateScore(gameVars, playVars),
  }])[0]

  // add, beware of strict mode
  const scores = storage.scores
  const foundIndex = scores.findIndex(scoreItem => scoreItem.date === victory.date)
  if (foundIndex === -1) {
    scores.push(victory)
  } else { // strict mode
    scores[foundIndex] = victory
  }

  storage.scores = scores
  const sortedScores = storage.scores

  return {
    ...state,
    score: sortedScores.find(scoreItem => scoreItem.date === victory.date)!
  }
}
