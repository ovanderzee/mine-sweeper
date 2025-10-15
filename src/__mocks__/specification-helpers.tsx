import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import App from './../App'
import DEFAULTS from './../common/defaults'
import storage from './../common/storage'
import { CellState } from './../common/game-types'
import { FADE_OUT_TIME } from './../common/constants'
import { microConfig } from './configs'
import { newPortalLayer } from './render-helpers'

export const referAndNavigateTo = {
  about: () => {
    const button = screen.getByTitle('Explanation')
    fireEvent.click(button)
  },
  config: () => {
    const button = screen.getByTitle('Settings')
    fireEvent.click(button)
  },
  hallOfFame: () => {
    const button = screen.getByTitle('Hall of Fame')
    fireEvent.click(button)
  },
  gameBoard: () => {
    const button = screen.getByTitle('Return to Game')
    fireEvent.click(button)
  }
}

export const startPageTesting = () => {
  newPortalLayer('overlay')
  render(<App />)
  // click 'skip intro' button to goto game screen
  const introButton = screen.getByLabelText('skip to play')
  act(() => {
    fireEvent.click(introButton)
    vi.advanceTimersByTimeAsync(FADE_OUT_TIME * 1.1)
  })
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
  vi.advanceTimersByTimeAsync(20)
  fireEvent.pointerUp(gameButton)
  vi.advanceTimersByTimeAsync(20)
}

export const getButtonFromState = (cell: CellState): HTMLButtonElement => {
  return document.querySelector(`#row${cell.row}col${cell.col}`) as HTMLButtonElement
}

export const clickToLoose = (): void => {
  const mines = storage.game?.board.flat().filter(c => c.fill > 8) || []

  const mineButton = getButtonFromState(mines[0])
  clickGameButton(mineButton)

//   act(() => {
    // bridge animation delay
    vi.advanceTimersByTimeAsync(320 * mines.length)
//   })
}

export const clickToWin = (): void => {
  const nonCells = storage.game?.board.flat().filter(c => c.fill < 9 && !c.stage) || []

//   act(() => {
    nonCells.forEach(cell => {
      const todoBtn = getButtonFromState(cell)
      clickGameButton(todoBtn)
    })
//   })
}

export const htmlAttrs = (elem: HTMLElement | null): string => {
  if (!elem) return '< NO ELEMENT >'

  let output = elem.tagName.toLowerCase()
  output += elem.id && '#' + elem.id
  output += elem.className && '.' + elem.className.replace(/\s+/g, '.')
  output += elem.title && '$' + elem.title
  return `<${output}>`
}
