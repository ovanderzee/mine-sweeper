import { RefObject, useContext } from 'react'
import PageContext from '../../store/page-context'
import TimeTracker from './TimeTracker'
import MineTracker from './MineTracker'
import FullscreenPlay from './FullscreenPlay'
import NewGame from '../nav/NewGame'
import Pause from '../nav/Pause'
import { PlayMode } from '../../common/app.d'
import { minorMagnification } from '../../common/functions'
import { GameState, GameAction } from '../../common/game.d'
import '../nav/NavOptionButton.css'
import './Tips.css'

export interface TipProps {
  game: GameState;
}

interface TipsProps extends TipProps {
  onNew: (action: GameAction) => void
  onPause: () => void
  playgroundRef: RefObject<HTMLDivElement>
}

const Tips = (props: TipsProps) => {
  const pageCtx = useContext(PageContext)
  const { config, session, text } = pageCtx

  return (
    <div
      className="tips"
      role="toolbar"
      style={{'fontSize': minorMagnification(session.MAGNIFICATION) * config.FONT_SIZE + 'px'} as React.CSSProperties}
    >
      {config.PLAY_MODE !== PlayMode.NORMAL &&
        <div className="tip" id="playmode-text" title={text.tips[`${config.PLAY_MODE} hint`]}>
          <span><b>{text.settings[config.PLAY_MODE]}</b></span>
        </div>
      }
      {config.PLAY_MODE !== PlayMode.BARE && <>
        <TimeTracker game={props.game} />
        <MineTracker game={props.game} />
      </>}
      <section id="tip-action" className="tip">
        <NewGame onNew={props.onNew} stage={props.game.stage} appearance="tip" />
        <Pause onPause={props.onPause} appearance="tip" />
      </section>
      <FullscreenPlay playgroundRef={props.playgroundRef} />
    </div>
  )
}

export default Tips
