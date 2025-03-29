import { GameState, CellState, CellStateStage } from '../../../common/game-types'

const defeatReducer = (state: GameState): GameState => {

  const mines: CellState[] = state.board
    .flat()
    .filter(cell => cell.stage === CellStateStage.RELEASED && cell.fill > 8)

  if (mines.length) {
    // trigger next mine in next effect
    const pickOne = Math.floor(mines.length * Math.random())
    state.board[mines[pickOne].row][mines[pickOne].col] = {
      ...mines[pickOne],
      stage: CellStateStage.TESTED
    }
    state.board = [...state.board]

    return {
      ...state,
      mines
    }
  }

  return state
}

export default defeatReducer
