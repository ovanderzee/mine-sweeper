import { touchButtonReducer  } from './reducers/touchButton'
import { GameState, GameActionType, PayloadAction } from '../../common/game-types'
import { scoringConfig } from '../../__mocks__/configs'

export const clickBlankRegions = (game: GameState) => {
  let allCells
  let allThese
  let clicks = 0

  do {
    allCells = game.board.flat()
    allThese = allCells.filter(cell => !cell.fill && !cell.stage)

    if (!allThese.length) break

    const blank = allThese[0]

    const payload = JSON.stringify({ cell: blank, entry: { stage: "clicked" } })
    const action: PayloadAction = { payload, type: GameActionType.MOVE }
    clicks++

    game = touchButtonReducer(game, action, scoringConfig)

  } while (true)

  return {clicks, game}
}

export const clickRemainingPointers = (game: GameState) => {
  let allCells
  let allThese
  let clicks = 0

  do {
    allCells = game.board.flat()
    allThese = allCells.filter(cell => cell.fill < 9 && !cell.stage)

    if (!allThese.length) break

    const pointer = allThese[0]

    const payload = JSON.stringify({ cell: pointer, entry: { stage: "clicked" } })
    const action: PayloadAction = { payload, type: GameActionType.MOVE }
    clicks++

    game = touchButtonReducer(game, action, scoringConfig)
  } while (true)

  return {clicks, game}
}

export const leastClicksToWin = (game: GameState) => {
  const regionResult = clickBlankRegions(game)
  const pointerResult = clickRemainingPointers(regionResult.game)
  return regionResult.clicks + pointerResult.clicks
}
