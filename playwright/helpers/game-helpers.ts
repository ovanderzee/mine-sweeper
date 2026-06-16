import { test, expect } from '@playwright/test'
import { testUrl } from '../helpers/run-helpers'

export const getGameData = async (page) => {
  const localData = await page.evaluate(() => localStorage.getItem('mv-game'));
  return JSON.parse(localData)
}

export const elapsedSeconds = async (page): number => {
  const gameState = await getGameData(page)
  return Math.round((gameState.tShift - gameState.tZero) / 1000)
}

export const gameStage = async (page): string => {
  const gameState = await getGameData(page)
  return gameState.stage
}

export let boardSize = 0
export const getFlatBoard = async (page) => {
  const stored = await getGameData(page)
  boardSize = stored.board.length
  return stored.board.flat()
}

const getButtonIndex = (data) => {
  if (data)
    return (data.row * boardSize) + data.col
  else
    throw new Error('No button to process')
}

export const nextBlank = async (page) => {
  const cell = (await getFlatBoard(page)).find(c => c.fill === 0 && !c.stage)
  return getButtonIndex(cell)
}
export const nextPointer = async (page) => {
  const cell = (await getFlatBoard(page)).find(c => c.fill > 0 && c.fill < 9 && !c.stage)
  return getButtonIndex(cell)
}
export const nextMine = async (page) => {
  const cell = (await getFlatBoard(page)).find(c => c.fill > 8 && !c.stage)
  return getButtonIndex(cell)
}

// options

export const applyNewGame = async (page): void => await page.getByRole('navigation').getByTitle('New Game').click()

export const applyReplayGame = async (page): void => await page.getByTitle('Replay').click()
