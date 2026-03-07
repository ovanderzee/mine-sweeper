import React from 'react'
import { preventReloadByEnter, scrollIntoViewTowardsCenter } from './functions'

describe('preventReloadByEnter', () => {
  it('should call event.preventDefault when Enter was pressed', () => {
    const enterEvent = {
      key: 'Enter',
      preventDefault: vi.fn(),
      target: document.createElement('input')
    } as unknown as React.KeyboardEvent

    preventReloadByEnter(enterEvent)
    expect(enterEvent.preventDefault).toHaveBeenCalled()
  })

  it('should allow other keys pressed', () => {
    const aEvent = {
      key: 'A',
      preventDefault: vi.fn(),
      target: document.createElement('input')
    } as unknown as React.KeyboardEvent

    preventReloadByEnter(aEvent)
    expect(aEvent.preventDefault).not.toHaveBeenCalled()
  })
})


describe('scrollIntoViewTowardsCenter', () => {
  it('should call HTMLElement.scrollIntoViewIfNeeded', () => {
    scrollIntoViewTowardsCenter(document.body)

    expect(document.body.scrollIntoViewIfNeeded).toHaveBeenCalled()
  })

  it('should call HTMLElement.scrollIntoView alternatively', () => {
    HTMLElement.prototype.scrollIntoViewIfNeeded = undefined
    scrollIntoViewTowardsCenter(document.body)

    expect(document.body.scrollIntoView).toHaveBeenCalled()
  })
})
