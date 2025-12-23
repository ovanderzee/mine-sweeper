
import { describe, expect, it, vi } from 'vitest'
import { renderWithProvider } from './__mocks__/aat-helpers'
import App from './App'

describe('The app journey', () => {

  it('should start in Introduction and find all screens', async () => {
    const screen = await renderWithProvider(<App />)

    // land in Introduction
    expect(screen.getByText('mine sweeper')).toBeInTheDocument()
    let navBtn = screen.getByText('skip to game')
    await navBtn.click()

    await vi.waitFor(async () => {
      const location = screen.getByRole('Heading', {name: 'Playground'})
      expect(location).toBeInTheDocument()
      expect(navBtn).not.toBeInTheDocument()
    })

    // now in Game

    navBtn = screen.getByTitle('Hall of Fame')
    await navBtn.click()

    await vi.waitFor(() => {
      const location = screen.getByRole('Heading', {name: 'Hall of Fame'})
      expect(location).toBeInTheDocument()
      expect(navBtn).not.toBeInTheDocument()
    })

    // now in Hall of Fame

    navBtn = screen.getByTitle('Description')
    await navBtn.click()

    await vi.waitFor(() => {
      const location = screen.getByRole('Heading', {name: 'Description'})
      expect(location).toBeInTheDocument()
      expect(navBtn).not.toBeInTheDocument()
    })

    // now in About

    navBtn = screen.getByTitle('Settings')
    await navBtn.click()

    await vi.waitFor(() => {
      const location = screen.getByRole('Heading', {name: 'Settings'})
      expect(location).toBeInTheDocument()
      expect(navBtn).not.toBeInTheDocument()
    })

    // now in Configure

    navBtn = screen.getByTitle('Return to Game')
    await navBtn.click()

    await vi.waitFor(() => {
      const location = screen.getByRole('Heading', {name: 'PLayground'})
      expect(location).toBeInTheDocument()
      expect(navBtn).not.toBeInTheDocument()
    })

    // back in Game

  })
})

