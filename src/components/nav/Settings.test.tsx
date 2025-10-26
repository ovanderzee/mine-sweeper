import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { renderInContext } from './../../__mocks__/render-helpers'
import Settings from './Settings'
import Configure from '../meta/Configure'

describe('Settings Component', () => {
  it('should display the "Cogwheel" sign', () => {
    renderInContext(<Settings />)
    const button = screen.getByTitle('Settings')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-sliders"]')
    expect(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', () => {
    const navigate = vi.fn()
    renderInContext(<Settings />, { navigate })
    const button = screen.getByTitle('Settings')
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<Configure />)
  })

})
