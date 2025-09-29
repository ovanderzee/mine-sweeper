
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
  </svg>
)
