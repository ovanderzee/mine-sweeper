import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './../App'

export const startPageTesting = () => {
  render(<App />)
  const button = screen.getByRole('button')
  fireEvent.click(button)
}
