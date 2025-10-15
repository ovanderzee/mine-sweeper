import { InputRange } from './app-types'

// shortest game duration, to circumvent weird values, in milliseconds
export const MIN_DURATION = 750

// where the graphics are shown
export const MODAL_ELEMENT = 'modal'
export const OVERLAY_ELEMENT = 'overlay'

// fade out time for overlays, modals and pages, also in (shorter) css-variable
export const FADE_OUT_TIME = 550

// threshold between a click and a deliberate long press, in milliseconds
export const LONG_PRESS_THRESHOLD = 200

// hall of fame
export const SHOW_SORT_THRESHOLD = 12
export const SHOW_DIAGRAM_THRESHOLD = 36

/* RANGES */

const newReadOnly = (value: number | InputRange): PropertyDescriptor => {
  return { enumerable: true, value }
}

const newRange = (min: number, max: number): InputRange => Object.defineProperties(
  {} as InputRange, { min: newReadOnly(min), max: newReadOnly(max) }
)

const RANGES = {} as Record<string, InputRange>
Object.defineProperties(RANGES, {
  SIZE: newReadOnly(newRange(3, 20)),
  LEVEL: newReadOnly(newRange(1, 6)),
  FONT: newReadOnly(newRange(8, 36)),
  SCORES: newReadOnly(newRange(8, 1024)),
});

export { RANGES }

export const SCORE_RADIX = 24

/* ADMIN */

export const getAppVersion = () => {
  // vite exposes env vars via import.meta.env.
  try {
    return __APP_VERSION__
  }
  catch(e) {
    // ReferenceError: __APP_VERSION__ is not defined
    return '0.0.0'
  }
}

export const getCommitHash = () => {
  try { return __COMMIT_HASH__ }
  catch(e) { return 'abcdefg' }
}

export const VERSION_INFO = [getAppVersion(), getCommitHash()]
