import React from 'react'
import { ROOT_ELEMENT } from './constants'

export const aspectualInside = (start: number, size: number, current: number): boolean => {
  // insideness 0 - 1 when inside
  const insideness = (current - start) / size
  return insideness >= 0 && insideness <= 1
}

export const preventReloadByEnter = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    const ctrl = event.target as HTMLInputElement
    ctrl.blur()
  }
}

// trap or release user interactivity and discoverability
export const trapFocus = (trapping: boolean) => {
  ROOT_ELEMENT!.inert = trapping
  ROOT_ELEMENT!.setAttribute('aria-hidden', trapping.toString())
}
