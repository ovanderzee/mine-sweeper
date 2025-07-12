
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import EraseScores from './EraseScores'
import { renderInContext } from './../../__mocks__/render-helpers'

describe('EraseScores Component', () => {
  let dispatcher: () => {}, spyShowModal: jest.SpyInstance

  beforeEach(() => {
    dispatcher = jest.fn()
    spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
  })

  test('should display the "Start Playing" sign', () => {
    renderInContext(<EraseScores onErase={dispatcher} />)
    const button = screen.getByTitle('Clear List')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-empty"]')
    expect(svg).toBeInTheDocument()
  })

  test('should erase scores when clicked and a modal is shown', () => {
    renderInContext(<EraseScores onErase={dispatcher} />)
    const button = screen.getByTitle('Clear List')
    fireEvent.click(button)
    expect(spyShowModal).toHaveBeenCalledTimes(1)
    const cancelDialog = screen.getByText(/Cancel/i)
    fireEvent.click(cancelDialog)
    expect(dispatcher).toHaveBeenCalledTimes(0)
    const effectDialog = screen.getByText(/Ok/i)
    fireEvent.click(effectDialog)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

})
