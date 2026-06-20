import { renderWithProvider } from './../../__mocks__/aat-helpers'

import Settings from './Settings'

describe('GoBack Component', () => {

  it('should display the "Enter" sign', async () => {
    const screen = await renderWithProvider(<Settings/>)
    const button = screen.getByTitle('Settings')
    const svg = screen.getByLabelText('sliders')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

})
