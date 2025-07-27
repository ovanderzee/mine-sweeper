import { InputRange } from './app-types'

// shortest game duration, to circumvent weird values, in milliseconds
export const MIN_DURATION = 750

// where the graphics are shown
export const MODAL_ELEMENT = document.getElementById('modal')
export const OVERLAY_ELEMENT = document.getElementById('overlay')
export const ROOT_ELEMENT = document.getElementById('root')

// fade out time for overlays, modals and pages, also in (shorter) css-variable
export const FADE_OUT_TIME = 550

// threshold between a click and a deliberate long press, in milliseconds
export const LONG_PRESS_THRESHOLD = 200

/* RANGES */

const newReadOnly = (value: number | InputRange): PropertyDescriptor => {
  return { enumerable: true, value }
}

const newRange = (min: number, max: number): InputRange => Object.defineProperties(
  {} as InputRange, { min: newReadOnly(min), max: newReadOnly(max) }
)

const RANGES = {} as Record<string, InputRange>
Object.defineProperties(RANGES, {
  SIZE: newReadOnly(newRange(3, 10)),
  LEVEL: newReadOnly(newRange(1, 7)),
  FONT: newReadOnly(newRange(8, 36)),
  SCORES: newReadOnly(newRange(8, 1024)),
});

export { RANGES }


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
