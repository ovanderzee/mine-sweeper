import React from 'react'

const PageContext = React.createContext({
  former: null,
  render: null,
  navigate: (component) => {},
})

export default PageContext
