import { renderWithProvider } from './../../__mocks__/aat-helpers'

import GoBack from './GoBack'

describe('GoBack Component', () => {

  it('should display the "Enter" sign', async () => {
    const screen = await renderWithProvider(<GoBack/>)
    const button = screen.getByTitle('To Game')
    const svg = screen.getByLabelText('return arrow')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

})
