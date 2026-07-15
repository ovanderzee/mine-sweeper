import { Page } from '@playwright/test'
import { CellState } from '../../src/common/game.d'
import { getGameData } from './run-helpers'

export const elapsedSeconds = async (page: Page): Promise<number> => {
  const gameState = await getGameData(page)
  return Math.round((gameState.tShift - gameState.tZero) / 1000)
}

export const gameStage = async (page: Page): Promise<string> => {
  const gameState = await getGameData(page)
  return gameState.stage
}

export let boardSize = 0
export const getFlatBoard = async (page: Page): Promise<CellState[]> => {
  const stored = await getGameData(page)
  boardSize = stored.board.length
  return stored.board.flat()
}

const getButtonIndex = (data: CellState | undefined): number => {
  if (data)
    return (data.row * boardSize) + data.col
  else
    console.error('No button to process')
    return -1
}

export const nextBlank = async (page: Page): Promise<number> => {
  const cell = (await getFlatBoard(page)).find(c => c.fill === 0 && !c.stage)
  return getButtonIndex(cell)
}
export const nextPointer = async (page: Page): Promise<number> => {
  const cell = (await getFlatBoard(page)).find(c => c.fill > 0 && c.fill < 9 && !c.stage)
  return getButtonIndex(cell)
}
export const nextMine = async (page: Page): Promise<number> => {
  const cell = (await getFlatBoard(page)).find(c => c.fill > 8 && !c.stage)
  return getButtonIndex(cell)
}

// options

export const applyNewGame = async (page: Page): Promise<void> => await page.getByRole('navigation').getByTitle('New Game').click()

export const applyReplayGame = async (page: Page): Promise<void> => await page.getByTitle('Replay').click()
