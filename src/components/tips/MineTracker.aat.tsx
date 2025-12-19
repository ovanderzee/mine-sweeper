import { describe, expect, it } from 'vitest'
import { renderWithProvider } from './../../__mocks__/aat-helpers'
import { decidedGameState } from './../../__mocks__/game-states'
import storage from './../../common/storage'
import MineTracker from './MineTracker'

describe('MineTracker Component', async () => {
  it('should display bombs minus flags count', async () => {
    storage.game = decidedGameState
    const screen = await renderWithProvider(<MineTracker game={decidedGameState} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})

