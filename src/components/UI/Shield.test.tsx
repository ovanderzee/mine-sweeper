import { getByText, render } from '@testing-library/react'
import { ShieldByRank } from '../UI/Shield'

describe('Shields express success', () => {

  it('should color gold when rank equals 1', () => {
    render(<ShieldByRank rank={1} />)
    const shield = document.querySelector('.shield.gold') as HTMLElement
    expect(shield).toBeInTheDocument()
    const text = getByText(shield, '1')
    expect(text).toBeInTheDocument()
  })

  it('should color silver when rank equals 2', () => {
    render(<ShieldByRank rank={2} />)
    const shield = document.querySelector('.shield.silver') as HTMLElement
    expect(shield).toBeInTheDocument()
    const text = getByText(shield, '2')
    expect(text).toBeInTheDocument()
  })

  it('should color bronze when rank equals3', () => {
    render(<ShieldByRank rank={3} />)
    const shield = document.querySelector('.shield.bronze') as HTMLElement
    expect(shield).toBeInTheDocument()
    const text = getByText(shield, '3')
    expect(text).toBeInTheDocument()
  })

  it('should color blue when rank is not 1, 2 or 3', () => {
    render(<ShieldByRank rank={44} />)
    const shield = document.querySelector('.shield.blue') as HTMLElement
    expect(shield).toBeInTheDocument()
    const text = getByText(shield, '44')
    expect(text).toBeInTheDocument()
  })

})
