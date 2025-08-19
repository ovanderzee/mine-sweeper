import LzString from 'lz-string'
import { iterateNeighbours } from './common'
import { AppCheckConfig } from '../../common/app-types'
import { GameState, CellState, CellStateStage,
  GameScore, PlayScore, ScoreCalc } from '../../common/game-types'
import { calculateMineCount } from '../../common/defaults'

export const precise = (figure: number, precision: number) => Number(figure.toPrecision(precision))

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

export const makeBoardCode = (board: CellState[][], gameLevel: number): string => {
  const allCells = board.flat()

  // three positions to check the integrity: size(18), size(18), level(10)
  const size18 = Math.pow(allCells.length, 0.5).toString(18)

  // booleanesque value for fill in one position
  const fill02 = allCells
    .map(cell => Number(cell.fill) < 9 ? 0 : 1)
    .join('');
  const fillLz = LzString.compressToEncodedURIComponent(fill02)

  return `${size18}${size18}${gameLevel}${fillLz}`
}

export const sequenceFillData = (boardCode: string): [CellState[][], AppCheckConfig] => {
  const BREAK_BEFORE = 3

  const checkData = boardCode.substring(0, BREAK_BEFORE)
  const checkSize = parseInt(checkData.charAt(0), 18)
  const checkLevel = Number(checkData.charAt(2))
  const checkConfig: AppCheckConfig = { BOARD_SIZE: checkSize, GAME_LEVEL: checkLevel }

  const boardData = boardCode.substring(BREAK_BEFORE)
  const content = LzString.decompressFromEncodedURIComponent(boardData)
  const flatContent = content?.split('').map(fill => Number(fill))

  // check integrity
  const invalidCode = !content || content.length !== content.match(/[0-1]/g)?.length

  let wrongSize, wrongMineCount
  if (!invalidCode) {
    // check expected size
    const size = Math.pow(content.length, 0.5)
    wrongSize = checkSize !== size

    // check expected mine count
    wrongMineCount = calculateMineCount(checkConfig) !== flatContent.filter(fill => fill === 1).length
  }

  if (invalidCode || wrongSize || wrongMineCount) {
    console.error(`Invalid ${invalidCode ? 'code' : wrongSize ? 'size' : wrongMineCount ? 'mine count' : 'error'}`)
    return [[[]], checkConfig]
  }

  // do not check but rebuild board
  const newBoard: CellState[][] = []
  for (let start = 0; start < flatContent.length; start = start + checkSize) {
    const sequence = flatContent.slice(start, start + checkSize)
    const newCells = sequence.map((value, col): CellState => {
      return {
        fill: value === 1 ? 9 : 0,
        row: start / checkSize, col
      }
    })
    newBoard.push(newCells)
  }

  const countNeighbourMines = (x: number, y: number) => {
    newBoard[x][y].fill += 1
  }

  newBoard.forEach(row =>
    row.forEach(cell => cell.fill > 8 ? iterateNeighbours(cell, checkSize, countNeighbourMines) : null)
  )

  return [newBoard, checkConfig]
}

export const calculateScore = (game: GameScore, play: PlayScore): ScoreCalc => {
  const efficiency = precise(game.effort.least / play.moves, 4)
  const speed = precise(play.moves / play.duration, 4)
  const points = Math.round(efficiency * speed * 1000)
  return {efficiency, speed, points}
}

export const countMoves = (state: GameState): number =>
  state.board
    .flat()
    .filter(cell => cell.stage === CellStateStage.TESTED)
    .length
