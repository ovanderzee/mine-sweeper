import React from 'react'
import { preventReloadByEnter, getAppVersion } from './functions'

describe('preventReloadByEnter', () => {
  it('should call event.preventDefault when Enter was pressed', () => {
    const enterEvent = {
      key: 'Enter',
      preventDefault: jest.fn(),
      target: document.createElement('input')
    } as unknown as React.KeyboardEvent

    preventReloadByEnter(enterEvent)
    expect(enterEvent.preventDefault).toHaveBeenCalled()
  })

  it('should allow other keys pressed', () => {
    const aEvent = {
      key: 'A',
      preventDefault: jest.fn(),
      target: document.createElement('input')
    } as unknown as React.KeyboardEvent

    preventReloadByEnter(aEvent)
    expect(aEvent.preventDefault).not.toHaveBeenCalled()
  })
})

describe('getAppVersion', () => {
  it('should return a version string', () => {
    const output = getAppVersion()
    const re = /^\d+\.\d+\.\d+$/

    expect(output.match(re)).toBeTruthy()
  })
})
