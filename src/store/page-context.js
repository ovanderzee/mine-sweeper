import React from 'react'

const PageContext = React.createContext({
  render: null,
  navigate: (component) => {},
  config: null,
  text: null,
  configure: (changesObject) => {},
})

export default PageContext
