import { GameState, CellState, CellStateStage } from '../../../common/game.d'
import { AppConfig } from '../../../common/app.d'
import { MAX_DETONATIONS } from '../../../common/constants'
import { focusFirstNavButton } from '../../../common/functions'

export const defeatReducer = (state: GameState, config: AppConfig): GameState => {
  const minesToDo: CellState[] = state.board
    .flat()
    .filter(cell => cell.stage === CellStateStage.RELEASED && cell.fill > 8)

  const mineCount = config.MINE_COUNT - 1 // one was blown onclick
  const floatingSize = Math.min(mineCount / MAX_DETONATIONS, minesToDo.length)
  const batchSize = (Math.random() < floatingSize % 1 || floatingSize < 1) ? Math.ceil(floatingSize) : Math.floor(floatingSize);
  const mineBatch = Array(batchSize)

  if (batchSize) {
    let pickIndex = 0
    do {
      const randomSeqNum = Math.floor(minesToDo.length * Math.random())

      const nextMine = minesToDo.splice(randomSeqNum, 1)[0]
      mineBatch[pickIndex] = {
        ...nextMine,
        stage: CellStateStage.TESTED,
        burst: !pickIndex
      }

      // trigger next mine in next effect
      state.board[nextMine.row][nextMine.col] = mineBatch[pickIndex]
      pickIndex++;

    } while (pickIndex < mineBatch.length)

    return {
      ...state,
      mines: mineBatch
    }
  }

  focusFirstNavButton()
  return state
}
