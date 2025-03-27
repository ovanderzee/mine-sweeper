import React from 'react'

const PageContext = React.createContext({
  render: null,
  navigate: () => {},
  config: {},
  text: {},
  configure: () => {},
})

export default PageContext
