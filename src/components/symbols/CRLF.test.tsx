import { render, screen } from '@testing-library/react'
import CRLF from './CRLF'

describe('CRLF symbol Component', () => {

  it('should display the "Enter" sign', () => {
    render(<CRLF />)
    const buttonElement = screen.getByText(/⏎/i)
    expect(buttonElement).toBeInTheDocument()
  })

})
