import React from 'react'

export const preventReloadByEnter = (event: React.KeyboardEvent): boolean => {
  const isAction = event.key === 'Enter'
  if (isAction) {
    event.preventDefault()
    const ctrl = event.target as HTMLInputElement
    ctrl.blur()
  }
  return isAction
}

export const scrollIntoViewTowardsCenter = (elem: HTMLElement) => {
  if ( window.HTMLElement.prototype.scrollIntoViewIfNeeded ) {
    elem.scrollIntoViewIfNeeded && elem.scrollIntoViewIfNeeded(true)
  } else {
    elem.scrollIntoView({behavior: "smooth", block: "center"})
  }
}

export const interactionSelectors = 'input, select, textarea, button, object, a, area[href], [tabindex]'

export const flipFocus = function (event: KeyboardEvent) {
  if (event.altKey && event.key === 'Tab') {
    event.stopPropagation()

    const contentArea = document.querySelector('section.screen > article')
    const navArea = document.querySelector('section.screen > nav')
    let focusable: HTMLElement | undefined

    if (navArea?.contains(document.activeElement)) {
      focusable = contentArea?.querySelector(interactionSelectors) as HTMLElement
    } else if (contentArea?.contains(document.activeElement)) {
      focusable = navArea?.querySelector(interactionSelectors) as HTMLElement
    }

    if (!focusable) {
      const all = document.querySelectorAll(interactionSelectors)
      if (all.length) {
        if (all[0] === document.activeElement) {
          focusable = all[all.length -1] as HTMLElement
        } else {
          focusable = all[0] as HTMLElement
        }
      }
    }

    if (focusable) focusable.focus()
  }
}
