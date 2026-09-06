import React, { useContext } from 'react'
import PageContext from '../../store/page-context'
import { ScoreItem, ScoreParam } from '../../common/game.d'
import { parameters } from './scoreParams'

interface SortScoresProps {
  sortLabel: ScoreParam
  setSortLabel: (label: ScoreParam) => void
  rootScores: ScoreItem[]
  setScores: (scores: ScoreItem[]) => void
}

const SortScores = (props: SortScoresProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const {sortLabel, setSortLabel, rootScores, setScores} = props

  // @ts-expect-error // error TS2739: Type ... is missing the following properties from type 'Record<ScoreParam, () => ScoreItem[]>': play, game, effort, code, score
  const methodsByKind: Record<ScoreParam, () => ScoreItem[]> = {
    'rank': () => {
      const byRank = (a:ScoreItem, b:ScoreItem) => a.rank - b.rank
      return rootScores.sort(byRank)
    },
    'user': () => {
      const byRank = (a: ScoreItem, b: ScoreItem) => a.rank - b.rank
      rootScores.sort(byRank)
      const rankedUsers = [...new Set(rootScores.map((rs) => rs.user))]
      const userSort: ScoreItem[] = []
      rankedUsers.forEach((user) => {
        userSort.push(...rootScores.filter((rs) => rs.user === user))
      })
      return userSort
    },
    'date': () => {
      const byDate = (a: ScoreItem, b: ScoreItem) => b.date - a.date
      return rootScores.sort(byDate)
    },
    'points': () => {
      const byPoints = (a:ScoreItem, b:ScoreItem) => b.score.points - a.score.points
      return rootScores.sort(byPoints)
    },
    'efficiency': () => {
      const byEfficiency = (a:ScoreItem, b:ScoreItem) => b.score.efficiency - a.score.efficiency
      return rootScores.sort(byEfficiency)
    },
    'speed': () => {
      const bySpeed = (a:ScoreItem, b:ScoreItem) => b.score.speed - a.score.speed
      return rootScores.sort(bySpeed)
    },
    'level': () => {
      const byLevel = (a: ScoreItem, b: ScoreItem) => (b.game?.level || 0) - (a.game?.level || 0)
      return rootScores.sort(byLevel)
    },
    'blanks': () => {
      const byBlanks = (a:ScoreItem, b:ScoreItem) => a.relative.blanks - b.relative.blanks
      return rootScores.sort(byBlanks)
    },
    'pointers': () => {
      const byPointers = (a:ScoreItem, b:ScoreItem) => a.relative.pointers - b.relative.pointers
      return rootScores.sort(byPointers)
    },
    'mines': () => {
      const byMines = (a:ScoreItem, b:ScoreItem) => a.relative.mines - b.relative.mines
      return rootScores.sort(byMines)
    },
    'cells': () => {
      const byCells = (a:ScoreItem, b:ScoreItem) => a.game.cells - b.game.cells
      return rootScores.sort(byCells)
    },
    'flags': () => {
      const byFlags = (a:ScoreItem, b:ScoreItem) => (b.play?.flags || 0) - (a.play?.flags || 0)
      return rootScores.sort(byFlags)
    },
    'moves': () => {
      const byMoves = (a:ScoreItem, b:ScoreItem) => a.play.moves - b.play.moves
      return rootScores.sort(byMoves)
    },
    'duration': () => {
      const byDuration = (a:ScoreItem, b:ScoreItem) => a.play.duration - b.play.duration
      return rootScores.sort(byDuration)
    },
    'least': () => {
      const byLeast = (a:ScoreItem, b:ScoreItem) => b.game.effort.least - a.game.effort.least
      return rootScores.sort(byLeast)
    },
    'blank_pointer_ratio': () => {
      const byRatio = (a:ScoreItem, b:ScoreItem) => b.signature.blank_pointer_ratio - a.signature.blank_pointer_ratio
      return rootScores.sort(byRatio)
    },
    'blank_mine_ratio': () => {
      const byRatio = (a:ScoreItem, b:ScoreItem) => b.signature.blank_mine_ratio - a.signature.blank_mine_ratio
      return rootScores.sort(byRatio)
    },
    'pointer_mine_ratio': () => {
      const byRatio = (a:ScoreItem, b:ScoreItem) => b.signature.pointer_mine_ratio - a.signature.pointer_mine_ratio
      return rootScores.sort(byRatio)
    },
    'pointer_mark': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.pointer_mark - a.signature.pointer_mark
      return rootScores.sort(byDifficulty)
    },
    'pointer_avg': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.pointer_avg - a.signature.pointer_avg
      return rootScores.sort(byDifficulty)
    },
    'mine_mark': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.mine_mark - a.signature.mine_mark
      return rootScores.sort(byDifficulty)
    },
    'mine_avg': () => {
      const byDifficulty = (a:ScoreItem, b:ScoreItem) => b.signature.mine_avg - a.signature.mine_avg
      return rootScores.sort(byDifficulty)
    },
  }

  const sortByKind = function (event: React.ChangeEvent): void {
    const ctrl = event.target as HTMLSelectElement
    setSortLabel(ctrl.value as ScoreParam)
    setScores(methodsByKind[ctrl.value as ScoreParam]())
    window.scrollTo({top: 0, left: 0})
  }

  return (
    <>
      <label htmlFor="x-axis">{text.fame['sort']}</label>
      <select id="x-axis" value={sortLabel} onChange={sortByKind}>
        {parameters
          .map((param) => <option key={param} value={param}>{text.VAR[param]}</option>
        )}
      </select>
    </>
  )
}

export default SortScores
