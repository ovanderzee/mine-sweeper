const shade = [.13, .25, .33]

export const ScreenFitSymbols = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <symbol id="contain-view" fill="currentcolor" viewBox="0 0 18 13">
      <rect opacity={shade[1]} width="18" height="13" x="0" y="0"/>
      <g>
        <rect width="1" height="1" x="4.5" y="2"/>
        <rect width="1" height="1" x="6.5" y="2"/>
        <rect width="1" height="1" x="8.5" y="2"/>
        <rect width="1" height="1" x="10.5" y="2"/>
        <rect width="1" height="1" x="12.5" y="2"/>
        <rect width="1" height="1" x="4.5" y="4"/>
        <rect width="1" height="1" x="6.5" y="4"/>
        <rect width="1" height="1" x="8.5" y="4"/>
        <rect width="1" height="1" x="10.5" y="4"/>
        <rect width="1" height="1" x="12.5" y="4"/>
        <rect width="1" height="1" x="4.5" y="6"/>
        <rect width="1" height="1" x="6.5" y="6"/>
        <rect width="1" height="1" x="8.5" y="6"/>
        <rect width="1" height="1" x="10.5" y="6"/>
        <rect width="1" height="1" x="12.5" y="6"/>
        <rect width="1" height="1" x="4.5" y="8"/>
        <rect width="1" height="1" x="6.5" y="8"/>
        <rect width="1" height="1" x="8.5" y="8"/>
        <rect width="1" height="1" x="10.5" y="8"/>
        <rect width="1" height="1" x="12.5" y="8"/>
        <rect width="1" height="1" x="4.5" y="10"/>
        <rect width="1" height="1" x="6.5" y="10"/>
        <rect width="1" height="1" x="8.5" y="10"/>
        <rect width="1" height="1" x="10.5" y="10"/>
        <rect width="1" height="1" x="12.5" y="10"/>
      </g>
    </symbol>
    <symbol id="cover-view" fill="currentcolor" viewBox="0 0 18 13">
      <rect opacity={shade[1]} width="18" height="10.5" x="0" y="0"/>
      <g transform="translate(0.4,0) scale(0.96)">
      <g>
        <rect width="2" height="2" x="2" y="2"/>
        <rect width="2" height="2" x="5" y="2"/>
        <rect width="2" height="2" x="8" y="2"/>
        <rect width="2" height="2" x="11" y="2"/>
        <rect width="2" height="2" x="14" y="2"/>
        <rect width="2" height="2" x="2" y="5"/>
        <rect width="2" height="2" x="5" y="5"/>
        <rect width="2" height="2" x="8" y="5"/>
        <rect width="2" height="2" x="11" y="5"/>
        <rect width="2" height="2" x="14" y="5"/>
        <rect width="2" height="2" x="2" y="8"/>
        <rect width="2" height="2" x="5" y="8"/>
        <rect width="2" height="2" x="8" y="8"/>
        <rect width="2" height="2" x="11" y="8"/>
        <rect width="2" height="2" x="14" y="8"/>
      </g>
      <g opacity={shade[2]}>
        <rect width="2" height="2" x="2" y="11"/>
        <rect width="2" height="2" x="5" y="11"/>
        <rect width="2" height="2" x="8" y="11"/>
        <rect width="2" height="2" x="11" y="11"/>
        <rect width="2" height="2" x="14" y="11"/>
        <rect width="2" height="2" x="2" y="14"/>
        <rect width="2" height="2" x="5" y="14"/>
        <rect width="2" height="2" x="8" y="14"/>
        <rect width="2" height="2" x="11" y="14"/>
        <rect width="2" height="2" x="14" y="14"/>
      </g>
      </g>
    </symbol>

    <symbol id="to-fullscreen" fill="currentcolor" viewBox="0 0 15 15">
      <rect x="1" y="1" width="13" height="13" stroke="none" opacity={shade[0]} />
      <g fill="none" stroke="currentcolor" strokeWidth="1.5">
        <path d="M  9,1 h  5 v  5 m 0,-5 l -5,5 " />
        <path d="M 6,14 h -5 v -5 m  0,5 l  5,-5" />
      </g>
    </symbol>
    <symbol id="to-window" fill="currentcolor" viewBox="0 0 15 15">
      <rect x="4" y="4" width="7" height="7" stroke="none" opacity={shade[0]} />
      <g fill="none" stroke="currentcolor" strokeWidth="1.5">
        <path d="M  1,9  h  5 v  5 m  0,-5 l -5,5 " />
        <path d="M 14,6  h -5 v -5 m  0,5  l  5,-5" />
      </g>
    </symbol>
  </svg>
)
