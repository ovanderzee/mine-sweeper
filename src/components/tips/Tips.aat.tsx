import { RefObject } from 'react'
import { renderWithContext } from './../../__mocks__/aat-helpers'
import { playingGameState } from './../../__mocks__/game-states'
import { DEFAULTS, NORMAL } from '../../common/defaults'
import { PlayMode } from '../../common/app.d'
import Tips from './Tips'


describe('Tips offers data and view-control', () => {
  const TipsCmp = (<Tips
    game={playingGameState}
    onNew={vi.fn()}
    playgroundRef={{} as RefObject<HTMLDivElement>}
  />)

  it('should show clock and counter when tough play-mode is NOT in effect', async () => {
    const screen = await renderWithContext(TipsCmp, { config: DEFAULTS, session: NORMAL })

    const clock = screen.getByTitle('Playtime')
    expect(clock).toBeInTheDocument()

    const counter = screen.getByTitle('Number of mines to find')
    expect(counter).toBeInTheDocument()
  })

  it('should hide clock and counter when tough play-mode is in effect', async () => {
    const TOUGH_CONFIG = { ...DEFAULTS, PLAY_MODE: PlayMode.TOUGH }
    const screen = await renderWithContext(TipsCmp, { config: TOUGH_CONFIG, session: NORMAL })

    const clock = screen.getByTitle('Playtime')
    expect(clock).not.toBeInTheDocument()

    const counter = screen.getByTitle('Number of mines to find')
    expect(counter).not.toBeInTheDocument()
  })
})
