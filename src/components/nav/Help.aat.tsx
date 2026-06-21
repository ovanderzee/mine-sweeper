import { renderWithProvider } from './../../__mocks__/aat-helpers'

import Help from './Help'

describe('GoBack Component', () => {

  it('should display the "QuestionMark" sign', async () => {
    const screen = await renderWithProvider(<Help/>)
    const button = screen.getByTitle('Description')
    const svg = screen.getByLabelText('question-mark')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

})
