import { screen, fireEvent } from '@testing-library/react'
import { renderInContext, renderInProvider } from './../../__mocks__/render-helpers'
import { decidedGameState } from './../../__mocks__/game-states'
import storage from './../../common/storage'
import HiScores from './HiScores'
import HallOfFame from '../meta/HallOfFame'

describe('HiScores Component', () => {
  test('should display the "1-2-3" sign', () => {
    renderInContext(<HiScores />)
    const button = screen.getByTitle(/Hall of Fame/i)
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-podium"]')
    expect(svg).toBeInTheDocument()
  })

  test('should display bombs minus flags count', () => {
    storage.game = decidedGameState
    renderInProvider(<HiScores board={decidedGameState.board} />)
    const button = screen.getByText(/1×/i)
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
