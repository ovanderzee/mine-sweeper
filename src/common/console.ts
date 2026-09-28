import storage from './storage'
const liveScores = (await import('../__mocks__/scores.json')).default
import { ScoreItem, BareScoreItem } from './game.d'

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

export default {
  getAllScores,
  setAllScores,
  getScoresByUser,
  deleteScoresByUser,
  getScoresByProperties,
  deleteScoresByProperties,
  addSampleScores,
  deleteSampleScores,
}
