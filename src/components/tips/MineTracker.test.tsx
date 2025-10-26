import { getByText } from '@testing-library/react'
import { decidedGameState } from './../../__mocks__/game-states'
import { renderInContext } from './../../__mocks__/render-helpers'
import storage from './../../common/storage'
import MineTracker from './MineTracker'

describe('MineTracker Component', () => {
  it('should display bombs minus flags count', () => {
    storage.game = decidedGameState
    renderInContext(<MineTracker game={decidedGameState} />)
    const text = document.getElementById('diff') as HTMLElement
    const button = getByText(text, /1/i)
    expect(button).toBeInTheDocument()
  })
})

