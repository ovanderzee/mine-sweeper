import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { renderWithApp } from './../../__mocks__/aat-helpers'

describe('The about page sidebar', () => {
  let
    screen: RenderResult

  beforeEach(async () => screen = await renderWithApp('About'))

  it('should offer navigation to HallOfFame page', async () => {
    const navBtn = screen.getByRole('navigation').getByTitle('Hall of Fame')
    expect(navBtn).toBeInTheDocument()
    await navBtn.click()

    await vi.waitFor(async () => {
      expect(navBtn).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Hall of Fame' })).toBeInTheDocument()
    })
  })

  it('should offer navigation to Configure page', async () => {
    const navBtn = screen.getByRole('navigation').getByTitle('Settings')
    expect(navBtn).toBeInTheDocument()
    await navBtn.click()

    await vi.waitFor(async () => {
      expect(navBtn).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
    })
  })

  it('should offer navigation to Game page', async () => {
    const navBtn = screen.getByRole('navigation').getByTitle('Return to Game')
    expect(navBtn).toBeInTheDocument()
    await navBtn.click()

    await vi.waitFor(async () => {
      expect(navBtn).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Playground' })).toBeInTheDocument()
    })
  })
})
