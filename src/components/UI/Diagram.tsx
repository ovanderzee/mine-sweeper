import {
  Primitive
} from '../../common/app-types'
import { ScoreItem,
} from '../../common/game-types'

type ScoreParam = keyof ScoreItem | keyof ScoreItem["game"] | keyof ScoreItem["play"] | keyof ScoreItem["score"]
type FlatScore = Record<ScoreParam, Primitive>

interface DiagramProps {
  scores: ScoreItem[],
  xParam: ScoreParam, //string, //
  yParam: ScoreParam, //string //
}

const Diagram = (props: DiagramProps) => {

  // flatten scores
  const flatScores: FlatScore[] = props.scores.map((score: ScoreItem) => {
    const flattened: any = { ...score, ...score.game, ...score.play, ...score.score }
    delete flattened.game
    delete flattened.play
    delete flattened.score
    return flattened
  })

  const svgDiagram = () => {
    const xType = typeof flatScores[0][props.xParam]
    const yType = typeof flatScores[0][props.yParam]

    if (xType === 'number' && yType === 'number') {
      console.log('lijndiagram')
      return (<span>Lijndiagram</span>)
    } else {
      return (<span>Niksjes</span>)
    }
  }
  return svgDiagram()
}

export default Diagram
