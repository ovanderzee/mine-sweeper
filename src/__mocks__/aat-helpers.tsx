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
      <>
        <AllSymbols />
        {component}
      </>
    </PageProvider>
  )
}

export const renderWithApp = async (name: string = 'Game'): Promise<RenderResult> => {
  setTestLanguage()
  const screen = await render(<App />)
  const skipBtn = screen.getByText('skip to game')
  await skipBtn.click()

  let title: string
  switch (name) {
    case 'About':       title = 'Description'; break;
    case 'HallOfFame':  title = 'Hall of Fame'; break;
    case 'Configure':   title = 'Settings'; break;
  }

  let heading = 'Playground'
  const gameHeader = screen.getByRole('heading').getByText(heading)

  await vi.waitFor(async () => {
    // fails:
    //   should accept numbers as input /HallOfFame.aat.tsx:282:21 TypeError: inputField.clear is not a function
    //   should start a new game when storage contains an finished game: /Game.aat.tsx:211:26 AssertionError: expected [ [ 9, 1, +0 ], [ 1, 2, 1 ], …(1) ] to not strictly equal
    // soms 1 soms 2 failures
    await expect.element(skipBtn).not.toBeInTheDocument()
    // fails:
    //   should accept numbers as input //HallOfFame.aat.tsx:284:37 Caused by: Error: Matcher did not succeed in time.
    //   should load an unfinished game from storage /Game.aat.tsx:82:18 WebDriverError: stale element reference: "html > body > div > #playground > #game-board > div:nth-child(2) > #row1col1" (seq.nr 4) (meedere keren)
    //   should restart a lost game &&
    //   should replay a game depending permission when a game is in progress /Game-options.aat.tsx:139:62  element click intercepted: WebDriverError: element click intercepted ... Other element would receive the click: <button type="button" id="intro" class="ending"
    // 8 failures
//     await expect.element(gameHeader).toBeInTheDocument()
    if (title) await screen.getByTitle(title).click()
  })

  switch (name) {
    case 'About':       heading = 'Description'; break;
    case 'HallOfFame':  heading = 'Hall of Fame'; break;
    case 'Configure':   heading = 'Settings'; break;
  }

  await vi.waitFor(async () =>
    await expect.element(screen.getByRole('heading', {name: heading})).toBeInTheDocument()
  )

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
