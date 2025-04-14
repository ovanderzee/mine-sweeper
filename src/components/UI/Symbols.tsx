import './Shield.css'

const Symbols = () => {
  return (
    <svg
    	aria-hidden="true"
    	xmlns="http://www.w3.org/2000/svg"
    	style={{position: 'absolute', width: 0, height: 0, overflow: 'hidden'}}
    >
      <symbol id="shield_blue" viewBox="0 3 144 144">
        <defs>
          <filter id="blur" filterUnits="objectBoundingBox">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"></feGaussianBlur>
          </filter>
          <linearGradient id="gradient_blue" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--extra-light-blue)" />
            <stop offset="83%" stopColor="var(--extra-dark-blue)" />
          </linearGradient>
          <path id="shield" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"/>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_blue" fill="url(#gradient_blue)" />
          <use href="#shield" id="paint" fill="var(--medium-blue)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
        </g>
      </symbol>

      <symbol id="shield_gold" viewBox="0 3 144 144">
        <defs>
          <filter id="blur" filterUnits="objectBoundingBox">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"></feGaussianBlur>
          </filter>
          <linearGradient id="gradient_gold" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--light-gold)" />
            <stop offset="83%" stopColor="var(--dark-gold)" />
          </linearGradient>
          <path id="shield" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"/>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_gold" fill="url(#gradient_gold)" />
          <use href="#shield" id="paint" fill="var(--medium-gold)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
        </g>
      </symbol>

      <symbol id="shield_silver" viewBox="0 3 144 144">
        <defs>
          <filter id="blur" filterUnits="objectBoundingBox">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"></feGaussianBlur>
          </filter>
          <linearGradient id="gradient_silver" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--light-silver)" />
            <stop offset="83%" stopColor="var(--dark-silver)" />
          </linearGradient>
          <path id="shield" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"/>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_silver" fill="url(#gradient_silver)" />
          <use href="#shield" id="paint" fill="var(--medium-silver)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
        </g>
      </symbol>

      <symbol id="shield_bronze" viewBox="0 3 144 144">
        <defs>
          <filter id="blur" filterUnits="objectBoundingBox">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"></feGaussianBlur>
          </filter>
          <linearGradient id="gradient_bronze" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--light-bronze)" />
            <stop offset="83%" stopColor="var(--dark-bronze)" />
          </linearGradient>
          <path id="shield" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
            C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
            C30.74,9.997,54.031,20.424,72,20.424z"/>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_bronze" fill="url(#gradient_bronze)" />
          <use href="#shield" id="paint" fill="var(--medium-bronze)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
        </g>
      </symbol>

    </svg>
  )
}

export default Symbols
