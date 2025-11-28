import { describe, expect, it, vi } from 'vitest'
import { renderInApp, renderInPage } from './../../__mocks__/aat-helpers'

import Settings from './Settings'
import Configure from '../meta/Configure'

describe('GoBack Component', () => {

  it('should display the "Enter" sign', async () => {
    const screen = await renderInApp(<Settings/>)
    const button = screen.getByTitle('Settings')
    const svg = screen.getByLabelText('sliders')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', async () => {
    const navigate = vi.fn()
    const screen = await renderInPage(<Settings/>, { navigate })
    const button = screen.getByTitle('Settings')
    await button.click()

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<Configure />)
  })

})
