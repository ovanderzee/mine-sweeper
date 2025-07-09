import { screen, fireEvent } from '@testing-library/react'
import { renderInContext } from './../../__mocks__/render-helpers'
import GoBack from './GoBack'

describe('GoBack Component', () => {
  test('should display the "Enter" sign', () => {
    renderInContext(<GoBack />)
    const button = screen.getByTitle('Return to Game')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-return"]')
    expect(svg).toBeInTheDocument()
  })

  test('should navigate when clicked', () => {
    const navigate = jest.fn()
    renderInContext(<GoBack />, { navigate })
    const button = screen.getByTitle('Return to Game')
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
  })

})
