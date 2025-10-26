import { CellStateStage } from './../common/game.d'

const cellStates = {
  // not showing anything, can get / lose a flag
  pristine: {
    blank: { row: 1, col: 2, fill: 0, stage: CellStateStage.HIDDEN },
    value: { row: 2, col: 3, fill: 2, stage: CellStateStage.HIDDEN },
    mijn: { row: 3, col: 4, fill: 9, stage: CellStateStage.HIDDEN },
  },
  flagged: {
    blank: { row: 1, col: 2, fill: 0, stage: CellStateStage.HIDDEN, locked: true },
    value: { row: 2, col: 3, fill: 2, stage: CellStateStage.HIDDEN, locked: true },
    mijn: { row: 3, col: 4, fill: 9, stage: CellStateStage.HIDDEN, locked: true },
  },
  // immutable by user, flag meaningless,
  // programmatically done by iterating blanks to find neighbours, which are always value cells
  // and at the end all hidden cells are released
  opened: {
    blank: { row: 1, col: 2, fill: 0, stage: CellStateStage.RELEASED },
    value: { row: 2, col: 3, fill: 2, stage: CellStateStage.RELEASED },
    mijn: { row: 3, col: 4, fill: 9, stage: CellStateStage.RELEASED },
  },
  // immutable, flag meaningless
  // clicked is programmatically done with all mines
  clicked: {
    blank: { row: 1, col: 2, fill: 0, stage: CellStateStage.TESTED },
    value: { row: 2, col: 3, fill: 2, stage: CellStateStage.TESTED },
    mijn: { row: 3, col: 4, fill: 9, stage: CellStateStage.TESTED },
  },
}

export default cellStates
