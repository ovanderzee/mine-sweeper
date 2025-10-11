import '@testing-library/jest-dom'
import { fireEvent, screen, within } from '@testing-library/react'
import { act } from 'react';
import * as load from './reducers/load'
import * as newGame from './reducers/newGame'
import * as replay from './reducers/replay'
import * as touchButton from './reducers/touchButton'
import * as victory from './reducers/victory'
import * as defeat from './reducers/defeat'
import { CellState, GameState } from './../../common/game-types'
import storage from './../../common/storage'
import {
  referAndNavigateTo, setDefaultConfig, startPageTesting,
  clickGameButton, clickToLoose, clickToWin
} from './../../__mocks__/specification-helpers'
import { newGameState, playingGameState, lostGameState, wonGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'

// prevent trouble with setInterval
const MockTimeTracker = () => <br />
jest.mock("./../tips/TimeTracker", () => () => {
  return <MockTimeTracker data-testid="time-tracker" />;
});

describe('The game cells', () => {
  beforeEach(() => {
    storage.config = microConfig
  })

  afterEach(() => {
    act(() => {
      jest.runAllTimers()
    })
  })

  it('should open neighbour cells when a blank cell was clicked', () => {
    storage.game = newGameState
    startPageTesting()
    const leftButton = document.querySelector(`#row0col1`) as HTMLButtonElement
    const blankButton = document.querySelector(`#row0col2`) as HTMLButtonElement
    const leftdownButton = document.querySelector(`#row1col1`) as HTMLButtonElement
    const downButton = document.querySelector(`#row1col2`) as HTMLButtonElement

    expect(leftButton.className).toMatch(/pristine/i)
    expect(blankButton.className).toMatch(/pristine/i)
    expect(leftdownButton.className).toMatch(/pristine/i)
    expect(downButton.className).toMatch(/pristine/i)

    clickGameButton(blankButton)

    expect(leftButton.className).toMatch(/touched/i)
    expect(blankButton.className).toMatch(/touched/i)
    expect(leftdownButton.className).toMatch(/touched/i)
    expect(downButton.className).toMatch(/touched/i)
  })
})

describe('The game sidebar', () => {
  beforeEach(() => {
    startPageTesting()
  })

  it("should navigate to HallOfFame page", () => {
    referAndNavigateTo.hallOfFame()
    const heading = screen.getByText(/Hall of Fame/i)
    expect(heading).toBeTruthy()
  })

  it("should navigate to About page", () => {
    referAndNavigateTo.about()
    const heading = screen.getByText(/Defuse all mines/i)
    expect(heading).toBeTruthy()
  })

  it("should navigate to Configure page", () => {
    referAndNavigateTo.config()
    const heading = screen.getByText(/General Settings/i)
    expect(heading).toBeTruthy()
  })
})

describe('The game start button', () => {
  let navOptions: HTMLElement | null

  beforeEach(() => {
    storage.config = microConfig
  })

  afterEach(() => {
    act(() => {
      jest.runAllTimers()
    })
  })

  it('should start a new game when game ended', () => {
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    expect(storage.game.stage).toBe('game-playing')

    clickToLoose()
    expect(storage.game.stage).toBe('game-lost')

    const button = within(navOptions).getByTitle('New Game')
    fireEvent.click(button)

    expect(storage.game.stage).toBe('game-new')
  })

  it("should not start a new game on cancel when game is in progress", () => {
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    expect(storage.game.stage).toBe('game-playing')

    const button = within(navOptions).getByTitle('New Game')
    fireEvent.click(button)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    const cancelBtn = within(dialog).getByText('Cancel')
    fireEvent.click(cancelBtn)

    expect(storage.game.stage).toBe('game-playing')
  })

  it("should start a new game on confirm when game is in progress", () => {
    const newGameReducerSpy = jest.spyOn(newGame, 'newGameReducer')
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    expect(storage.game.stage).toBe('game-playing')

    const button = within(navOptions).getByTitle('New Game')
    fireEvent.click(button)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    const confirmBtn = within(dialog).getByText('OK')
    fireEvent.click(confirmBtn)

    expect(newGameReducerSpy).toHaveBeenCalledTimes(1)
    expect(storage.game.stage).toBe('game-new')
  })
})

describe('The replay button', () => {
  const hasSameMineDistribution = ((game1: GameState, game2: GameState): boolean  => {
    const board1 = game1.board.flat()
    const board2 = game2.board.flat()

    if (board1.length != board2.length) {
      throw `Boards cannot be compared: ${board1.length} != ${board2.length}`
    }

    const equals = board1.filter((x: CellState, index: number) => {
      return x && board1[index].fill === board2[index].fill
    })

    return equals.length === board1.length
  })

  let navOptions: HTMLElement | null

  beforeEach(() => {
    storage.config = microConfig
  })

  afterEach(() => {
    act(() => {
      jest.runAllTimers()
    })
  })

  it("should restart a lost game", () => {
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    clickToLoose()
    expect(storage.game.stage).toBe('game-lost')

    const button = within(navOptions).getByTitle('Replay')
    fireEvent.click(button)

    const isSame = hasSameMineDistribution(playingGameState, storage.game)
    expect(isSame).toBeTruthy()
    expect(storage.game.stage).toBe('game-new')
  })

  it("should restart a won game", () => {
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    clickToWin()
    expect(storage.game.stage).toBe('game-won')

    const button = within(navOptions).getByTitle('Replay')
    fireEvent.click(button)

    const isSame = hasSameMineDistribution(playingGameState, storage.game)
    expect(isSame).toBeTruthy()
    expect(storage.game.stage).toBe('game-new')
  })


  it("should cancel replaying a game in progress", () => {
    const replayReducerSpy = jest.spyOn(replay, 'replayReducer')
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    expect(storage.game.stage).toBe('game-playing')

    const button = within(navOptions).getByTitle('Replay')
    fireEvent.click(button)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    const cancelBtn = within(dialog).getByText('Cancel')
    fireEvent.click(cancelBtn)

    expect(storage.game.stage).toBe('game-playing')
    expect(replayReducerSpy).not.toHaveBeenCalled()
  })

  it("should confirm replaying a game in progress", () => {
    const replayReducerSpy = jest.spyOn(replay, 'replayReducer')
    storage.game = playingGameState
    startPageTesting()
    navOptions = document.querySelector('.screen > nav') as HTMLElement
    expect(storage.game.stage).toBe('game-playing')

    const button = within(navOptions).getByTitle('Replay')
    fireEvent.click(button)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    const confirmBtn = within(dialog).getByText('OK')
    fireEvent.click(confirmBtn)

    const isSame = hasSameMineDistribution(playingGameState, storage.game)
    expect(isSame).toBeTruthy()
    expect(storage.game.stage).toBe('game-new')
    expect(replayReducerSpy).toHaveBeenCalled()
  })
})

describe('initialise game', () => {
  beforeEach(() => {
    setDefaultConfig()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should load a game when finding a untouched game', () => {
    storage.game = newGameState
    const loadReducerSpy = jest.spyOn(load, 'loadReducer')
    startPageTesting()
    expect(loadReducerSpy).toHaveBeenCalledTimes(1)
    expect(storage.game.stage).toBe('game-new')
  })

  it('should load a game when finding an unfinished game', () => {
    storage.game = playingGameState
    const loadReducerSpy = jest.spyOn(load, 'loadReducer')
    startPageTesting()
    expect(loadReducerSpy).toHaveBeenCalledTimes(1)
    expect(storage.game.stage).toBe('game-playing')
  })

  it('should start a new game when finding an lost game', () => {
    storage.game = lostGameState
    const newGameReducerSpy = jest.spyOn(newGame, 'newGameReducer')
    startPageTesting()
    expect(newGameReducerSpy).toHaveBeenCalledTimes(1)
    expect(storage.game.stage).toBe('game-new')
  })

  it('should start a new game when finding a won game', () => {
    storage.game = wonGameState
    const newGameReducerSpy = jest.spyOn(newGame, 'newGameReducer')
    startPageTesting()
    expect(newGameReducerSpy).toHaveBeenCalledTimes(1)
    expect(storage.game.stage).toBe('game-new')
  })

  it('should start a new game when finding no game', () => {
    storage.eraseGame()
    const newGameReducerSpy = jest.spyOn(newGame, 'newGameReducer')
    startPageTesting()
    expect(newGameReducerSpy).toHaveBeenCalledTimes(1)
    expect(storage.game?.stage).toBe('game-new')
  })
})

describe('handle loosing and winning', () => {
  beforeEach(() => {
    storage.config = microConfig
  })

  afterEach(() => {
    act(() => {
      jest.runAllTimers()
    })
  })

  it('should celebrate a won game', () => {
    storage.game = playingGameState
    const victoryReducerSpy = jest.spyOn(victory, 'victoryReducer')
    const touchButtonReducerSpy = jest.spyOn(touchButton, 'touchButtonReducer')
    startPageTesting()
    clickToWin()

    expect(storage.game.stage).toBe('game-won')
    expect(touchButtonReducerSpy).toHaveBeenCalled()
    expect(victoryReducerSpy).toHaveBeenCalledTimes(1)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })

  it('should reflect on a lost game', () => {
    storage.game = playingGameState
    const defeatReducerSpy = jest.spyOn(defeat, 'defeatReducer')
    const touchButtonReducerSpy = jest.spyOn(touchButton, 'touchButtonReducer')
    startPageTesting()
    clickToLoose()

    expect(storage.game.stage).toBe('game-lost')
    expect(touchButtonReducerSpy).toHaveBeenCalled()
    expect(defeatReducerSpy).toHaveBeenCalled()
  })
})
