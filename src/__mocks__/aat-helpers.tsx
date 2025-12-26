import React from 'react'
import { expect, vi } from 'vitest'
import { Locator } from 'vitest/browser'
import { render, RenderResult } from 'vitest-browser-react'
import PageContext from './../store/page-context'
import PageProvider from './../store/PageProvider'
import { Languages } from '../common/app.d'
import DEFAULTS from './../common/defaults'
import storage from '../common/storage'
import { texts } from './../common/i18n'
import AllSymbols from './../components/UI/AllSymbols'
import App from './../App'

/*
  renderWithContext
  Renders in app component; based on renderInContext
  Supplies translations and config
  Allows tracing calls to pageContext like pageCtx.navigate
*/
export const renderWithContext = async (component: React.ReactNode, keyValue: any = {}) => {

  // for consistency
  if (keyValue.config) {
    storage.config = keyValue.config
  }

  const fakeCtx = {
    navigate: () => {},
    config: DEFAULTS,
    text: texts['en']
  }

  return await render(
    <PageContext.Provider value={{ ...fakeCtx, ...keyValue }}>
      <AllSymbols />
      {component}
    </PageContext.Provider>
  )
}

const setTestLanguage = () => {
    const currentConfig = storage.config
    storage.config = { ...currentConfig, LANGUAGE: Languages.en }
}

/*
  renderWithProvider
  Renders in app component; based on renderInProvider
  Supplies translations and config
*/
export const renderWithProvider = async (component: React.ReactNode): Promise<RenderResult> => {
  setTestLanguage()

  return await render(
    <PageProvider>
      <AllSymbols />
      {component}
    </PageProvider>
  )
}

export const renderWithApp = async (): Promise<RenderResult> => {
  setTestLanguage()
  const screen = await render(<App />)
  const navBtn = screen.getByText('skip to game')
  await navBtn.click()
  await vi.waitFor(() => expect(screen.getByRole('Heading', {name: 'Playground'})).toBeInTheDocument())
  return screen
}

export const makeScreenshot = async (loc: Locator, fName: string, save = false): Promise<string> => {
  const { base64 } = await loc.screenshot({
    path: `src/__screenshot__/${fName}.png`,
    base64: true,
    save: save
  })
  return base64
}

export const clickRangeInputValue = (element: HTMLInputElement, value: string) => {
  element.value = value
  // added a click listener to have the event picked up
  const clickEvent = new MouseEvent('click', { 'bubbles': true })
  element.dispatchEvent(clickEvent)
}

export const setDefaultConfig = () => {
  const config = JSON.stringify({ ...DEFAULTS, LANGUAGE: 'nl' })
  localStorage.setItem('mv-config', config)
}
