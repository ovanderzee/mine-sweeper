import { screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import { vi } from 'vitest'
import { renderInContext } from './../../__mocks__/render-helpers'
import Settings from './Settings'
import About from '../meta/About'
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
    renderInContext(<About />, { navigate })
    const button = screen.getByTitle('Settings')
    fireEvent.click(button)

    waitForElementToBeRemoved(button).then(() => {
      const configurePageHeader = screen.getByText('The Challenge...')
      expect(configurePageHeader).toBeInTheDocument()
    })

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<Configure />)
  })

})
