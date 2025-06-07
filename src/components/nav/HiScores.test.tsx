import { screen, fireEvent } from '@testing-library/react'
import { renderInContext } from './../../__mocks__/render-helpers'
import HiScores from './HiScores'
import HallOfFame from '../meta/HallOfFame'

describe('HiScores Component', () => {
  test('should display the "Enter" sign', () => {
    renderInContext(<HiScores />)
    const button = screen.getByTitle(/Hall of Fame/i)
    expect(button).toBeInTheDocument()
  })

  test('should navigate when clicked', () => {
    const navigate = jest.fn()
    renderInContext(<HiScores />, { navigate })
    const button = screen.getByTitle(/Hall of Fame/i)
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<HallOfFame />)
  })

})
