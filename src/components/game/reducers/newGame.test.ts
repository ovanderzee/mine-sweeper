import { newGameReducer } from './newGame'
import { simpleHardConfig, heavyConfig } from '../../../__mocks__/configs'
import { GameState, CellState } from '../../../common/game-types'

const newGame: GameState = newGameReducer(heavyConfig)
const nextGame: GameState = newGameReducer(heavyConfig)

test('A new game contains MINE_COUNT bombs', () => {
  const mineCount = newGame.board
    .flat()
    .filter(cell => cell.fill > 8)
    .length

  expect(mineCount).toBe(heavyConfig.MINE_COUNT)
})

test('equal produced new games have differing cell values', () => {
  // flaky; to differ, it depends on Math.random()
  let findDifferingValues = 0

  newGame.board.forEach((row, r) =>
    row.forEach((cell: CellState, c) => {
      const mirrorCell = nextGame.board[r][c]
      if (cell.fill !== mirrorCell.fill) findDifferingValues++
    })
  )

  expect(findDifferingValues).toBeGreaterThan(0)
})

test('new game cells reflect number of neighbouring bombs', () => {
  const hardGame: GameState = newGameReducer(simpleHardConfig)
  const board = hardGame.board

  board.forEach((row, r) =>
    row.forEach((cell: CellState, c) => {

      if (cell.fill < 9) {
        let bomb_count = 0
        for (let k = c - 1; k <= c + 1; k++) {
          for (let l = r - 1; l <= r + 1; l++) {
            try {
              if (board[l][k].fill > 8) bomb_count++
            }
            catch(e) {}
          }
        }

        expect(bomb_count).toBe(board[r][c].fill)
      }
    })
  )
})

