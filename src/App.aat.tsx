
import { renderWithProvider } from './__mocks__/aat-helpers'
import App from './App'

describe('The app journey', () => {

  it('should start in Introduction and find all screens', async () => {
    const screen = await renderWithProvider(<App />)

    // land in Introduction
    await expect.element(screen.getByText(/Mine.+Sweep/)).toBeInTheDocument()
    let navBtn = screen.getByText('skip to game')
    await navBtn.click()

    const loc1 = screen.getByRole('heading', {name: 'Playground'})
    await expect.element(loc1).toBeInTheDocument()
    await expect.element(navBtn).not.toBeInTheDocument()

    // now in Game

    navBtn = screen.getByTitle('Hall of Fame')
    await navBtn.click()

    const locHF = screen.getByRole('heading', {name: 'Hall of Fame'})
    await expect.element(locHF).toBeInTheDocument()
    await expect.element(navBtn).not.toBeInTheDocument()

    // now in Hall of Fame

    navBtn = screen.getByTitle('Description')
    await navBtn.click()

    const locAD = screen.getByRole('heading', {name: 'Description'})
    await expect.element(locAD).toBeInTheDocument()
    await expect.element(navBtn).not.toBeInTheDocument()

    // now in About

    navBtn = screen.getByTitle('Settings')
    await navBtn.click()

    const locSet = screen.getByRole('heading', {name: 'Settings'})
    await expect.element(locSet).toBeInTheDocument()
    await expect.element(navBtn).not.toBeInTheDocument()

    // now in Configure

    navBtn = screen.getByTitle('To Game')
    await navBtn.click()

    const locPG = screen.getByRole('heading', {name: 'Playground'})
    await expect.element(locPG).toBeInTheDocument()
    await expect.element(navBtn).not.toBeInTheDocument()

    // back in Game
  })
})

