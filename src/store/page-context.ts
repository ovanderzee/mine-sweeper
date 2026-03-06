import React from 'react'
import { AppConfig, AppSession, PageContextProps } from '../common/app.d'

const PageContext = React.createContext<PageContextProps>({
  render: null as unknown as React.ReactElement,
  navigate: () => {},
  config: {} as AppConfig,
  session: {} as AppSession,
  text: {},
  configure: (): void => {},
  updSession: (): void => {}
})

export default PageContext
