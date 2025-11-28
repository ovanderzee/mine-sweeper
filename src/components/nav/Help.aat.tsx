import { describe, expect, it, vi } from 'vitest'
import { renderInApp, renderInPage } from './../../__mocks__/aat-helpers'

import Help from './Help'
import About from '../meta/About'

describe('GoBack Component', () => {

  it('should display the "QuestionMark" sign', async () => {
    const screen = await renderInApp(<Help/>)
    const button = screen.getByTitle('Description')
    const svg = screen.getByLabelText('question-mark')

    await expect.element(button).toBeInTheDocument()
    await expect.element(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', async () => {
    const navigate = vi.fn()
    const screen = await renderInPage(<Help/>, { navigate })
    const button = screen.getByTitle('Description')
    await button.click()

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<About />)
  })

})
