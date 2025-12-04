import storage from './common/storage'
import { liveScores } from './__mocks__/scores'
import { ScoreItem } from './common/game.d'
import { rankScores } from './common/scoring'

type ScoreFilter = Partial<ScoreItem>

const getAllScores = function (): ScoreItem[] {
  return storage.scores
}

const setAllScores = function (scores: ScoreItem[]) {
  rankScores(scores)
  storage.scores = scores
}

const getScoresByUser = function (user: string) {
  return getAllScores().filter((s: ScoreItem) => s.user === user)
}

const deleteScoresByUser = function (user: string) {
  const userScores = getAllScores().filter((s: ScoreItem) => s.user !== user)
  setAllScores(userScores)
}

const updateStorageWithSampleScores = (): void => {
  // prevent duplication: check code and timestamp
  const newScores = liveScores.filter(l => !storage.scores.some(s => s.code === l.code && s.date === l.date))
  const updatedScores = [ ...storage.scores, ...newScores ]
  setAllScores(updatedScores)
}

const deleteStoredSampleScores = (): void => {
  const newScores = storage.scores.filter(s => !liveScores.some(l => s.code === l.code && s.date === l.date))
  setAllScores(newScores)
}

const deleteOneByProperties = (query: ScoreFilter): void => {
  // userwise only user and rank can be used, ex.: deleteOneByProperties({ user: 'Miomy', rank: 68 })
  // TODO Flatscores
  const queryKeys = Object.keys(query)
  const allScores = storage.scores

  const deletables = allScores.filter(score => {
    let toDelete = true
    queryKeys.forEach(queryKey => {
      toDelete = toDelete && score[queryKey] === query[queryKey]
    })

    return toDelete
  })
  const deletable = deletables[0]

  if (confirm(`Delete ${JSON.stringify(deletable)} of ${deletables.length} items?`)) {
    const removeIndex = allScores.findIndex(item => item === deletable);
    allScores.splice( removeIndex, 1)
    setAllScores(allScores)
  }
}

export default {
  getAllScores,
  setAllScores,
  getScoresByUser ,
  deleteScoresByUser,
  updateStorageWithSampleScores,
  deleteStoredSampleScores,
  deleteOneByProperties
}
