import React from 'react'

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
