import { useContext } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import HiScores from '../nav/HiScores'
import Settings from '../nav/Settings'
import GoBack from '../nav/GoBack'
import { VERSION_INFO } from '../../common/constants'
import './Meta.css'
import './About.css'

const About = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text
  const [appVersion, commitHash] = VERSION_INFO

  const aboutContent = (
    <article
      role="main"
      aria-label={text.nav['Help']}
    >
      <h1 className="sr-only">{text.nav['Help']}</h1>
      <h2>{text.common['Minesweeper']}</h2>

      <h3>{text.help['Intro Heading']}</h3>
      <p>{text.help['Playing Hint']}</p>
      <p>{text.help['Flagging Paragraph']}</p>
      <p>{text.help['Finalise Game']}</p>

      <h3>{text.help['Nav Heading']}</h3>
      <dl>
        <dt><svg role="img" aria-label={text.icon['podium']}><use href="#plain-podium" /></svg></dt><dd>{text.help['About Scores Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['play']}><use href="#plain-play" /></svg></dt><dd>{text.help['New Game Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['cw-revolving']}><use href="#plain-replay" /></svg></dt><dd>{text.help['Replay Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['question']}><use href="#plain-question" /></svg></dt><dd>{text.help['Help Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['sliders']}><use href="#plain-sliders" /></svg></dt><dd>{text.help['Settings Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['ccw-revolving']}><use href="#plain-reset" /></svg></dt><dd>{text.help['Reset Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['empty set']}><use href="#plain-empty" /></svg></dt><dd>{text.help['Delete Comment']}</dd>
        <dt><svg role="img" aria-label={text.icon['return']}><use href="#plain-return" /></svg></dt><dd>{text.help['Go Back Comment']}</dd>
      </dl>

      <h3 className="sr-only">{text.help['Features Heading']}</h3>

      <h4>{text.help['Accessibility Heading']}</h4>
      <p>{text.help['Keyboard Notice']}</p>
      <p>{text.help['Game Navigation']}</p>

      <h4>{text.help['Cookie Heading']}</h4>
      <p>{text.help['Storage Notice']}</p>

      <hr />

      <h5>Onno van der Zee, 2013 - 2025</h5>
      <h6>{text.help['appVersion']}: {appVersion} ({commitHash})</h6>
    </article>
  )

  const aboutNavigation = (
    <NavOptionsBar>
      <HiScores />
      <Settings />
      <GoBack />
    </NavOptionsBar>
  )

  return (
    <>
      {aboutContent}
      {aboutNavigation}
    </>
  )
}

export default About
