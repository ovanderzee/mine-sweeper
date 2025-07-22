import { iterateNeighbours } from './common'
import { GameState } from '../../common/game-types'

export const unmarkCells = (game: GameState) => {
  game.board.forEach(r => {r.forEach(c => delete c.mark)})
}

export const clickBlankAreas = (game: GameState) => {
  let allCells
  let allThese
  let clicks = 0

  const recurseBlankNeighbours = (x: number, y: number) => {
    const neighbourCell = game.board[x][y]
    if (neighbourCell.mark) return
    neighbourCell.mark = 2 // 'visited'
    if (neighbourCell.fill === 0)
      iterateNeighbours(neighbourCell, game.board.length, recurseBlankNeighbours)
  }

  do {
    allCells = game.board.flat()
    allThese = allCells.filter(cell => !cell.fill && !cell.mark)

    if (!allThese.length) break

    const blank = allThese[0]
    blank.mark = 1 // 'clicked'

    iterateNeighbours(blank, game.board.length, recurseBlankNeighbours)
    clicks++

  } while (true)

  return clicks
}

export const clickRemainingPointers = (game: GameState) => {
  const allCells = game.board.flat()
  const allThese = allCells.filter(cell => cell.fill > 0 && cell.fill < 9 && !cell.mark)
  allThese.forEach(cell => cell.mark = 1)
  return allThese.length
}

export const leastClicksToWin = (game: GameState) => {
  const areas = clickBlankAreas(game)
  const pointers = clickRemainingPointers(game)
  unmarkCells(game)
  return areas + pointers
}

export const mostClicksToWin = (game: GameState) => {
  const pointers = clickRemainingPointers(game)
  const areas = clickBlankAreas(game)
  unmarkCells(game)
  return areas + pointers
}
