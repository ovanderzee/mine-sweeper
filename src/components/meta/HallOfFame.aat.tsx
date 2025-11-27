import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { render, RenderResult } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { renderInApp } from './../../__mocks__/aat-helpers'

import HallOfFame from './HallOfFame'

describe('The hall-of-fame page sidebar', () => {

  it('should offer navigation to About page', async () => {
    const screen = await renderInApp(<HallOfFame/>)
    const navButton = screen.getByTitle('Description')

    await expect.element(navButton).toBeInTheDocument()
  })

  it('should offer navigation to Configure page', async () => {
    const screen = await renderInApp(<HallOfFame/>)
    const navButton = screen.getByTitle('Settings')

    await expect.element(navButton).toBeInTheDocument()
  })

  it('should offer navigation to Game page', async () => {
    const screen = await renderInApp(<HallOfFame/>)
    const navButton = screen.getByTitle('Return to Game')

    await expect.element(navButton).toBeInTheDocument()
  })

})
