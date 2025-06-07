import { GameState, CellState, CellStateStage } from '../../../common/game-types'

const defeatReducer = (state: GameState): GameState => {

  const mines: CellState[] = state.board
    .flat()
    .filter(cell => cell.stage === CellStateStage.RELEASED && cell.fill > 8)

  if (mines.length) {
    const randomSeqNum = Math.floor(mines.length * Math.random())
    const nextMineState = {
      ...mines[randomSeqNum],
      stage: CellStateStage.TESTED
    }
    // trigger next mine in next effect
    state.board[nextMineState.row][nextMineState.col] = nextMineState
    mines.splice(randomSeqNum, 1);

    return {
      ...state,
      mines
    }
  }

  return state
}

export default defeatReducer
