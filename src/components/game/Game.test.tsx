import '@testing-library/jest-dom' //echt?
import Game from './Game'
import DEFAULTS from './../../common/defaults'
import storage from './../../common/storage'
import { renderInContext } from './../../__mocks__/render-helpers'
import { microConfig } from './../../__mocks__/configs'

describe('new game properties', () => {
  beforeEach(() => {
    localStorage.removeItem('mv-game')
  })

  it('should create a game with default properties', () => {
    renderInContext(<Game />, { config: DEFAULTS })
    const cells = storage.game?.board.flat() || []
    expect(cells.length).toBe(36)

    const mines = cells?.filter(c => c.fill > 8) || []
    expect(mines.length).toBe(4)
  })

  it('should create a game with micro config properties', () => {
    renderInContext(<Game />, { config: microConfig })
    const cells = storage.game?.board.flat() || []
    expect(cells.length).toBe(9)

    const mines = cells?.filter(c => c.fill > 8) || []
    expect(mines.length).toBe(2)
  })
})
