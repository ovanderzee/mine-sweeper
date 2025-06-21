import React from 'react'
import { render } from '@testing-library/react'
import PageContext from './../store/page-context'
import PageProvider from './../store/PageProvider'
import DEFAULTS from './../common/defaults'
import storage from './../common/storage'
import { texts } from './../common/i18n'

/*
  renderInContext
  Supplies translations and config
  Allows spying it's methods
*/
export const renderInContext = (component: React.ReactNode, keyValue: any = {}) => {

  // for consistency
  if (keyValue.config) {
    storage.config = keyValue.config
  }

  const fakeCtx = {
    navigate: () => {},
    config: DEFAULTS,
    text: texts['en']
  }

  render(
    <PageContext.Provider value={{ ...fakeCtx, ...keyValue }}>
      {component}
    </PageContext.Provider>
  )
}

/*
  renderInProvider
  Like in live application
*/
export const renderInProvider = (component: React.ReactNode) => {
  render(
    <PageProvider>
      {component}
    </PageProvider>
  )
}
