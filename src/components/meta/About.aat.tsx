import { beforeEach, describe, expect, it } from 'vitest'
import { RenderResult } from 'vitest-browser-react'
import { renderInApp } from './../../__mocks__/aat-helpers'
import About from './About'

describe('The about page sidebar', () => {
  let screen: RenderResult

  beforeEach(async () => screen = await renderInApp(<About/>))

  it('should offer navigation to HallOfFame page', () => {
    expect(screen.getByTitle('Hall of Fame')).toBeInTheDocument()
  })

  it('should offer navigation to Configure page', () => {
    expect(screen.getByTitle('Settings')).toBeInTheDocument()
  })

  it('should offer navigation to Game page', () => {
    expect(screen.getByTitle('Return to Game')).toBeInTheDocument()
  })

})

