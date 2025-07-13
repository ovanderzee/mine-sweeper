import { loadReducer } from './load'
import { PayloadAction } from '../../../common/game-types'
import storage from '../../../common/storage'
import { playingGameState } from '../../../__mocks__/game-states'

test('loads persisted state', () => {
   const spy = jest.spyOn(JSON, 'parse')
   const anything = {"stage":"game-playing","board":[[{"row":0,"col":0}]]}
   const persisted = JSON.stringify(anything)

   const action = { type: 'LOAD', payload: persisted } as PayloadAction
   const state = loadReducer(action)

   expect(spy).toHaveBeenCalledWith(persisted)
   expect(state.stage).toBe(anything.stage)
   expect(state.board).toStrictEqual(anything.board)
})

test('loading from storage updates the timestamps', () => {
    storage.game = playingGameState
    const keptTimeLapse = playingGameState.tShift - playingGameState.tZero
    const keptGameState = JSON.stringify(storage.game)

    const loadAction = { type: 'LOAD', payload: keptGameState } as PayloadAction
    const newState = loadReducer(loadAction)

    expect(newState.tShift).toBeGreaterThan(playingGameState.tShift)
    expect(keptTimeLapse).toBe(newState.tShift - newState.tZero)
})
