import { test, expect } from '@playwright/test'
import { openPlayground, sleep, visitPlayground, visitAboutScreen } from '../helpers/run-helpers'
import { elapsedSeconds, gameStage, nextBlank, nextPointer, nextMine,
         applyReplayGame } from '../helpers/game-helpers'

test.describe('recording time', async () => {

  const interactByTarget = async (nextTargetFn, timeLapse, page, info) => {
    const index = await nextTargetFn(page)
    const cell = await page.getByRole('gridcell').nth(index)
    await cell.click()

    // screenshot takes about 60ms
    // console.info(`${info.outputDir}/interact${timeLapse}.png`)
    // await page.screenshot({ path: `${info.outputDir}/interact${timeLapse}.png`, fullPage: true })

    // when click has fully been processed, time can be measured
    await sleep(25)

    await expect(await elapsedSeconds(page)).toBe(timeLapse)
  }

  test('should pass time in an continuous play', async ({ page }, info) => {
    await page.clock.install()
    await openPlayground(page)
    await applyReplayGame(page)

    await expect(await page.getByRole('main')).toHaveClass(/game-new/)

    // play
    await interactByTarget(nextPointer, 0, page, info)
    await page.clock.fastForward('00:03')
    await interactByTarget(nextPointer, 3, page, info)
    await page.clock.fastForward('00:05')
    await interactByTarget(nextPointer, 8, page, info)
    await page.clock.fastForward('00:07')
    await interactByTarget(nextPointer, 15, page, info)
    await page.clock.fastForward('00:09')
    await interactByTarget(nextMine, 24, page, info)

    await expect(await page.getByRole('main')).toHaveClass(/game-lost/)
  })

  test('should pass time in an interrupted play', async ({ page }, info) => {
    await page.clock.install()
    await openPlayground(page)
    await applyReplayGame(page)

    await expect(await page.getByRole('main')).toHaveClass(/game-new/)

    // play
    await interactByTarget(nextPointer, 0, page, info)
    await page.clock.fastForward('00:03')

    await interactByTarget(nextPointer, 3, page, info)
    await page.clock.fastForward('00:05')

    // pause starts
    await visitAboutScreen(page)
    await expect(await elapsedSeconds(page)).toBe(8)
    await page.clock.fastForward('00:07')

    // pause ends
    await visitPlayground(page)
    await expect(await elapsedSeconds(page)).toBe(8)
    await page.clock.fastForward('00:09')

    await interactByTarget(nextPointer, 17, page, info)
    await page.clock.fastForward('00:11')

    // loose
    await interactByTarget(nextMine, 28, page, info)

    await expect(await page.getByRole('main')).toHaveClass(/game-lost/)
  })

})
