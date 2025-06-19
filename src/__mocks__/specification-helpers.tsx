import '@testing-library/jest-dom'
import { act } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './../App'
import DEFAULTS from './../common/defaults'
import storage from './../common/storage'
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

export const clickGameButton = (gameButton: HTMLButtonElement) => {
  fireEvent.pointerDown(gameButton)
  jest.advanceTimersByTime(20)
  fireEvent.pointerUp(gameButton)
  jest.advanceTimersByTime(20)
}

export const getButtonFromState = (cell: CellState): HTMLButtonElement => document.querySelector(`#row${cell.row}col${cell.col}`)

export const clickToLoose = (): void => {
  const mines = storage.game?.board.flat().filter(c => c.fill > 8) || []

  const mineButton = getButtonFromState(mines[0])
  clickGameButton(mineButton)

  act(() => {
    // bridge animation delay
    jest.advanceTimersByTime(320 * mines.length)
  })
}

export const clickToWin = (): void => {
  const nonCells = storage.game?.board.flat().filter(c => c.fill < 9 && !c.stage) || []

  act(() => {
    nonCells.forEach(cell => {
      const todoBtn = getButtonFromState(cell)
      clickGameButton(todoBtn)
    })
  })
}

