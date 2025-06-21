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


  switch(action.type) {
    case GameActionType.LOAD: return loadReducer(action as PayloadAction)

    case GameActionType.STORE:
      storage.game = state
      return state

    case GameActionType.NEW: return newGameReducer(config)

    case GameActionType.REPLAY: return replayReducer(state)

    case GameActionType.VICTORY: return victoryReducer(state, config)

    case GameActionType.DEFEAT: return defeatReducer(state)

    default:
      // GameActionType.MOVE || GameActionType.FLAG
      return touchButtonReducer(state, action as PayloadAction, config)
  }
}
