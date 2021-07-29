import { useContext } from 'react'
import PageContext from '../../store/page-context'
import ChampionsPodium from '../symbols/ChampionsPodium'
import Play from '../symbols/Play'
import Redo from '../symbols/Redo'
import Flag from '../symbols/Flag'
import QuestionMark from '../symbols/QuestionMark'
import CogWheel from '../symbols/CogWheel'
import Erase from '../symbols/Erase'
import CRLF from '../symbols/CRLF'
import HiScores from '../nav/HiScores'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import './Meta.css'
import './About.css'

const About = () => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const aboutContent = (
    <article>
      <h2>{text.common['Minesweeper']}</h2>
      <p>{text.help['Intro Paragraph']}</p>
      <dl>
        <dt className="adorn">9×</dt><dd>{text.help['Game Scores Comment']}</dd>
        <dt className="adorn"><ChampionsPodium /></dt><dd>{text.help['About Scores Comment']}</dd>
        <dt className="adorn"><Play /></dt><dd>{text.help['New Game Comment']}</dd>
        <dt className="adorn"><Redo /></dt><dd>{text.help['Replay Comment']}</dd>
        <dt className="adorn"><Flag /></dt><dd>{text.help['Flag Comment']}</dd>
        <dt className="adorn"><QuestionMark /></dt><dd>{text.help['Help Comment']}</dd>
        <dt className="adorn"><CogWheel /></dt><dd>{text.help['Settings Comment']}</dd>
        <dt className="adorn"><Erase /></dt><dd>{text.help['Delete Comment']}</dd>
        <dt className="adorn"><CRLF /></dt><dd>{text.help['Go Back Comment']}</dd>
      </dl>
      <p>{text.help['Remarks Paragraph']}</p>
      <h5>Onno van der Zee, 2013 - 2021</h5>
    </article>
  )

  const aboutNavigation = (
    <nav>
      <HiScores />
      {/*<Help />*/}
      <Settings />
      <GoBack />
    </nav>
  )

  return (
    <section
      className="screen"
      style={{ fontSize: `${FONT_SIZE}px`, lineHeight: 'initial' }}
    >
      {aboutContent}
      {aboutNavigation}
    </section>
  )
}

export default About
