
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import { vi, MockInstance } from 'vitest'
import NewGame from './NewGame'
import { GameStages } from './../../common/game.d'
import { renderInContext, newPortalLayer } from './../../__mocks__/render-helpers'

describe('NewGame Component', () => {
  let dispatcher: () => {}, spyShowModal: MockInstance

  beforeEach(() => {
    dispatcher = vi.fn()
    spyShowModal = vi.spyOn(ReactDOM, 'createPortal')
  })

  it('should display the "Start Playing" sign', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-play"]')
    expect(svg).toBeInTheDocument()
  })

  it('should renew game when clicked while game is not touched', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.NEW} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should renew game when clicked while game is lost', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.LOST} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should renew game when clicked while game is won', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.WON} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  it('should renew game when clicked while game is playing and a modal is shown', () => {
    newPortalLayer('modal')
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)

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
