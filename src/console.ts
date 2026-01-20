import storage from './common/storage'
import { liveScores } from './__mocks__/scores'
import { ScoreItem, BareScoreItem } from './common/game.d'


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
  const userScores = getAllScores().filter((s: ScoreItem) => s.user !== user)
  setAllScores(userScores)
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

const deleteOneScore = (user: string, rank: number): void => {
  // TODO Flatscores
  const allScores = storage.scores
  const deletables = allScores.filter(score => score.user === user && score.rank === rank)

  if (!deletables.length) {
    alert(`No results found for user "${user}" with ${rank} rank`)
  } else {
    const deletable = deletables[0]

    if (confirm(`Delete ${JSON.stringify(deletable, null, 2)}?`)) {
      const removeIndex = allScores.findIndex(item => item === deletable);
      allScores.splice(removeIndex, 1)
      setAllScores(allScores)
    }
  }
}

export default {
  getAllScores,
  setAllScores,
  getScoresByUser ,
  deleteScoresByUser,
  addSampleScores,
  deleteSampleScores,
  deleteOneScore,
}
