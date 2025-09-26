import { ScoreItem, ScoreParam, FlatScore } from '../../common/game-types'
import LineDiagram from './LineDiagram'

interface DiagramProps {
  scores: ScoreItem[],
  xParam: ScoreParam,
  yParam: ScoreParam,
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
    if (!flatScores.length) return
    if (props.xParam === 'date') return // not yet

    const xType = typeof flatScores[0][props.xParam]
    const yType = typeof flatScores[0][props.yParam]

    if (xType === 'number' && yType === 'number') {
      return (<LineDiagram data={flatScores} xParam={props.xParam} yParam={props.yParam} />)
    }
  }
  return svgDiagram()
}

export default Diagram
