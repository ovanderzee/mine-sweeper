import { MIN_DURATION } from '../../../common/constants'

const victoryReducer = (state, config) => {
  const { BOARD_SIZE, GAME_LEVEL, MINE_COUNT, PLAYER_NAME, MAX_SCORES } = config

  const duration = Math.max(state.end - state.begin, MIN_DURATION)

  const moves = state.board
    .map((row) =>
      row.filter((cell) =>
        cell.stage === 'clicked'))
    .flat()
    .length

  const score = Math.round(
    Math.pow(BOARD_SIZE, 2)
    * GAME_LEVEL
    * 10000
    / moves
    / Math.pow(duration, 0.5)
  )

  const victory = {
    begin: state.begin,
    duration: duration,
    user: PLAYER_NAME,
    cells: Math.pow(BOARD_SIZE, 2),
    mines: MINE_COUNT,
    moves: moves,
    score: score,
  }

  // add
  const scoresString = localStorage.getItem('mijnengeveegd')
  const scoreList = scoresString ? JSON.parse(scoresString) : []
  const isThere = scoreList.find((scoreItem) => scoreItem.begin === victory.begin)
  if (!isThere) scoreList.push(victory)

  // rearrange
  scoreList.sort((a: ScoreItem, b: ScoreItem) => b.score - a.score)
  const storableScores = JSON.stringify(scoreList.slice(0, MAX_SCORES))
  localStorage.setItem('mijnengeveegd', storableScores)

  const rank = 1 + scoreList.findIndex(scoreItem => scoreItem.begin === victory.begin)

  return {
    ...state,
    score: score,
    rank: rank
  }
}

export default victoryReducer
