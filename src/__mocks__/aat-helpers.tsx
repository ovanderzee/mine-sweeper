import React from 'react'
import { render, RenderResult } from 'vitest-browser-react'
import PageProvider from './../store/PageProvider'
import { Languages } from '../common/app.d'
import storage from '../common/storage'

const setTestLanguage = () => {
    const currentConfig = storage.config
    storage.config = { ...currentConfig, LANGUAGE: Languages.en }
}

/*
  renderInApp
  Renders in app component; based on renderInProvider
  Supplies translations and config
*/
export const renderInApp = async (component: React.ReactNode): Promise<RenderResult> => {
  setTestLanguage()

  return await render(
    <PageProvider>
      {component}
    </PageProvider>
  )
}
