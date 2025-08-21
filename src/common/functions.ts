import React from 'react'

export const preventReloadByEnter = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    const ctrl = event.target as HTMLInputElement
    ctrl.blur()
  }
}

export const scrollIntoViewTowardsCenter = (elem: HTMLElement) => {
  if ( window.HTMLElement.prototype.scrollIntoViewIfNeeded ) {
    elem.scrollIntoViewIfNeeded && elem.scrollIntoViewIfNeeded(true)
  } else {
    elem.scrollIntoView({behavior: "smooth", block: "center"})
  }
}
