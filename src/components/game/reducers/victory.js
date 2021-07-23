import { BOARD_SIZE, MINE_COUNT, GAME_LEVEL, MAX_SCORES, MIN_DURATION } from '../../../common/constants'

const victoryReducer = (state) => {
  const duration = Math.max(state.end - state.begin, MIN_DURATION)

  const moves = state.board
    .map((row) => row.filter((cell) => cell.done === 'clicked'))
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
    // name: PLAYER_NAME,
    cells: Math.pow(BOARD_SIZE, 2),
    mines: MINE_COUNT,
    moves: moves,
    score: score,
  }

  // add
  const scores = JSON.parse(localStorage.getItem('mijnengeveegd')) || []
  const isThere = scores.find(score => score.begin === victory.begin)
  if (!isThere) scores.push(victory)

  // rearrange
  scores.sort((a, b) => b.score - a.score)
  const storableScores = JSON.stringify(scores.slice(0, MAX_SCORES))
  localStorage.setItem('mijnengeveegd', storableScores)

  const rank = 1 + scores.findIndex(score => score.begin === victory.begin)

  return {
    ...state,
    score: score,
    moves: moves,
    rank: rank > 0 ? rank : undefined,
  }
}

export default victoryReducer
