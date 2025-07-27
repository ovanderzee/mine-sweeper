import LzString from 'lz-string'
import { iterateNeighbours } from './common'
import { GameState, CellState } from '../../common/game-types'

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

export const makeBoardCode = (board: CellState[][]): string => {
  const allCells = board.flat()

  // seven positions to check the integrity
  const mines = allCells.filter(cell => cell.fill > 8)
  const minePad = String(mines.length).padStart(3,'0')
  const size = Math.pow(allCells.length, 0.5)
  const sizePad = String(size).padStart(2,'0')

  // eightteen-digit value for one position fill
  const fill18 = allCells
    .map(cell => Number(cell.fill).toString(18))
    .join('');
  const fillLz = LzString.compressToEncodedURIComponent(fill18)

  return `${sizePad}${sizePad}${minePad}${fillLz}`
}

export const sequenceFillData = (boardCode: string): number[][] => {
  const checkData = boardCode.substring(0, 7)
  const checkSize = Number(checkData.substring(0, 2))
  const checkCount = Number(checkData.substring(4))
  const content = LzString.decompressFromEncodedURIComponent(boardCode.substring(7))

  // check expected size
  const size = Math.pow(content.length, 0.5)
  if (checkSize !== size) return [[]]

  // check expected mine count
  const flatContent = content.split('').map(fill => parseInt(fill, 18))
  const count = flatContent.filter(fill => fill > 8).length
  if (checkCount !== count) return [[]]

  const content2d = []
  for (let r = 0; r < flatContent.length; r = r + size) {
    const sequence = flatContent.slice(r, r + size)
    content2d.push(sequence)
  }

  const length = content2d.length
  if (
    content2d[0].length !== length ||
    content2d[length - 1].length !== length
  ) {
    return [[]]
  }

  return content2d
}
