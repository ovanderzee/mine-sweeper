import { describe, expect, it, vi } from 'vitest'
import { renderWithProvider, renderWithContext } from './../../__mocks__/aat-helpers'

import GoBack from './GoBack'
import Game from '../game/Game'

describe('GoBack Component', () => {

  it('should display the "Enter" sign', async () => {
    const screen = await renderWithProvider(<GoBack/>)
    const button = screen.getByTitle('Return to Game')
    const svg = screen.getByLabelText('return arrow')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', async () => {
    const navigate = vi.fn()
    const screen = await renderWithContext(<GoBack/>, { navigate })
    const button = screen.getByTitle('Return to Game')
    await button.click()

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<Game />)
  })

})
