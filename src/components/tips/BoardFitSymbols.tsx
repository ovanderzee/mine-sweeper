
export const BoardFitSymbols = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <symbol id="contain-view" fill="currentcolor" viewBox="0 0 13 18">
      <path opacity=".25" d="M 0,0 h 13 v 18 h -13 Z"/>
      <rect width="9" height="9" x="2" y="2"/>
    </symbol>
    <symbol id="cover-view" fill="currentcolor" viewBox="0 0 18 18">
      <path opacity=".25" d="M 0,0 h 11 v 18 h -11 Z"/>
      <rect opacity=".333" width="5" height="14" x="11" y="2"/>
      <rect width="9" height="14" x="2" y="2"/>
    </symbol>
    <symbol id="revert-view" fill="currentcolor" viewBox="0 0 13 18">
      <path opacity=".25" d="M 0,0 h 13 v 18 h -13 Z"/>
      <use href={`#plain-reset`} width="10" height="10" transform="translate(1,2)"/>
    </symbol>

    <symbol id="to-fullscreen" fill="currentcolor"  viewBox="0 0 18 18">
      <rect x="1" y="1" width="16" height="16" stroke="none" opacity="0.125" />
      <g fill="none" stroke="currentcolor" strokeWidth="1.5">
        <path d="M 1,6 v -5 h 5 m -5,0 l 5,5" />
        <path d="M 12,1 h 5 v 5 m 0,-5 l -5,5" />
        <path d="M 17,12 v 5 h -5 m 5,0 l -5,-5" />
        <path d="M 6,17 h -5 v -5 m 0,5 l 5,-5" />
      </g>
    </symbol>
    <symbol id="to-window" fill="currentcolor"  viewBox="0 0 18 18">
      <rect x="5" y="5" width="8" height="8" stroke="none" opacity="0.125" />
      <g fill="none" stroke="currentcolor" strokeWidth="1.5">
        <path d="M 12,17 v -5 h 5 m -5,0 l 5,5" />
        <path d="M 1,12 h 5 v 5 m 0,-5 l -5,5" />
        <path d="M 6,1 v 5 h -5 m 5,0 l -5,-5" />
        <path d="M 17,6 h -5 v -5 m 0,5 l 5,-5" />
      </g>
    </symbol>
  </svg>
)
