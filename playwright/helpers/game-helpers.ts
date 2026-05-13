import { test, expect } from '@playwright/test'
import { dataPath } from '../_project'

const localStorage = async (): string => {
  const storedData = await import(dataPath, { with: { type: "json" } })
  return storedData.default.origins[0].localStorage
}

export const storedGame = async () => {
  const local = await localStorage()
  const game = local.filter(i => i.name === 'mv-game')[0].value
  return JSON.parse(game)
}

export let boardSize = 0
export const getFlatGameBoard = async () => {
  const stored = await storedGame()
  boardSize = stored.board.length
  return stored.board.flat()
}

const getButtonIndex = (data) => (data.row * boardSize) + data.col
const freshBlankCell = (await getFlatGameBoard()).find(c => c.fill === 0 && !c.stage)
const freshPointerCell = (await getFlatGameBoard()).find(c => c.fill > 0 && c.fill < 9 && !c.stage)
const freshMineCell = (await getFlatGameBoard()).find(c => c.fill > 8 && !c.stage)
export const nextBlank = () => getButtonIndex(freshBlankCell)
export const nextPointer = () => getButtonIndex(freshPointerCell)
export const nextMine = () => getButtonIndex(freshMineCell)

test.describe('game helpers', () => {
  test('should return different indices for next cell', async () => {
    const blankIndex = nextBlank()
    const pointerIndex = nextPointer()
    const mineIndex = nextMine()
    // console.log('next', blankIndex, pointerIndex, mineIndex)

    await expect(blankIndex).not.toBe(pointerIndex)
    await expect(pointerIndex).not.toBe(mineIndex)
    await expect(mineIndex).not.toBe(blankIndex)
  })
})
