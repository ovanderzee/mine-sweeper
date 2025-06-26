
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import EraseScores from './EraseScores'
import storage from '../../common/storage'
import { liveScores } from './../../__mocks__/scores'
import { renderInContext } from './../../__mocks__/render-helpers'

describe('EraseScores Component', () => {
  let emitter: () => {}, spyShowModal: jest.SpyInstance

  beforeEach(() => {
    emitter = jest.fn()
    spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
    storage.scores = liveScores
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should display the "Circled Division Slash" sign', () => {
    renderInContext(<EraseScores onErase={emitter} />)
    const button = screen.getByText(/⊘/i)
    expect(button).toBeInTheDocument()
  })

  test('should not erase scores when cancelling', () => {
    renderInContext(<EraseScores onErase={emitter} />)
    const button = screen.getByText(/⊘/i)
    fireEvent.click(button)
    expect(spyShowModal).toHaveBeenCalledTimes(1)
    const cancelDialog = screen.getByText(/Cancel/i)
    fireEvent.click(cancelDialog)
    expect(emitter).toHaveBeenCalledTimes(0)
    expect(storage.scores).toStrictEqual(liveScores)
  })

  test('should erase scores when confirming', () => {
    renderInContext(<EraseScores onErase={emitter} />)
    const button = screen.getByText(/⊘/i)
    fireEvent.click(button)
    expect(spyShowModal).toHaveBeenCalledTimes(1)
    const confirmDialog = screen.getByText(/Ok/i)
    fireEvent.click(confirmDialog)
    expect(emitter).toHaveBeenCalledTimes(1)
    expect(storage.scores).toStrictEqual([])
  })

})
