import { RefObject } from 'react'
import { RenderResult } from 'vitest-browser-react'
import { renderWithContext } from './../../__mocks__/aat-helpers'
import { microConfig } from './../../__mocks__/configs'
import { playingGameState } from './../../__mocks__/game-states'
import { PlayMode } from '../../common/app.d'
import Tips from './Tips'


describe('Tips offers data and view-control', () => {
  const TipsCmp = (<Tips
    game={playingGameState}
    onNew={vi.fn()}
    playgroundRef={{} as RefObject<HTMLDivElement>}
  />)

  const expectedMineCount = /2/i

  describe('in normal play-mode', () => {
    let screen: RenderResult

    beforeEach(async () => {
      screen = await renderWithContext(TipsCmp, { config: microConfig })
    })

    it('should show clock', async () => {
      const clock = screen.getByTitle('Playtime')
      expect(clock).toBeInTheDocument()
    })

    it('should show counter', async () => {
      const counter = screen.getByTitle('Number of mines to find')
      expect(counter).toBeInTheDocument()
      const count = counter.getByText(expectedMineCount)
      expect(count).toBeInTheDocument()
    })

    it('should not indicate the mode', async () => {
      const indicator = screen.getByText(/Normal/i)
      expect(indicator).not.toBeInTheDocument()
    })
  })

  describe('in tough play-mode', () => {
    const TOUGH_CONFIG = { ...microConfig, PLAY_MODE: PlayMode.TOUGH }
    let screen: RenderResult

    beforeEach(async () => {
      screen = await renderWithContext(TipsCmp, { config: TOUGH_CONFIG })
    })

    it('should show clock', async () => {
      const clock = screen.getByTitle('Playtime')
      expect(clock).not.toBeInTheDocument()
    })

    it('should show counter', async () => {
      const counter = screen.getByTitle('Number of mines to find')
      expect(counter).toBeInTheDocument()
      const count = counter.getByText(expectedMineCount)
      expect(count).not.toBeInTheDocument()
    })

    it('should indicate the mode', async () => {
      const indicator = screen.getByText(/Tough/i)
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('in sharp play-mode', () => {
    const SHARP_CONFIG = { ...microConfig, PLAY_MODE: PlayMode.SHARP }
    let screen: RenderResult

    beforeEach(async () => {
      screen = await renderWithContext(TipsCmp, { config: SHARP_CONFIG })
    })

    it('should show clock', async () => {
      const clock = screen.getByTitle('Playtime')
      expect(clock).toBeInTheDocument()
    })

    it('should show counter with flag', async () => {
      const counter = screen.getByTitle('Number of mines to find')
      expect(counter).toBeInTheDocument()
      const count = counter.getByText(expectedMineCount)
      expect(count).toBeInTheDocument()
    })

    it('should indicate the mode', async () => {
      const indicator = screen.getByText(/Sharp/i)
      expect(indicator).toBeInTheDocument()
    })
  })

})
