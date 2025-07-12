import { screen, fireEvent } from '@testing-library/react'
import { renderInContext } from './../../__mocks__/render-helpers'
import Settings from './Settings'
import Configure from '../meta/Configure'

describe('Settings Component', () => {
  test('should display the "Cogwheel" sign', () => {
    renderInContext(<Settings />)
    const button = screen.getByTitle('Settings')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-sliders"]')
    expect(svg).toBeInTheDocument()
  })

  test('should navigate when clicked', () => {
    const navigate = jest.fn()
    renderInContext(<Settings />, { navigate })
    const button = screen.getByTitle('Settings')
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<Configure />)
  })

})
