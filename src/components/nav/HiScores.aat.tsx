import { describe, expect, it, vi } from 'vitest'
import { renderWithProvider, renderWithContext } from './../../__mocks__/aat-helpers'

import HiScores from './HiScores'
import HallOfFame from '../meta/HallOfFame'

describe('GoBack Component', () => {

  it('should display the "Enter" sign', async () => {
    const screen = await renderWithProvider(<HiScores/>)
    const button = screen.getByTitle('Hall of Fame')
    const svg = screen.getByLabelText('podium')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', async () => {
    const navigate = vi.fn()
    const screen = await renderWithContext(<HiScores/>, { navigate })
    const button = screen.getByTitle('Hall of Fame')
    await button.click()

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<HallOfFame />)
  })

})
