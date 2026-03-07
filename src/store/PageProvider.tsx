import React, { useState } from 'react'
import PageContext from './page-context'
import { DEFAULTS, calculateMineCount, NORMAL } from '../common/defaults'
import { texts } from '../common/i18n'
import storage from '../common/storage'
import { AppConfig, AppSubConfig, AppSession, AppSubSession, PageContextProps, Translation } from '../common/app.d'

/**
 * Wrapper to make Page available
 * @param {Object} props
 * @returns {Object} Page members and methods
 */
const PageProvider = (props: { children: React.ReactNode }) => {
  const defaultPageState = {
    render: null as unknown as React.ReactElement,
    config: null as unknown as AppConfig,
    session: null as unknown as AppSession,
    text: {} as Translation
  }

  const { config, session } = storage
  defaultPageState.config = config
  defaultPageState.session = session
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
      if (changes.BOARD_SIZE || changes.GAME_LEVEL) {
        update.config.MINE_COUNT = calculateMineCount(update.config)
      } else if (changes.LANGUAGE) {
        update.text = texts[changes.LANGUAGE]
      }
      storage.config = update.config
      return update
    })
  }

  const updSessionHandler = (changes: AppSubSession = NORMAL) => {
    setPageState(prev => {
      const update = {
        ...prev,
        session: {
          ...prev.session,
          ...changes,
        }
      }
      storage.session = update.session
      return update
    })
  }

  const pageCtx: PageContextProps = {
    render: pageState.render,
    navigate: navigationHandler,
    config: pageState.config,
    session: pageState.session,
    text: pageState.text,
    configure: configurationHandler,
    updSession: updSessionHandler,
  }

  return (
    <PageContext.Provider value={pageCtx}>
      {props.children}
    </PageContext.Provider>
  )
}

export default PageProvider
