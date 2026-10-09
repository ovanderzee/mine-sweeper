import storage from './storage'
import { RANGES } from './constants'
const liveScores = (await import('../__mocks__/scores.json')).default
import { ScoreItem, BareScoreItem } from './game.d'
import { PlayMode } from './app.d'

const getAllScores = function (): ScoreItem[] {
  return storage.scores
}

const setAllScores = function (scores: BareScoreItem[]) {
  storage.scores = scores as ScoreItem[]
}

const getScoresByUser = function (user: string) {
  return getAllScores().filter((s: ScoreItem) => s.user === user)
}

const deleteScoresByUser = function (user: string) {
  const useScores = getAllScores().filter((s: ScoreItem) => s.user !== user)
  setAllScores(useScores)
}

const scoresByProperties = function (andSelection: Record<string, any>, findInclusive: boolean): [ScoreItem[], ScoreItem[]] {
  const keys = Object.keys(andSelection)
  if (!keys.length) return [[], []]
  const values = Object.values(andSelection)
  const allScores = getAllScores()
  const useScores = allScores.filter((s: ScoreItem) => {
    const flatScore = {...s, ...s.game, ...s.play, ...s.score} as Record<string, any>
    let toSelect = true
    keys.forEach((key, i) => toSelect = toSelect && flatScore[key] === values[i])
    if (toSelect && !findInclusive) console.log('About to delete:', s)
    return toSelect === findInclusive
  })
  return [useScores, allScores]
}

const getScoresByProperties = function (andSelection: Record<string, any>): ScoreItem[] {
  const [useScores, allScores] = scoresByProperties(andSelection, true)
  console.log(`Selected ${useScores.length} of ${allScores.length} scores`)
  return useScores
}

const deleteScoresByProperties = function (andSelection: Record<string, any>): void {
  const [useScores, allScores] = scoresByProperties(andSelection, false)
  const deleteCount = allScores.length - useScores.length
  if (deleteCount) {
    console.log(`Press [Enter] to delete ${deleteCount} scores or [Escape] to cancel.`)
    if (confirm(`Delete ${deleteCount} scores?`)) {
      setAllScores(useScores)
      console.log(`Deleted ${deleteCount} scores`)
    }
  } else {
    console.log(`Nothing to delete`)
  }
}

const addSampleScores = (): void => {
  // prevent duplication: check code and timestamp
  const newScores = liveScores.filter(l => !storage.scores.some(s => s.code === l.code && s.date === l.date))
  const updatedScores = [ ...storage.scores, ...newScores ]
  setAllScores(updatedScores)
}

const deleteSampleScores = (): void => {
  const newScores = storage.scores.filter(s => !liveScores.some(l => s.code === l.code && s.date === l.date))
  setAllScores(newScores)
}

const completed = (): [ScoreItem[][][], number] => {
  const all = getAllScores()
  const subset = (cells: number, level: number): ScoreItem[] => all.filter(s => cells === s.game.cells && level === s.game.level)

  const cube = [] as ScoreItem[][][]
  for (let size = RANGES.SIZE.min; size <= RANGES.SIZE.max; size++) {
    const cells = Math.pow(size, 2)
    cube[cells] = []
    for (let level = RANGES.LEVEL.min; level <= RANGES.LEVEL.max; level++) cube[cells][level] = subset(cells, level)
  }
  return [cube, all.length]
}

const challengesCompleted = (): void => {
  const [cube, count] = completed()
  const log = (amount: number, len = 3): string => String(amount || ' ').padStart(len, ' ')
  console.log(`Scores by cells ↓, levels → and modes 'normal', 'bare', 'sharp'`)

  const rows: Record<string, Record<string, string>> = {}
  for (let size = RANGES.SIZE.min; size <= RANGES.SIZE.max; size++) {
    let cells = Math.pow(size, 2)
    let value: Record<string, string> = {}
    for (let level = RANGES.LEVEL.min; level <= RANGES.LEVEL.max; level++) {
      value[`level ${level}`] = ` `
      if (cube[cells][level].length) {
        const normal = cube[cells][level].filter(s => !s.game.mode || s.game.mode === PlayMode.NORMAL).length
        const bare = cube[cells][level].filter(s => s.game.mode === PlayMode.BARE).length
        const sharp = cube[cells][level].filter(s => s.game.mode === PlayMode.SHARP).length
        value[`level ${level}`] = `${log(normal)}, ${log(bare)}, ${log(sharp)}`
      }
    }
    rows[log(cells, 4)] = value
  }
  console.table(rows)
  console.log(`Total ${count} games played`)
}

export default {
  getAllScores,
  setAllScores,
  getScoresByUser,
  deleteScoresByUser,
  getScoresByProperties,
  deleteScoresByProperties,
  addSampleScores,
  deleteSampleScores,
  challengesCompleted,
}

export { scoresByProperties, completed }
