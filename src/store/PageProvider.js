import { useState } from 'react'
import PageContext from './page-context'

const defaultPageState = {
  render: null,
}

/**
 * Wrapper to make Page available
 * @param {Object} props
 * @returns {Object} Page members and methods
 */
const PageProvider = (props) => {
  const [pageState, setPageState] = useState(defaultPageState)
    
  const navigationHandler = (toComponent) => {
    if (pageState.render === toComponent) {
      return
    }
    setPageState(prev => {
      return {
        former: prev.render,
        render: toComponent,
      }
    })
  }

  const pageCtx = {
    former: pageState.former,
    render: pageState.render,
    navigate: navigationHandler,
  }

  return (
    <PageContext.Provider value={pageCtx}>
      {props.children}
    </PageContext.Provider>
  )
}

export default PageProvider
