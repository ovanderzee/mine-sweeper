import { loadReducer } from './load'
import { PayloadAction } from '../../../common/game-types'

test('loads persisted state', () => {
   const spy = jest.spyOn(JSON, 'parse')
   const persisted = '{"a":"playing","b":[[{"row":0,"col":0}]]}'

   const action = { type: 'LOAD', payload: persisted } as PayloadAction
   const state = loadReducer(action)

   expect(spy).toHaveBeenCalledWith(persisted)
   expect(JSON.stringify(state)).toBe(persisted)
})
