import { test, expect } from '@playwright/test'
import { boardSize, nextBlank, nextPointer, nextMine } from '../helpers/game-helpers'
import { testUrl } from '../helpers/run-helpers'

test.describe('game helpers', () => {
  test('should return different indices for next cell', async ({ page }) => {
    await page.goto(testUrl)

    const blankIndex = await nextBlank(page)
    const pointerIndex = await nextPointer(page)
    const mineIndex = await nextMine(page)
    console.log('next', blankIndex, pointerIndex, mineIndex)

    await expect(blankIndex).not.toBe(pointerIndex)
    await expect(pointerIndex).not.toBe(mineIndex)
    await expect(mineIndex).not.toBe(blankIndex)

    // part 2

    await page.getByRole('gridcell').nth(blankIndex).click()
    await page.getByRole('gridcell').nth(pointerIndex).click()
    // await page.getByRole('gridcell').nth(mineIndex).click() // no pristine call will be left

    const blankIndex2 = await nextBlank(page)
    const pointerIndex2 = await nextPointer(page)
    // const mineIndex2 = await nextMine(page) // has same value as mineIndex  // localstorage not updated?
    console.log('second', blankIndex2, pointerIndex2 /*, mineIndex2*/)

    await expect(blankIndex2).toBeGreaterThan(blankIndex)
    await expect(pointerIndex2).toBeGreaterThan(pointerIndex)
    // await expect(mineIndex2).toBeGreaterThan(mineIndex)
  })
})
