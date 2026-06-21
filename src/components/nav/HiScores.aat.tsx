import { renderWithProvider } from './../../__mocks__/aat-helpers'

import HiScores from './HiScores'

describe('GoBack Component', () => {

  it('should display the "Enter" sign', async () => {
    const screen = await renderWithProvider(<HiScores/>)
    const button = screen.getByTitle('Hall of Fame')
    const svg = screen.getByLabelText('podium')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

})
