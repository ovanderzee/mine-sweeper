import '@testing-library/jest-dom'
import { act, fireEvent, within } from '@testing-library/react'
import { vi } from 'vitest'
// import * as load from './reducers/load'
// import * as newGame from './reducers/newGame'
// import * as replay from './reducers/replay'
import * as touchButton from './reducers/touchButton'
// import * as victory from './reducers/victory'
// TODO import * as defeat from './reducers/defeat'
import { CellState, GameState } from './../../common/game.d'
import storage from './../../common/storage'
import {
  startPageTesting, clickToLoose, clickToWin
} from './../../__mocks__/specification-helpers'
import { playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'

// prevent trouble with setInterval
vi.mock("./../tips/Tips");



describe('handle loosing and winning', () => {
  beforeEach(() => {
    storage.config = microConfig
  })

  afterEach(() => {
    act(() => {
      vi.runAllTimers()
    })
  })

  /*it('should celebrate a won game', () => {
    storage.game = playingGameState
    const victoryReducerSpy = vi.spyOn(victory, 'victoryReducer')
    const touchButtonReducerSpy = vi.spyOn(touchButton, 'touchButtonReducer')
    newPortalLayer('modal')
    startPageTesting()
    clickToWin()

    expect(storage.game.stage).toBe('game-won')
    expect(touchButtonReducerSpy).toHaveBeenCalled()
    expect(victoryReducerSpy).toHaveBeenCalledTimes(1)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })*/


})
