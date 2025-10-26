import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { renderInContext } from './../../__mocks__/render-helpers'
import HiScores from './HiScores'
import HallOfFame from '../meta/HallOfFame'

describe('HiScores Component', () => {
  it('should display the "1-2-3" sign', () => {
    renderInContext(<HiScores />)
    const button = screen.getByTitle(/Hall of Fame/i)
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-podium"]')
    expect(svg).toBeInTheDocument()
  })

  it('should navigate when clicked', () => {
    const navigate = vi.fn()
    renderInContext(<HiScores />, { navigate })
    const button = screen.getByTitle(/Hall of Fame/i)
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(<HallOfFame />)
  })
})
