
// import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import { vi, /*MockInstance*/ } from 'vitest'
import EraseScores from './EraseScores'
import storage from '../../common/storage'
import { liveScores } from './../../__mocks__/scores'
import { renderInContext, newPortalLayer } from './../../__mocks__/render-helpers'

describe('EraseScores Component', () => {
  let emitter: () => void; // spyShowModal: MockInstance

  beforeEach(() => {
    emitter = vi.fn()
//     spyShowModal = vi.spyOn(ReactDOM, 'createPortal')
    storage.scores = liveScores
    newPortalLayer('modal')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should display the "Circled Division Slash" sign', () => {  // 1e
    renderInContext(<EraseScores onErase={emitter} />)
    const button = screen.getByTitle('Clear List')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-empty"]')
    expect(svg).toBeInTheDocument()
  })

  it('should not erase scores when cancelling', () => {
    renderInContext(<EraseScores onErase={emitter} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
//     expect(spyShowModal).toHaveBeenCalledTimes(1)
    const cancelDialog = screen.getByText(/Cancel/i)
    fireEvent.click(cancelDialog)
    expect(button.className).not.toContain('active')
    expect(emitter).toHaveBeenCalledTimes(0)
    expect(storage.scores).toStrictEqual(liveScores)
  })

  it('should erase scores when confirming', () => {
    renderInContext(<EraseScores onErase={emitter} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
//     expect(spyShowModal).toHaveBeenCalledTimes(1)

    const confirmDialog = screen.getByText(/Ok/i)
    fireEvent.click(confirmDialog)
    expect(button.className).toContain('active')
    expect(emitter).toHaveBeenCalledTimes(1)
    expect(storage.scores).toStrictEqual([])
  })

})
