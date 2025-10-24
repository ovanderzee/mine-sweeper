import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { renderInContext } from './../../__mocks__/render-helpers'
import Help from './Help'
import About from '../meta/About'

describe('Help Component', () => {
  it('should display the "QuestionMark" sign', () => {
    renderInContext(<Help />)
    const button = screen.getByTitle('Description')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-question"]')
    expect(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', () => {
    const navigate = vi.fn()
    renderInContext(<Help />, { navigate })
    const button = screen.getByTitle('Description')
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<About />)
  })

})
