import { render, screen, within } from '@testing-library/react'
import { ChampionsPodium, CogWheel, Enter, Erase, Play, QuestionMark, Redo, Reset } from '../UI/Symbols'

describe('Symbols contain designated artwork', () => {

  it('ChampionsPodium should display the "213" sign', () => {
    render(<ChampionsPodium />)
    const span = document.querySelector('.championship-podium') as HTMLElement
    const icon = within(span).getByText('2') && within(span).getByText('1') && within(span).getByText('3')
    expect(icon).toBeInTheDocument()
  })

  it('CogWheel should display the "Cogwheel" sign', () => {
    render(<CogWheel />)
    const icon = screen.getByText(/⚙/i)
    expect(icon).toBeInTheDocument()
  })

  it('Enter should display the "Enter" sign', () => {
    render(<Enter />)
    const icon = screen.getByText(/⏎/i)
    expect(icon).toBeInTheDocument()
  })

  it('Erase should display the "Erase" sign', () => {
    render(<Erase />)
    const icon = screen.getByText(/⊘/i)
    expect(icon).toBeInTheDocument()
  })

  it('Play should display the "Play" sign', () => {
    render(<Play />)
    const icon = screen.getByText(/▶/i)
    expect(icon).toBeInTheDocument()
  })

  it('QuestionMark should display the "Question Mark" sign', () => {
    render(<QuestionMark />)
    const icon = screen.getByText(/\?/i)
    expect(icon).toBeInTheDocument()
  })

  it('Redo should display the "Redo" sign', () => {
    render(<Redo />)
    const icon = screen.getByText(/↻/i)
    expect(icon).toBeInTheDocument()
  })

  it('Reset should display the "Undo" sign', () => {
    render(<Reset />)
    const icon = screen.getByText(/↺/i)
    expect(icon).toBeInTheDocument()
  })

})
