import { iterateNeighbours } from '../common'
import { AppConfig } from '../../../common/app-types'
import { GameState, GameStages, GameActionType, PayloadAction, CellActionData, CellStateStage, CellState, CellStateEntry } from '../../../common/game-types'

const touchButtonReducer = (state: GameState, action: PayloadAction, config: AppConfig): GameState => {
  const { BOARD_SIZE, MINE_COUNT } = config
  const payload: CellActionData = JSON.parse(action.payload)
  const { stage, fill, row, col } = payload.cell
  const updState = { ...state }

  if (state.stage === GameStages.NEW) {
    updState.stage = GameStages.PLAYING
    updState.begin = Date.now()
  }

  if (
    updState.stage !== GameStages.PLAYING || state.end || stage
  )
    return state

  const updBoard = state.board.map((row: CellState[]) => row.map(cell => cell))
  let updCell = updBoard[row][col]

  /** open cells with digits or pristine cells only */
  const touchCell = (source: CellState, entry: CellStateEntry): CellState =>
    updBoard[source.row][source.col] = {
      ...source,
      ...entry,
    }

  updCell = touchCell(updCell, payload.entry)

  if (action.type === GameActionType.FLAG) {
    // then entry = {locked: <Boolean>}
    return {
      ...updState,
      board: updBoard,
    }
  }

  /** Followup touches */

  const findPristineCells = (): CellState[] =>
    updBoard
      .map((row) => row.filter((cell) => !cell.stage))
      .flat()

  if (fill === 0) {
    // blank cell touched, touch it's neighbours recursively
    const touchBlankNeighbours = (x: number, y: number) => {
      const neighbourCell = updBoard[x][y]
      // do not touch touched or locked cells
      if (neighbourCell.stage || neighbourCell.locked)
        return
      touchCell(neighbourCell, { stage: CellStateStage.RELEASED })
      // iterate while being a blank
      if (neighbourCell.fill === 0)
        iterateNeighbours(updBoard[x][y], BOARD_SIZE, touchBlankNeighbours)
    }
    iterateNeighbours(updCell, BOARD_SIZE, touchBlankNeighbours)
  } else if (fill > 8) {
    // mine touched, touch all buttons, game lost
    findPristineCells().forEach((cell) => touchCell(cell, { stage: CellStateStage.RELEASED }))
    updState.stage = GameStages.LOST
    updState.end = Date.now()
  } else {
    // neighbour of mine touched, show contents
  }

  const pristineCells = findPristineCells()
  if (pristineCells.length === MINE_COUNT) {
    // only mines remain, touch remaining buttons, game won
    pristineCells.forEach((cell) => touchCell(cell, { stage: CellStateStage.RELEASED }))
    updState.stage = GameStages.WON
    updState.end = Date.now()
  }

  return {
    ...updState,
    board: updBoard,
  }
}

export default touchButtonReducer
