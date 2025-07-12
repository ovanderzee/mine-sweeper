import './Shield.css'

const ShieldSymbols = () => {
  return (
    <svg
    	aria-hidden="true"
    	xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="shield_common">
        <filter id="blur" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8"></feGaussianBlur>
        </filter>
        <path id="shield" d="M72,20.424c17.969,0,41.261-10.427,41.261-10.427L135,30.185c-17.303,19.965-3.863,45.784-5.545,61.891
          C126.792,117.586,72,134.003,72,134.003s-54.792-16.417-57.455-41.928C12.864,75.969,26.303,50.149,9,30.185L30.74,9.997
          C30.74,9.997,54.031,20.424,72,20.424z"/>
        <path id="edge" d="M 32.837891,21.695312 22.046875,31.716797
          c 5.722672,10.616352 6.411445,22.10624 5.542969,31.755859 -1.094679,12.16294 -3.597222,22.796726 -3.09961,27.564453 0.309609,2.965993 2.480935,6.856521 6.966797,11.029301 4.485863,4.17277 10.910844,8.2796 17.425781,11.66601 10.722676,5.57355 19.673509,8.58281 23.117188,9.69727 3.443688,-1.11446 12.394488,-4.1238 23.117187,-9.69727 6.514953,-3.38635 12.939913,-7.49335 17.425783,-11.66601 4.48586,-4.172668 6.65721,-8.063683 6.9668,-11.029301 0.4979,-4.768013 -2.0048,-15.399635 -3.09961,-27.5625 -0.86863,-9.650009 -0.18032,-21.142762 5.54297,-31.759765 L 111.16406,21.695312
          C 102.85804,25.020194 87.247454,30.423828 72,30.423828
          c -15.246744,0 -30.856,-5.403566 -39.162109,-8.728516 z"
            strokeWidth="1" fill="none" opacity="0.667"/>
      </defs>
      <symbol id="shield_blue" viewBox="0 3 144 144">
        <defs>
          <linearGradient id="gradient_blue" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--extra-light-blue)" />
            <stop offset="83%" stopColor="var(--extra-dark-blue)" />
          </linearGradient>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_blue" fill="url(#gradient_blue)" />
          <use href="#shield" id="paint" fill="var(--medium-blue)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
          <use href="#edge" stroke="var(--extra-dark-blue)" />
          <use href="#edge" stroke="var(--extra-light-blue)" transform="translate(0.7, 0.7)" />
        </g>
      </symbol>

      <symbol id="shield_gold" viewBox="0 3 144 144">
        <defs>
          <linearGradient id="gradient_gold" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--light-gold)" />
            <stop offset="83%" stopColor="var(--dark-gold)" />
          </linearGradient>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_gold" fill="url(#gradient_gold)" />
          <use href="#shield" id="paint" fill="var(--medium-gold)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
          <use href="#edge" stroke="var(--light-gold)" />
          <use href="#edge" stroke="var(--dark-gold)" transform="translate(0.7, 0.7)" />
        </g>
      </symbol>

      <symbol id="shield_silver" viewBox="0 3 144 144">
        <defs>
          <linearGradient id="gradient_silver" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--light-silver)" />
            <stop offset="83%" stopColor="var(--dark-silver)" />
          </linearGradient>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_silver" fill="url(#gradient_silver)" />
          <use href="#shield" id="paint" fill="var(--medium-silver)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
          <use href="#edge" stroke="var(--light-silver)" />
          <use href="#edge" stroke="var(--dark-silver)" transform="translate(0.7, 0.7)" />
        </g>
      </symbol>

      <symbol id="shield_bronze" viewBox="0 3 144 144">
        <defs>
          <linearGradient id="gradient_bronze" gradientTransform="rotate(40)">
            <stop offset="67%" stopColor="var(--light-bronze)" />
            <stop offset="83%" stopColor="var(--dark-bronze)" />
          </linearGradient>
        </defs>
        <clipPath id="clipping">
          <use href="#shield" overflow="visible" />
        </clipPath>
        <g clipPath="url(#clipping)">
          <rect x="6" y="6" width="132" height="132" id="glare_bronze" fill="url(#gradient_bronze)" />
          <use href="#shield" id="paint" fill="var(--medium-bronze)" filter="url(#blur)"
              transform="translate(63, 62) skewX(-8) skewY(-8) translate(-63, -62)" />
          <use href="#edge" stroke="var(--light-bronze)" />
          <use href="#edge" stroke="var(--dark-bronze)" transform="translate(0.7, 0.7)" />
        </g>
      </symbol>

    </svg>
  )
}

export default ShieldSymbols
