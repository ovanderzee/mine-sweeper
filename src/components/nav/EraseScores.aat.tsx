
import { beforeEach, describe, expect, it, vi } from 'vitest'
import EraseScores from './EraseScores'
import storage from '../../common/storage'
import { liveScores } from './../../__mocks__/scores'
import { renderWithProvider } from './../../__mocks__/aat-helpers'

describe('EraseScores Component', () => {
  let emitter: () => void

  beforeEach(() => {
    emitter = vi.fn()
    storage.scores = liveScores
  })

  it('should display the "Circled Division Slash" sign', async () => {
    const screen = await renderWithProvider(<EraseScores onErase={emitter} />)

    expect(screen.getByTitle('Clear List')).toBeInTheDocument()
    expect(screen.getByLabelText('empty set')).toBeInTheDocument()
  })

  it('should not erase scores when cancelling', async () => {
    const screen = await renderWithProvider(<EraseScores onErase={emitter} />)
    const button = screen.getByTitle('Clear List')
    await button.click()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    await dialog.getByRole('button', {name: 'Cancel'}).click()

    expect(button.element().className).not.toContain('active')
    expect(emitter).not.toHaveBeenCalled()
    expect(storage.scores).toStrictEqual(liveScores)
  })

  it('should erase scores when confirming', async () => {
    const screen = await renderWithProvider(<EraseScores onErase={emitter} />)
    const button = screen.getByTitle('Clear List')
    await button.click()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    await dialog.getByRole('button', {name: 'Ok'}).click()

    expect(button.element().className).toContain('active')
    expect(emitter).toHaveBeenCalledTimes(1)
    expect(storage.scores).toStrictEqual([])
  })

})
