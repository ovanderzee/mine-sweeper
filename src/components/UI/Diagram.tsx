import { ScoreItem, ScoreParam, FlatScore } from '../../common/game.d'
import LineDiagram from './LineDiagram'

interface DiagramProps {
  scores: ScoreItem[],
  xParam: ScoreParam,
  yParam: ScoreParam,
}

const Diagram = (props: DiagramProps) => {

  // flatten scores
  const flatScores: FlatScore[] = props.scores.map((score: ScoreItem) => {
    const flattened: unknown = { ...score, ...score.game, ...score.play, ...score.score }
    // @ts-expect-error // error TS2790: The operand of a 'delete' operator must be optional.
    delete flattened.game
    // @ts-expect-error // error TS2790: The operand of a 'delete' operator must be optional.
    delete flattened.play
    // @ts-expect-error // error TS2790: The operand of a 'delete' operator must be optional.
    delete flattened.score
    return flattened as FlatScore
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
