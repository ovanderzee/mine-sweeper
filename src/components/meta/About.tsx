import { useContext } from 'react'
import PageContext from '../../store/page-context'
import { ChampionsPodium, CogWheel, Enter, Erase, Play, QuestionMark, Redo, Reset } from '../UI/Symbols'
import HiScores from '../nav/HiScores'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { getAppVersion } from '../../common/functions'
import './Meta.css'
import './About.css'

const About = () => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text

  const aboutContent = (
    <article>
      <h2>{text.common['Minesweeper']}</h2>

      <h3>{text.help['Intro Heading']}</h3>
      <p>{text.help['Playing Hint']}</p>
      <p>{text.help['Flagging Paragraph']}</p>
      <p>{text.help['Finalise Game']}</p>

      <h3>{text.help['Nav Heading']}</h3>
      <dl>
        <dt className="adorn">9×</dt><dd>{text.help['Game Scores Comment']}</dd>
        <dt className="adorn"><ChampionsPodium /></dt><dd>{text.help['About Scores Comment']}</dd>
        <dt className="adorn"><Play /></dt><dd>{text.help['New Game Comment']}</dd>
        <dt className="adorn"><Redo /></dt><dd>{text.help['Replay Comment']}</dd>
        <dt className="adorn"><QuestionMark /></dt><dd>{text.help['Help Comment']}</dd>
        <dt className="adorn"><CogWheel /></dt><dd>{text.help['Settings Comment']}</dd>
        <dt className="adorn"><Reset /></dt><dd>{text.help['Reset Comment']}</dd>
        <dt className="adorn"><Erase /></dt><dd>{text.help['Delete Comment']}</dd>
        <dt className="adorn"><Enter /></dt><dd>{text.help['Go Back Comment']}</dd>
      </dl>

      <h3>{text.help['Accessibility Heading']}</h3>
      <p>{text.help['Keyboard Notice']}</p>
      <p>{text.help['Game Navigation']}</p>

      <hr />

      <h5>Onno van der Zee, 2013 - 2025</h5>
      <h6>{text.help['appVersion']}: {getAppVersion()}</h6>
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
