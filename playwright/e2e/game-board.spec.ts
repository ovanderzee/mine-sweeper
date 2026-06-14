import { test, expect } from '@playwright/test'
import { boardSize, nextBlank, nextPointer, nextMine } from '../helpers/game-helpers'
import { openPlayground } from '../helpers/run-helpers'

test.describe('result clicking cell', async () => {
  let mainElement

  test.beforeEach(async ({ page }) => {
    await openPlayground(page)
    mainElement = await page.getByRole('main')
  })

  test('should touch blank and open neighbouring cells', async ({ page }, info) => {
    const blankIndex = await nextBlank(page)
    const cellButton = await page.getByRole('gridcell').nth(blankIndex)
    await expect(mainElement).toHaveClass(/game-new/)
    const initialTouchedButtonCount = await page.locator('button.touched').count()

    await cellButton.click()
    await page.screenshot({ path: `${info.outputDir}/click-blank.png`, fullPage: true });

    await expect(cellButton).toHaveClass(/touched/)
    await expect(mainElement).toHaveClass(/game-playing/)

    const finalTouchedButtonCount = await page.locator('button.touched').count()
    await expect(finalTouchedButtonCount).toBeGreaterThan(initialTouchedButtonCount)
  })

  test('should touch pointer and open no other cells', async ({ page }, info) => {
    const pointerIndex = await nextPointer(page)
    const cellButton = await page.getByRole('gridcell').nth(pointerIndex)
    await expect(mainElement).toHaveClass(/game-new/)
    const initialTouchedButtonCount = await page.locator('button.touched').count()

    await cellButton.click()
    await page.screenshot({ path: `${info.outputDir}/click-pointer.png`, fullPage: true });

    await expect(cellButton).toHaveClass(/touched/)
    await expect(mainElement).toHaveClass(/game-playing/)

    const finalTouchedButtonCount = await page.locator('button.touched').count()
    await expect(finalTouchedButtonCount - initialTouchedButtonCount).toBe(1)
  })

  test('should touch mine and loose the game', async ({ page }, info) => {
    const mineIndex = await nextMine(page)
    const cellButton = await page.getByRole('gridcell').nth(mineIndex)
    await expect(mainElement).toHaveClass(/game-new/)

    await cellButton.click()
    await page.screenshot({ path: `${info.outputDir}/click-mine.png`, fullPage: true });

    await expect(cellButton).toHaveClass(/touched/)
    await expect(mainElement).toHaveClass(/game-lost/)

    const finalTouchedButtonCount = await page.locator('button.touched').count()
    await expect(finalTouchedButtonCount).toBe(Math.pow(boardSize, 2))
  })
})


/*

test('should promote cell once', async ({ page }) => {
  await openPlayground(page);
  const leftTopButton = page.getByRole('gridcell').first()
  // open cell
  leftTopButton.click()
  await expect(leftTopButton).toHaveClass(/touched/);
  // open cell 2nd time, fails at click
  // leftTopButton.click({ force: true })
  //               ^ Error: locator.click: Test ended.
  // await expect(leftTopButton).toHaveClass(/touched/);
});

*/
