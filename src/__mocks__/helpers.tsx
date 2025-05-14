import React from 'react'
import { render } from '@testing-library/react'
import PageContext from './../store/page-context'
import PageProvider from './../store/PageProvider'
import { texts } from './../common/i18n'

/*
  renderInContext
  Supplies translations
  Allows spyingit's  methods
*/
export const renderInContext = (component: React.ReactNode, keyValue: any = {}) => {

  const fakeCtx = {
    navigate: () => {},
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
