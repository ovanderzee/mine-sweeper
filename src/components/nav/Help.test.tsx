import { screen, fireEvent } from '@testing-library/react'
import { renderInContext } from './../../__mocks__/render-helpers'
import Help from './Help'
import About from '../meta/About'

describe('Help Component', () => {
  test('should display the "QuestionMark" sign', () => {
    renderInContext(<Help />)
    const button = screen.getByText(/\?/i)
    expect(button).toBeInTheDocument()
  })

  test('should navigate when clicked', () => {
    const navigate = jest.fn()
    renderInContext(<Help />, { navigate })
    const button = screen.getByText(/\?/i)
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<About />)
  })

})
