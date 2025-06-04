import { screen, fireEvent } from '@testing-library/react'
import { renderInContext } from './../../__mocks__/render-helpers'
import GoBack from './GoBack'

describe('GoBack Component', () => {
  test('should display the "Enter" sign', () => {
    renderInContext(<GoBack />)
    const button = screen.getByText(/⏎/i)
    expect(button).toBeInTheDocument()
  })

  test('should navigate when clicked', () => {
    const navigate = jest.fn()
    renderInContext(<GoBack />, { navigate })
    const button = screen.getByText(/⏎/i)
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
  })

})
