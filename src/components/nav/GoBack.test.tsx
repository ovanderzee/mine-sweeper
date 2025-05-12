import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PageContextProps } from './../../common/app-types'
import GoBack from './GoBack'

describe('GoBack Component', () => {
  render(<GoBack />)
  const pageCtx = React.useContext({} as React.Context<PageContextProps>)
  const navSpy = jest.spyOn(pageCtx, 'navigate')

  test('should display the "Enter" sign', () => {
    const button = screen.getByText(/⏎/i)
    expect(button).toBeInTheDocument()
  })

  test('should navigate when clicked', () => {
    render(<GoBack />);
    const button = screen.getByText(/⏎/i)
    fireEvent.click(button)
    expect(navSpy).toHaveBeenCalledTimes(1)
  })

})
