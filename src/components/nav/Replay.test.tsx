
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import Replay from './Replay'
import { GameStages } from './../../common/game-types'
import { renderInContext } from './../../__mocks__/render-helpers'

describe('Replay Component', () => {
  let dispatcher: () => {}, spyShowModal: jest.SpyInstance

  beforeEach(() => {
    dispatcher = jest.fn()
    spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
  })

  test('should display the "Redo" sign', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('Replay')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-replay"]')
    expect(svg).toBeInTheDocument()
  })

  test('should reset game when clicked while game is not touched', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.NEW} />)
    const button = screen.getByTitle('Replay')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test('should reset game when clicked while game is lost', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.LOST} />)
    const button = screen.getByTitle('Replay')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test('should reset game when clicked while game is won', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.WON} />)
    const button = screen.getByTitle('Replay')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test('should reset game when clicked while game is playing and a modal is shown', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByTitle('Replay')
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
