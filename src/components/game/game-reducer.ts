import { initialGameState } from './common'
import { loadReducer } from './reducers/load'
import { newGameReducer } from './reducers/newGame'
import { replayReducer } from './reducers/replay'
import { touchButtonReducer } from './reducers/touchButton'
import { victoryReducer } from './reducers/victory'
import { defeatReducer } from './reducers/defeat'
import { AppConfig } from '../../common/app-types'
import { GameState, GameAction, GameActionType, PayloadAction } from '../../common/game-types'
import storage from '../../common/storage'

export const gameReducer = function (this: AppConfig, state: GameState, action: GameAction) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const config: AppConfig = this

  if (action.type === GameActionType.LOAD) {
    return loadReducer(action as PayloadAction)
  }

  if (action.type === GameActionType.STORE) {
    storage.game = state
    return state
  }

  if (action.type === GameActionType.NEW) {
    return newGameReducer(config)
  }

  if (action.type === GameActionType.REPLAY) {
    return replayReducer(state)
  }

  if (action.type === GameActionType.MOVE || action.type === GameActionType.FLAG) {
    return touchButtonReducer(state, action as PayloadAction, config)
  }

  if (action.type === GameActionType.VICTORY) {
    return victoryReducer(state, config)
  }

  if (action.type === GameActionType.DEFEAT) {
    return defeatReducer(state)
  }

  return initialGameState
}
