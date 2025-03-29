import { GameState, PayloadAction } from '../../../common/game-types'

const loadReducer = (action: PayloadAction): GameState => {
  const parsedState: GameState = JSON.parse(action.payload)
  return parsedState
}

export default loadReducer
