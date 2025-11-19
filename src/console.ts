import storage from './common/storage'
import { liveScores } from './__mocks__/scores'
import { ScoreItem } from './common/game.d'
import { rankScores } from './common/scoring'

const mijnenVeger = {
  getAllScores: function (): ScoreItem[] {
    return storage.scores
  },

  setAllScores: function (scores: ScoreItem[]) {
    storage.scores = scores
  },

  getScoresByUser: function (user: string) {
    return this.getAllScores().filter(s => s.user === user)
  },

  deleteScoresByUser: function (user: string) {
    const userScores = this.getAllScores().filter(s => s.user !== user)
    this.setAllScores(userScores)
  },

  updateStorageWithSampleScores: (): void => {
    // prevent duplication: check code and timestamp
    const newScores = liveScores.filter(l => !storage.scores.some(s => s.code === l.code && s.date === l.date))
    const updatedScores = [ ...storage.scores, ...newScores ]
    rankScores(updatedScores)
    storage.scores = updatedScores
  },

  deleteStoredSampleScores: (): void => {
    const newScores = storage.scores.filter(s => !liveScores.some(l => s.code === l.code && s.date === l.date))
    rankScores(newScores)
    storage.scores = newScores
  }
}

export default mijnenVeger
