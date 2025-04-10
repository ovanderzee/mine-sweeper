import './Shield.css'

const Symbols = () => {
  return (
    <svg
    	aria-hidden="true"
    	xmlns="http://www.w3.org/2000/svg"
    	style={{position: 'absolute', width: 0, height: 0, overflow: 'hidden'}}
    >
      <symbol id="shield" viewBox="0 3 144 144">
        <filter id="blur" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8"></feGaussianBlur>
        </filter>
        <linearGradient id="gradient" gradientTransform="rotate(40)">
          <stop offset="67%" stopColor="var(--light)" />
          <stop offset="83%" stopColor="var(--dark)" />
        </linearGradient>
        <defs>
          <path id="schild" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"/>
        </defs>
        <clipPath id="knipsel">
          <use href="#schild" overflow="visible" />
        </clipPath>
        <g clipPath="url(#knipsel)">
          <path id="waas" fill="url(#gradient)" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"/>
          <path id="vulling" fill="var(--medium)" filter="url(#blur)"
              d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
        </g>
      </symbol>
    </svg>
  )
}

export default Symbols
