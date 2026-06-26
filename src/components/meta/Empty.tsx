import { useContext } from 'react'
import PageContext from '../../store/page-context'
import NavOptionsBar from '../nav/NavOptionsBar'
import Game from '../game/Game'
import GoBack from '../nav/GoBack'
import './Meta.css'
import './Empty.css'

const Empty = () => {
  const pageCtx = useContext(PageContext)
  const text = pageCtx.text

  const emptyContent = (
    <article
      id="pausing"
      role="main"
      className="game-lost"
      aria-labelledby="page-heading"
    >
      <h1 className="sr-only" id="page-heading">{text.nav['Pause']}</h1>
      <div>
        <button type="button"
          onClick={() => pageCtx.navigate(<Game />)}
          title={text.nav['Resume']}
        >
          <svg
            width="150" height="150"
            viewBox="20 20 110 110"
            id="pause-image"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="MineGradient" cx="0.25" cy="0.25" r="1">
                <stop offset="0%" stopColor="hsl(0, 0%, 100%)" />
                <stop offset="9%" stopColor="hsl(0, 0%, 93.3%)" />
                <stop offset="27%" stopColor="hsl(30, 28.6%, 46.7%)" />
                <stop offset="46%" stopColor="hsl(160, 100%, 10%)" />
              </radialGradient>

              <filter id="drop-shadow">
                <feDropShadow dx="-1" dy="-1" stdDeviation="1"
                  floodColor="var(--fire-yellow)" floodOpacity="0.75"
                />
              </filter>

              <path id="pause-icon"
                d="
                  M 50 50 L 50 100 L 70 100 L 70 50 L 50 50 z
                  M 80 50 L 80 100 L 100 100 L 100 50 L 80 50 z
                "
              />
              <path id="play-icon"
                d="M 55 50 L 105 75 L 55 100 L 55 50 z"
              />

              <circle id="base-mine" cx="75" cy="75" r="55" />
            </defs>

            <use href="#base-mine" id="full-mine"
              fill="url(#MineGradient)"
              filter="url(#drop-shadow)"
            />

            <clipPath id="pause-clip">
              <use href="#pause-icon" />
            </clipPath>
            <g id="pause-mine" clipPath="url(#pause-clip)">
              <use href="#base-mine" fill="url(#MineGradient)" />
            </g>

            <clipPath id="play-clip">
              <use href="#play-icon" />
            </clipPath>
            <g id="play-mine" clipPath="url(#play-clip)">
              <use href="#base-mine" fill="url(#MineGradient)" />
            </g>

          </svg>
        </button>
      </div>
    </article>
  )

  const emptyNavigation = (
    <NavOptionsBar>
      <GoBack />
    </NavOptionsBar>
  )

  return (
    <>
      {emptyContent}
      {emptyNavigation}
    </>
  )
}

export default Empty
