import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { renderInContext } from './../../__mocks__/render-helpers'
import GoBack from './GoBack'

describe('GoBack Component', () => {
  it('should display the "Enter" sign', () => {
    renderInContext(<GoBack />)
    const button = screen.getByTitle('Return to Game')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-return"]')
    expect(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', () => {
    const navigate = vi.fn()
    renderInContext(<GoBack />, { navigate })
    const button = screen.getByTitle('Return to Game')
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
  })

})
