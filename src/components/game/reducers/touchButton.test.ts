import touchButtonReducer from './touchButton'
import { newGameState, playingGameState } from '../../../__mocks__/game-states'
import { microConfig } from '../../../__mocks__/configs'
import { PayloadAction } from '../../../common/game-types'

/*
import { simpleEasyConfig, simpleHardConfig } from '../../../__mocks__/configs'

import { iterateNeighbours } from '../common'
import { AppConfig } from '../../../common/app-types'
import { GameState, GameStages, GameActionType, PayloadAction, CellActionData, CellStateStage, CellState, CellStateEntry } from '../../../common/game-types'
*/

describe('touch new game', () => {
  const moveCell = '{"row":0,"col":0}'
  const moveEntry = '{"stage":"clicked"}'
  const moveAction = { type: 'MOVE', payload: `{"cell":${moveCell},"entry":${moveEntry}}` } as PayloadAction

  it('should record time of first touch', () => {
    const spy = jest.spyOn(Date, 'now')
    expect(newGameState.begin).toBe(0)

    const touchedState = touchButtonReducer(newGameState, moveAction, microConfig)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(touchedState.begin).toBeGreaterThan(0)
  })

  it('should advance gameState stage', () => {
    expect(newGameState.stage).toBe('game-new')

    const touchedState = touchButtonReducer(newGameState, moveAction, microConfig)

    expect(touchedState.stage).toBe('game-playing')
  })
})

describe('touch game in progress', () => {

  /*
  could be tested
  could be released
  could be flagged
  could be unflagged

  should explode when tested
  should be released when tested
  should release neighbours when tested
  */

  it('should be flagged', () => {
    const flagCell = '{"row":0,"col":0}'
    const flagEntry = '{"locked":true}'
    const flagAction = { type: 'FLAG', payload: `{"cell":${flagCell},"entry":${flagEntry}}` } as PayloadAction

    let targetCell = playingGameState.board[0][0]
    expect(targetCell.locked).toBeFalsy()

    const nextGameState = touchButtonReducer(playingGameState, flagAction, microConfig)

    targetCell = nextGameState.board[0][0]
    expect(targetCell.locked).toBeTruthy()
  })

  it('should be unflagged', () => {
    const flagCell = '{"row":0,"col":0}'
    const flagEntry = '{"locked":false}'
    const flagAction = { type: 'FLAG', payload: `{"cell":${flagCell},"entry":${flagEntry}}` } as PayloadAction

    let targetCell = playingGameState.board[0][0]
    targetCell.locked = true
    expect(targetCell.locked).toBeTruthy()

    const lastGameState = touchButtonReducer(playingGameState, flagAction, microConfig)

    targetCell = lastGameState.board[0][0]
    expect(targetCell.locked).toBeFalsy()
  })

  it('should open neighbours when clicked cell with fill 0', () => {
    const moveCell = '{"fill":0,"row":0,"col":2}'
    const moveEntry = '{"stage":"clicked"}'
    const moveAction = { type: 'MOVE', payload: `{"cell":${moveCell},"entry":${moveEntry}}` } as PayloadAction

    let targetCell = newGameState.board[0][2]
    expect(targetCell.stage).toBe('')
    // neighbours
    expect(newGameState.board[0][1].stage).toBe('')
    expect(newGameState.board[1][1].stage).toBe('')
    expect(newGameState.board[1][2].stage).toBe('')

    const nextGameState = touchButtonReducer(newGameState, moveAction, microConfig)

    targetCell = nextGameState.board[0][2]
    expect(targetCell.stage).toBe('clicked')
    // neighbours
    expect(nextGameState.board[0][1].stage).toBe('opened')
    expect(nextGameState.board[1][1].stage).toBe('opened')
    expect(nextGameState.board[1][2].stage).toBe('opened')
  })

  it('should indicate clicked cell with fill 1 thru 8', () => {
    const moveCell = '{"fill":1,"row":0,"col":1}'
    const moveEntry = '{"stage":"clicked"}'
    const moveAction = { type: 'MOVE', payload: `{"cell":${moveCell},"entry":${moveEntry}}` } as PayloadAction

    let targetCell = newGameState.board[0][1]
    expect(targetCell.stage).toBe('')
    // neighbours
    expect(newGameState.board[0][2].stage).toBe('')
    expect(newGameState.board[1][1].stage).toBe('')

    const nextGameState = touchButtonReducer(newGameState, moveAction, microConfig)

    targetCell = nextGameState.board[0][1]
    expect(targetCell.stage).toBe('clicked')
    // neighbours
    expect(nextGameState.board[0][2].stage).toBe('')
    expect(nextGameState.board[1][1].stage).toBe('')
  })

  it('should explode and open others when click cell with fill 9+', () => {
    const moveCell = '{"fill":9,"row":0,"col":0}'
    const moveEntry = '{"stage":"clicked"}'
    const moveAction = { type: 'MOVE', payload: `{"cell":${moveCell},"entry":${moveEntry}}` } as PayloadAction

    let targetCell = newGameState.board[0][0]
    expect(targetCell.stage).toBe('')
    expect(newGameState.stage).toBe('game-new')
    expect(newGameState.board[0][1].stage).toBe('')
    expect(newGameState.board[0][2].stage).toBe('')
    expect(newGameState.board[1][0].stage).toBe('')
    expect(newGameState.board[1][1].stage).toBe('')
    expect(newGameState.board[1][2].stage).toBe('')
    expect(newGameState.board[2][0].stage).toBe('')
    expect(newGameState.board[2][1].stage).toBe('')
    expect(newGameState.board[2][2].stage).toBe('')

    const nextGameState = touchButtonReducer(newGameState, moveAction, microConfig)

    targetCell = nextGameState.board[0][0]
    expect(targetCell.stage).toBe('clicked')
    expect(nextGameState.stage).toBe('game-lost')
    expect(nextGameState.board[0][1].stage).toBe('opened')
    expect(nextGameState.board[0][2].stage).toBe('opened')
    expect(nextGameState.board[1][0].stage).toBe('opened')
    expect(nextGameState.board[1][1].stage).toBe('opened')
    expect(nextGameState.board[1][2].stage).toBe('opened')
    expect(nextGameState.board[2][0].stage).toBe('opened')
    expect(nextGameState.board[2][1].stage).toBe('opened')
    expect(nextGameState.board[2][2].stage).toBe('opened')
  })

  it('should win when only bombs were left untouched', () => {
    const moveCell = '{"fill":0,"row":0,"col":2}'
    const moveEntry = '{"stage":"clicked"}'
    const moveAction = { type: 'MOVE', payload: `{"cell":${moveCell},"entry":${moveEntry}}` } as PayloadAction

    expect(newGameState.stage).toBe('game-new')

    const nextGameState = touchButtonReducer(newGameState, moveAction, microConfig)

    const moveCell2 = '{"fill":0,"row":2,"col":0}'
    const moveAction2 = { type: 'MOVE', payload: `{"cell":${moveCell2},"entry":${moveEntry}}` } as PayloadAction

    expect(nextGameState.stage).toBe('game-playing')

    const lastGameState = touchButtonReducer(nextGameState, moveAction2, microConfig)

    expect(lastGameState.stage).toBe('game-won')
  })
})
