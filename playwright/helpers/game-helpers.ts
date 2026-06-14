import { test, expect } from '@playwright/test'
import { testUrl } from '../helpers/run-helpers'

export const getGameData = async (page) => {
//   console.log('page' , page)
  const localData = await page.evaluate(() => localStorage.getItem('mv-game'));
  return JSON.parse(localData)
}

export let boardSize = 0
export const getFlatBoard = async (page) => {
  const stored = await getGameData(page)
  boardSize = stored.board.length
  return stored.board.flat()
}

const getButtonIndex = (data) => (data.row * boardSize) + data.col

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

