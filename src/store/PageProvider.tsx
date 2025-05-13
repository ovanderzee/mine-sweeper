import React, { useState } from 'react'
import PageContext from './page-context'
import DEFAULTS from '../common/defaults'
import { texts } from '../common/i18n'
import { AppConfig, AppSubConfig, PageContextProps, Translation } from '../common/app-types'

const defaultPageState = {
  render: null as unknown as React.ReactElement,
  config: null as unknown as AppConfig,
  text: {} as Translation
}

/**
 * Wrapper to make Page available
 * @param {Object} props
 * @returns {Object} Page members and methods
 */
const PageProvider = (props: { children: React.ReactNode }) => {
  const stored = window.localStorage.getItem('mv-config')
  const config = stored ? { ...DEFAULTS, ...JSON.parse(stored)} : DEFAULTS
  const { LANGUAGE } = config
  defaultPageState.config = config
  defaultPageState.text = texts[LANGUAGE]

  const [pageState, setPageState] = useState(defaultPageState)

  const navigationHandler = (toComponent: React.ReactElement) => {
    setPageState(prev => {
      return {
        ...prev,
        render: toComponent,
      }
    })
  }

  const configurationHandler = (changes: AppSubConfig = DEFAULTS) => {
    setPageState(prev => {
      const update = {
        ...prev,
        config: {
          ...prev.config,
          ...changes,
        }
      }
      if (changes.LANGUAGE) {
        update.text = texts[changes.LANGUAGE]
      }
      const configString = JSON.stringify(update.config)
      window.localStorage.setItem('mv-config', configString)
      return update
    })
  }

  const pageCtx: PageContextProps = {
    render: pageState.render,
    navigate: navigationHandler,
    config: pageState.config,
    text: pageState.text,
    configure: configurationHandler,
  }

  return (
    <PageContext.Provider value={pageCtx}>
      {props.children}
    </PageContext.Provider>
  )
}

export default PageProvider
