import { RefObject, useContext } from 'react'
import PageContext from '../../store/page-context'
import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import FullscreenPlay from './FullscreenPlay'
import NewGame from '../nav/NewGame'
import { PlayMode } from '../../common/app.d'
import { GameState, GameAction } from '../../common/game.d'
import '../nav/NavOptionButton.css'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

interface TipsProps extends TipProps {
  onNew: (action: GameAction) => void
  playgroundRef: RefObject<HTMLDivElement>
}

const Tips = (props: TipsProps) => {
  const pageCtx = useContext(PageContext)
  const { config } = pageCtx

  return (
    <div className="tips" role="toolbar">
      {config.PLAY_MODE !== PlayMode.TOUGH && (<>
        <TimeTracker game={props.game} />
        <MineTracker game={props.game} />
      </>)}
      <section id="tip-action" className="tip">
        <NewGame onNew={props.onNew} stage={props.game.stage} appearance="tip" />
      </section>
      <FullscreenPlay playgroundRef={props.playgroundRef} />
    </div>
  )
}

export default Tips
