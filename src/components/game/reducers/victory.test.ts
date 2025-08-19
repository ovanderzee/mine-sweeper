import { victoryReducer } from './victory'
import storage from '../../../common/storage'
import { microConfig } from '../../../__mocks__/configs'
import { wonGameState } from '../../../__mocks__/game-states'

describe('victoryReducer makes up scores', () => {
  test('should persist scores', () => {
    const initialScores = storage.scores

    victoryReducer(wonGameState, microConfig)
    const updatedScores = storage.scores

    expect(updatedScores.length).toBe(initialScores.length + 1)
  })

  test('should add concise victory info to game state', () => {
    const victoryState = victoryReducer(wonGameState, microConfig)

    expect(victoryState.score.rank).toBeTruthy()
    expect(victoryState.score.score.points).toBeTruthy()
  })
});
