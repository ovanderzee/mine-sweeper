
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import { vi, MockInstance } from 'vitest'
import Replay from './Replay'
import { GameStages } from './../../common/game-types'
import { renderInContext, newPortalLayer } from './../../__mocks__/render-helpers'

describe('Replay Component', () => {
  let dispatcher: () => {}, spyShowModal: MockInstance

  beforeEach(() => {
    dispatcher = vi.fn()
    spyShowModal = vi.spyOn(ReactDOM, 'createPortal').mockImplementation(ReactDOM.createPortal)
  })

  it('should display the "Redo" sign', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-replay"]')
    expect(svg).toBeInTheDocument()
  })

  it('should reset game when clicked while game is not touched', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.NEW} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is lost', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.LOST} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should reset game when clicked while game is won', () => {
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.WON} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test.skip('should reset game when clicked while game is playing and a modal is shown', () => {
    //TODO: RangeError: Maximum call stack size exceeded

    newPortalLayer('modal')
    renderInContext(<Replay onReplay={dispatcher} stage={GameStages.PLAYING} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(spyShowModal).toHaveBeenCalledTimes(1)

    const cancelDialog = screen.getByText(/Cancel/i)
    fireEvent.click(cancelDialog)
    expect(dispatcher).toHaveBeenCalledTimes(0)
    expect(button.className).not.toContain('active')

    const confirmDialog = screen.getByText(/Ok/i)
    fireEvent.click(confirmDialog)
    expect(dispatcher).toHaveBeenCalledTimes(1)
    expect(button.className).toContain('active')
  })

})
