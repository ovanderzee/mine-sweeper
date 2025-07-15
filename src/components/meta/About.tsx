import { useContext } from 'react'
import PageContext from '../../store/page-context'
import HiScores from '../nav/HiScores'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { VERSION_INFO } from '../../common/constants'
import './Meta.css'
import './About.css'

const About = () => {
  const pageCtx = useContext(PageContext)
  const { FONT_SIZE } = pageCtx.config
  const text = pageCtx.text
  const [appVersion, commitHash] = VERSION_INFO

  const aboutContent = (
    <article>
      <h2>{text.common['Minesweeper']}</h2>

      <h3>{text.help['Intro Heading']}</h3>
      <p>{text.help['Playing Hint']}</p>
      <p>{text.help['Flagging Paragraph']}</p>
      <p>{text.help['Finalise Game']}</p>

      <h3>{text.help['Nav Heading']}</h3>
      <dl>
        <dt><svg><text id="text-content" x="50%" y="55%" style={{fontSize: '1em'}}>9×</text></svg></dt>
          <dd>{text.help['Game Scores Comment']}</dd>
        <dt><svg><use href="#nav-podium" /></svg></dt><dd>{text.help['About Scores Comment']}</dd>
        <dt><svg><use href="#nav-play" /></svg></dt><dd>{text.help['New Game Comment']}</dd>
        <dt><svg><use href="#nav-replay" /></svg></dt><dd>{text.help['Replay Comment']}</dd>
        <dt><svg><use href="#nav-question" /></svg></dt><dd>{text.help['Help Comment']}</dd>
        <dt><svg><use href="#nav-sliders" /></svg></dt><dd>{text.help['Settings Comment']}</dd>
        <dt><svg><use href="#nav-reset" /></svg></dt><dd>{text.help['Reset Comment']}</dd>
        <dt><svg><use href="#nav-empty" /></svg></dt><dd>{text.help['Delete Comment']}</dd>
        <dt><svg><use href="#nav-return" /></svg></dt><dd>{text.help['Go Back Comment']}</dd>
      </dl>

      <h3>{text.help['Accessibility Heading']}</h3>
      <p>{text.help['Keyboard Notice']}</p>
      <p>{text.help['Game Navigation']}</p>

      <hr />

      <h5>Onno van der Zee, 2013 - 2025</h5>
      <h6>{text.help['appVersion']}: {appVersion} ({commitHash})</h6>
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
