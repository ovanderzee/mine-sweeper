import { vi, MockInstance } from 'vitest'
import storage from './common/storage'
import * as scoring from './components/game/scoring'
import mv from './console'
import { liveScores } from './__mocks__/scores'

const testScore = {
  "code": "774AwkRlTLDVr7EY0Q", "date": 1514179800000, "user": "Annestiene", "rank": 999,
  "game": {"cells": 49, "mines": 7, "effort": {"least": 12, "most": 33}},
  "play": {"moves": 15, "duration": 41.599},
  "score": {"efficiency": 0.8, "speed": 0.3606, "points": 288}
}

describe('Basic Console methods', () => {
  it('should operate on all scores', () => {
    storage.scores = []
    const allScores = mv.getAllScores()

    expect(allScores.length).toBe(0)

    mv.setAllScores([testScore])
    const allScores1 = mv.getAllScores()

    expect(allScores1.length).toBe(1)

    mv.setAllScores([])
    const allScores2 = mv.getAllScores()

    expect(allScores2.length).toBe(0)
  })
})

describe('Console methods by user', () => {
  beforeEach(() => {
    storage.scores = liveScores
  })

  it('should get the records of the specified user', () => {
    const userScores = mv.getScoresByUser('Asterisk')

    expect(userScores.length).toBe(18)
  })

  it('should remove the records of a user', () => {
    const userScoresLength = mv.getScoresByUser('Exclamator').length
    const originalLength = storage.scores.length

    mv.deleteScoresByUser('Exclamator')

    expect(storage.scores.length).toBe(originalLength - userScoresLength)
  })
})

describe('Console methods mixing mocks and stored scores', () => {
  let rankScoresSpy: MockInstance

  beforeEach(() => {
    rankScoresSpy = vi.spyOn(scoring, 'rankScores')
  })

  it('should add all the sample records', () => {
    storage.scores = []

    mv.updateStorageWithSampleScores()

    expect(storage.scores.length).toBe(liveScores.length)
  })

  it('should not duplicate existing sample records', () => {
    storage.scores = [liveScores[0], liveScores[liveScores.length-1]]

    mv.updateStorageWithSampleScores()

    expect(rankScoresSpy).toHaveBeenCalled()
    expect(storage.scores.length).toBe(liveScores.length)
  })

  it('should remove all the sample records and leave the original scores', () => {
    storage.scores = [ testScore, ...liveScores ]
    const testScoreRank = testScore.rank
    mv.deleteStoredSampleScores()

    // storage.scores[0] is successor of testScore
    expect(storage.scores[0].code).toBe(testScore.code)
    expect(storage.scores[0].date).toBe(testScore.date)

    expect(storage.scores[0].rank).not.toBe(testScoreRank)
    expect(rankScoresSpy).toHaveBeenCalled()
    expect(storage.scores.length).toBe(1)
  })
})
