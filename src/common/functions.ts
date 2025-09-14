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

export const interactionSelectors = 'input, select, textarea, button, object, a, area[href], [tabindex]'

export const flipFocus = function (event: React.KeyboardEvent) {
  if (event.altKey && event.key === 'Tab') {
    event.stopPropagation()

    const contentArea = document.querySelector('section.screen > article, section.screen > form')
    const navArea = document.querySelector('section.screen > nav')
    const contentSelector = contentArea?.querySelector(interactionSelectors) as HTMLElement
    const navSelectors = navArea?.querySelectorAll(interactionSelectors) as NodeListOf<HTMLElement>

    let focusable: HTMLElement | undefined
    if (contentSelector && navArea?.contains(document.activeElement)) {
      focusable = contentSelector
    } else if (navSelectors.length && contentArea?.contains(document.activeElement)) {
      focusable = navSelectors[navSelectors.length - 1]
    } else if (!focusable) {
      const all = document.querySelectorAll(interactionSelectors)
      if (all.length) {
        if (all[0] !== document.activeElement) {
          focusable = all[all.length -1] as HTMLElement
        } else {
          focusable = all[0] as HTMLElement
        }
      }
    }
    focusable ? focusable.focus() : document.body.focus()
  }
}
