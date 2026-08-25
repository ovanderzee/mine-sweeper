import { useContext, useState } from 'react'
import PageContext from '../../store/page-context'
import storage from '../../common/storage'
import { PlayMode } from '../../common/app.d'
import { ScoreItem } from '../../common/game.d'
import { ShieldByRank } from './Shield'
import ElasticBrace from './ElasticBrace'
import { precise, rebuildGameData } from '../../common/scoring'
import { initialGameState } from '../game/common'
import { ApproveModal } from './Modal'
import Game from '../game/Game'
import Histogram from './Histogram'
import BoardImage from './BoardImage'
import './ScorePopover.css'

interface ScorePopoverProps {
  scores: ScoreItem[]
  index: number
  onDeletion: (score: ScoreItem) => void
  onBrowse: (browseIndex: number) => void
}

const ScorePopover = (props: ScorePopoverProps) => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const log = props.scores[props.index]

  const closeButton = (
    <button type="button" className="glyph scale"
      title={text.common.close}
      onClick={() => props.onBrowse(-1)}
    ><span>&times;</span></button>
  )

  const replayStoredGame = (code: string): void => {
    const buildData = rebuildGameData(code)
    pageCtx.configure(buildData.config)
    const gameState = {
      ...initialGameState,
      board: buildData.board,
    }
    storage.game = gameState
    pageCtx.navigate(<Game />)
  }

  const [deletable, setDeletable] = useState<ScoreItem | null>(null)
  const [showModal, setShowModal] = useState(false)

  const approveModal = <ApproveModal
    message={text.dialog['Delete this game?']}
    onConfirm={() => deletable && props.onDeletion(deletable)}
    onCancel={() => {}}
    isShowModal={showModal}
    endShowModal={()=>{
      setShowModal(false)
      setDeletable(null)
    }}
  />

  const disableDescend = props.index === 0
  const disableAscend = props.index === props.scores.length - 1

  if (!log) return (
    // safari requires to close a hint-popover programmatically
    <figure><header><div className="buttons">{closeButton}</div></header></figure>
  )

  const loggedDate = new Date(log.date)

  return (<>
    <figure
      className={log.rank <= 10 ? 'super' : ''}
      key={`${log.rank}_${log.score.points}`}
    >
      <header>
        <h2 className="rank">
          {log.rank <= 10 ? <ShieldByRank rank={log.rank} /> : log.rank}
        </h2>
        <div className="character">
          <h3 className="user">{log.user}</h3>
          {log.game.mode != PlayMode.NORMAL &&
            <h5 className={`${log.game.mode}-mode play-mode`}>{log.game.mode}</h5>
          }
        </div>
        <h4 className="date" data-date={log.date}>
          <div className="buttons">
            <button type="button" className="glyph y-stretch"
              disabled={disableDescend}
              title={text.common.back}
              onClick={() => props.onBrowse(props.index - 1)}
            ><span>&lt;</span></button>
            &nbsp;
            <button type="button" className="glyph y-stretch"
              disabled={disableAscend}
              title={text.common.forth}
              onClick={() => props.onBrowse(props.index + 1)}
            ><span>&gt;</span></button>
            &nbsp;
            {closeButton}
          </div>
          {loggedDate.toLocaleDateString()}<br/>
          {loggedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </h4>
      </header>
      <article className="functional-grid">
        <section className="group">
          <h5>{text.VAR['efficiency']}</h5>
          <div className="abstract">
            <code>&fnof;(</code>
            <div className="unit">
              <small>{text.fame['least']}</small>
              <span className="moves">{log.game.effort.least} &le;</span>
            </div>
            <div className="unit">
              <small>{text.VAR['moves']}</small>
              <span className="moves">{log.play.moves}</span>
            </div>
            <div className="unit">
              <small>{text.fame['most']}</small>
              <span className="moves">&le; {log.game.effort.most}</span>
            </div>
            <code>)</code>
            <code className="xl">&rArr;</code>
            <div className="unit">
              <small>{text.VAR['efficiency']}</small>
              <span className="efficiency">{precise(log.score.efficiency, 3)}</span>
            </div>
          </div>
        </section>

        <section className="group">
          <h5>{text.VAR['speed']}</h5>
          <div className="abstract">
            <code>&fnof;(</code>
            <div className="unit">
              <small>{text.VAR['moves']}</small>
              <span className="moves">{log.play.moves}</span>
            </div>
            <code className="s">/</code>
            <div className="unit">
              <small>{text.VAR['duration']}</small>
              <span className="duration">{precise(log.play.duration, 3)}s</span>
            </div>
            <code>)</code>
            <code className="xl">&rArr;</code>
            <div className="unit">
              <small>{text.VAR['speed']}</small>
              <span className="speed">{precise(log.score.speed, 3)}/s</span>
            </div>
          </div>
        </section>

        <section className="result">
          <ElasticBrace />

          <div className="unit">
            <small>{text.VAR['points']}</small>
            <strong className="points">{log.score.points}</strong>
          </div>
        </section>

      </article>
      <article>
        <section className="group">
          <h5>{text.fame['characteristics']}</h5>
          <div className="unit">
            <small>{text.VAR['effort']}</small>
            <span>{log.game.effort.least} - {log.game.effort.most}</span>
          </div>
          <code className="s">[</code>
          <div className="unit">
            <small>{text.VAR['blanks']}</small>
            <span>{log.game.blanks}</span>
          </div>
          <code className="s">:</code>
          <div className="unit">
            <small>{text.VAR['pointers']}</small>
            <span>{log.game.cells - log.game.blanks - log.game.mines}</span>
          </div>
          <code className="s">:</code>
          <div className="unit">
            <small>{text.VAR['mines']}</small>
            <span>{log.game.mines}</span>
          </div>
          <code className="s">]</code>

        </section>

        <section className="group">
          <h5>{text.fame['configuration']}</h5>
          <code>&fnof;(</code>
          <div className="unit">
            <small>{text.VAR['level']}</small>
            <span className="level">{log.game.level}</span>
          </div>
          <code className="s">&</code>
          <div className="unit">
            <small>{text.VAR['cells']}</small>
            <span className="cells">{log.game.cells}</span>
          </div>
          <code>)</code>
          <code className="xl">&rArr;</code>
          <div className="unit">
            <small>{text.VAR['mines']}</small>
            <span className="mines">{log.game.mines}</span>
          </div>
        </section>
      </article>
      <article>
        {log.signature.invalid_code ?
          <div className="error"><span>{text.error['Invalid code']}</span></div> :
          <>
            <Histogram data={log.signature.fill_frequency} />
            <BoardImage board={log.signature.board} />
          </>
        }
      </article>
      <footer>
        <div className="buttons">
          <button type="button" className="delete"
            onClick={() => {
              setDeletable({...log})
              setShowModal(true)
            }}
          >{text.common.delete}</button>
          {log.signature.invalid_code ?
            <span>{text.error['No replay']}</span> :
            <button type="button" className="replay"
              onClick={() => replayStoredGame(log.code)}
            >{text.nav.Replay}</button>
          }
        </div>
      </footer>
    </figure>
    {approveModal}
  </>)
}

export default ScorePopover
