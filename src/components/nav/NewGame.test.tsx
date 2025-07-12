
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/react'
import NewGame from './NewGame'
import { GameStages } from './../../common/game-types'
import { renderInContext } from './../../__mocks__/render-helpers'

describe('NewGame Component', () => {
  let dispatcher: () => {}, spyShowModal: jest.SpyInstance

  beforeEach(() => {
    dispatcher = jest.fn()
    spyShowModal = jest.spyOn(ReactDOM, 'createPortal')
  })

  test('should display the "Start Playing" sign', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.PLAYING} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    const svg = button.querySelector('use[href="#nav-play"]')
    expect(svg).toBeInTheDocument()
  })

  test('should renew game when clicked while game is not touched', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.NEW} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test('should renew game when clicked while game is lost', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.LOST} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test('should renew game when clicked while game is won', () => {
    renderInContext(<NewGame onNew={dispatcher} stage={GameStages.WON} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(dispatcher).toHaveBeenCalledTimes(1)
  })

  test('should renew game when clicked while game is playing and a modal is shown', () => {
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
