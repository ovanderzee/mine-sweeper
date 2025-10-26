import { GameState, PayloadAction } from '../../../common/game.d'

export const loadReducer = (action: PayloadAction): GameState => {
  const parsedState: GameState = JSON.parse(action.payload)
  const consumedTime = parsedState.tShift - parsedState.tZero
  parsedState.tShift = Date.now()
  parsedState.tZero = Date.now() - consumedTime
  return parsedState
}
