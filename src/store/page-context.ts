import React from 'react'
import { AppConfig, PageContextProps } from '../common/app.d'

const PageContext = React.createContext<PageContextProps>({
  render: null as unknown as React.ReactElement,
  navigate: () => {},
  config: {} as AppConfig,
  text: {},
  configure: (): void => {}
})

export default PageContext
