import { useState } from 'react'
import PageContext from './page-context'
import DEFAULTS from '../common/defaults'
import { texts } from '../common/i18n'

const defaultPageState = {
  render: null,
  config: null,
  text: null,
}

/**
 * Wrapper to make Page available
 * @param {Object} props
 * @returns {Object} Page members and methods
 */
const PageProvider = (props) => {
  const stored = window.localStorage.getItem('mijnenveger')
  const config = { ...DEFAULTS, ...JSON.parse(stored)}
  const { LANGUAGE } = config
  defaultPageState.config = config
  defaultPageState.text = texts[LANGUAGE]

  const [pageState, setPageState] = useState(defaultPageState)

  const navigationHandler = (toComponent) => {
    setPageState(prev => {
      return {
        ...prev,
        render: toComponent,
      }
    })
  }

  const configurationHandler = (changes = DEFAULTS) => {
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
      window.localStorage.setItem('mijnenveger', configString)
      return update
    })
  }

  const pageCtx = {
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
