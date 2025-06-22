import React from 'react'

export const preventReloadByEnter = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    const ctrl = event.target as HTMLInputElement
    ctrl.blur()
  }
}

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
