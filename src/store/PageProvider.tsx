import React, { useState } from 'react'
import PageContext from './page-context'
import DEFAULTS from '../common/defaults'
import { texts } from '../common/i18n'
import storage from '../common/storage'
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
  const { config } = storage
  defaultPageState.config = config
  defaultPageState.text = texts[config.LANGUAGE]

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
      storage.config = update.config
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
