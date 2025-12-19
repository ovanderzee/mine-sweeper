import { beforeEach, describe, expect, it, vi, MockInstance } from 'vitest'
import { userEvent } from 'vitest/browser'
import { RenderResult } from 'vitest-browser-react'
import DEFAULTS from './../../common/defaults'
import storage from './../../common/storage'
import * as functions from './../../common/functions'
import { renderWithProvider, clickRangeInputValue } from './../../__mocks__/aat-helpers'
import { playingGameState } from './../../__mocks__/game-states'
import { microConfig } from './../../__mocks__/configs'
import { liveScores } from './../../__mocks__/scores'
import { RANGES } from '../../common/constants'
import Configure from './Configure'

describe('The configure page sidebar', () => {
  let screen: RenderResult

  beforeEach(async () => screen = await renderWithProvider(<Configure/>))

  it('should offer navigation to About page', () => {
    expect(screen.getByTitle('Description')).toBeInTheDocument()
  })

  it('should offer navigation to HallOfFame page', () => {
    expect(screen.getByTitle('Hall of Fame')).toBeInTheDocument()
  })

  it('should offer navigation to Game page', () => {
    expect(screen.getByTitle('Return to Game')).toBeInTheDocument()
  })

})

describe('The configure controls', () => {
  let screen: RenderResult

  beforeEach(async () => {
    storage.config = DEFAULTS
    screen = await renderWithProvider(<Configure/>)
  })

  it('should change the board-size setting', async () => {
    expect(storage.config.BOARD_SIZE).toBe(6)
    const range = screen.getByLabelText('Gameboard dimensions')
    clickRangeInputValue(range.element() as HTMLInputElement, '8')

    expect(storage.config.BOARD_SIZE).toBe(8)
  })

  it('should enforce minimum board-size setting', () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    clickRangeInputValue(range.element() as HTMLInputElement, '1')
    expect(storage.config.BOARD_SIZE).toBe(RANGES.SIZE.min)
  })

  it('should enforce maximum board-size setting', () => {
    const range = screen.getByLabelText('Gameboard dimensions')
    clickRangeInputValue(range.element() as HTMLInputElement, '40')
    expect(storage.config.BOARD_SIZE).toBe(RANGES.SIZE.max)
  })

  it('should trigger a new game on board-size change', () => {
    storage.game = playingGameState
    const range = screen.getByLabelText('Gameboard dimensions')
    clickRangeInputValue(range.element() as HTMLInputElement, '7')
    expect(storage.config.BOARD_SIZE).toBe(7)
    expect(storage.game).not.toStrictEqual(playingGameState)
  })

  it('should change the gamelevel setting', () => {
    expect(storage.config.GAME_LEVEL).toBe(3)
    const range = screen.getByLabelText('Gamelevel')
    clickRangeInputValue(range.element() as HTMLInputElement, '6')
    expect(storage.config.GAME_LEVEL).toBe(6)
  })

  it('should enforce minimum gamelevel setting', () => {
    const range = screen.getByLabelText('Gamelevel')
    clickRangeInputValue(range.element() as HTMLInputElement, '0')
    expect(storage.config.GAME_LEVEL).toBe(RANGES.LEVEL.min)
  })

  it('should enforce maximum gamelevel setting', () => {
    const range = screen.getByLabelText('Gamelevel')
    clickRangeInputValue(range.element() as HTMLInputElement, '10')
    expect(storage.config.GAME_LEVEL).toBe(RANGES.LEVEL.max)
  })

  it('should trigger a new game on gamelevel change', () => {
    storage.game = playingGameState
    const range = screen.getByLabelText('Gamelevel')
    clickRangeInputValue(range.element() as HTMLInputElement, '5')
    expect(storage.config.GAME_LEVEL).toBe(5)
    expect(storage.game).not.toStrictEqual(playingGameState)
  })

  it('should change the language setting', async () => {
    expect(storage.config.LANGUAGE).toBe('en')
    const languages = screen.getByLabelText('Translations')
    await languages.selectOptions('nl')
    expect(storage.config.LANGUAGE).toBe('nl')
  })

  it('should change the zoom setting', () => {
    expect(storage.config.FONT_SIZE).toBe(15)
    const range = screen.getByLabelText('Zoom display')
    clickRangeInputValue(range.element() as HTMLInputElement, '12')
    expect(storage.config.FONT_SIZE).toBe(12)
  })

  it('should enforce a minimum zoom setting', () => {
    const range = screen.getByLabelText('Zoom display')
    clickRangeInputValue(range.element() as HTMLInputElement, '5')
    expect(storage.config.FONT_SIZE).toBe(RANGES.FONT.min)
  })

  it('should enforce a maximum zoom setting', () => {
    const range = screen.getByLabelText('Zoom display')
    clickRangeInputValue(range.element() as HTMLInputElement, '72')
    expect(storage.config.FONT_SIZE).toBe(RANGES.FONT.max)
  })

  it('should change the name setting', async () => {
    const input = screen.getByLabelText('Name in scores')
    await userEvent.fill(input, 'Moorefly')
    expect(storage.config.PLAYER_NAME).toBe('Moorefly')
  })

  it('should change the max-scores setting', () => {
    expect(storage.config.MAX_SCORES).toBe(500)
    const range = screen.getByLabelText('Max records')
    clickRangeInputValue(range.element() as HTMLInputElement, '642')
    expect(storage.config.MAX_SCORES).toBe(642)
  })

  it('should not instantaneously remove scores', () => {
    storage.scores = liveScores
    const range = screen.getByLabelText('Max records')
    clickRangeInputValue(range.element() as HTMLInputElement, '33')
    expect(storage.scores.length).toBe(liveScores.length)
  })

  it('should enforce minimum max-scores setting', () => {
    const range = screen.getByLabelText('Max records')
    clickRangeInputValue(range.element() as HTMLInputElement, '0')
    expect(storage.config.MAX_SCORES).toBe(RANGES.SCORES.min)
  })

  it('should enforce maximum max-scores setting', () => {
    const range = screen.getByLabelText('Max records')
    clickRangeInputValue(range.element() as HTMLInputElement, '1940')
    expect(storage.config.MAX_SCORES).toBe(RANGES.SCORES.max)
  })
})

describe('The configure-page reset button', () => {

  it('should restore default config', async () => {
    storage.game = null
    storage.config = microConfig
    const screen = await renderWithProvider(<Configure/>)
    await screen.getByTitle('Revert to Defaults').click()
    expect(storage.config).toStrictEqual(DEFAULTS)
  })

})

describe('The semantic form', () => {
  // https://vitest.dev/guide/browser/#limitations
  vi.mock('./../../common/functions', { spy: true })

  let screen: RenderResult,
    preventSpy: MockInstance

  beforeEach(async () => {
    preventSpy = vi.spyOn(functions, 'preventReloadByEnter')
    screen = await renderWithProvider(<Configure/>)
  })

  it('should call function to prevent submitting by text-inputs', async () => {
    const formField = screen.getByLabelText('Name in scores').query()

    await formField?.focus()
    await userEvent.keyboard('{Enter}')

    expect(formField).toBeInTheDocument()
    expect(preventSpy).toHaveBeenCalled()
    expect(preventSpy).toHaveReturnedWith(true)
  })
})
