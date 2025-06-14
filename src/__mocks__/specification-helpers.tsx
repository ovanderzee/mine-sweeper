import '@testing-library/jest-dom'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './../App'
import DEFAULTS from './../common/defaults'
import { microConfig } from './configs'

export const referAndNavigateTo = {
  about: () => {
    const icon = screen.getByText(/^\?$/i)
    fireEvent.click(icon)
  },
  config: () => {
    const icon = screen.getByText(/⚙/i)
    fireEvent.click(icon)
  },
  hallOfFame: () => {
    let icon
    try {
      icon = screen.getByText(/\d+×/i)
    }
    catch(error) {
      const button = screen.getByTitle(/Hall of Fame/i)
      icon = within(button).getByText('2') && within(button).getByText('1') && within(button).getByText('3')
    }
    fireEvent.click(icon)
  },
  gameBoard: () => {
    const icon = screen.getByText(/⏎/i)
    fireEvent.click(icon)
  }
}

export const startPageTesting = () => {
  render(<App />)
  // click 'skip intro' button to goto game screen
  const button = screen.getByRole('button')
  fireEvent.click(button)
}

export const startAboutPageTesting = () => {
  startPageTesting()
  referAndNavigateTo.about()
}

export const startConfigurePageTesting = () => {
  startPageTesting()
  referAndNavigateTo.config()
}

export const startHonourPageTesting = () => {
  startPageTesting()
  referAndNavigateTo.hallOfFame()
}

export const setDefaultConfig = () => localStorage.setItem('mv-config', JSON.stringify(DEFAULTS))

export const setMicroConfig = () => localStorage.setItem('mv-config', JSON.stringify(microConfig))
