import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { ShieldByRank } from './Shield'

describe('Shields express success', async () => {

  it('should color gold when rank equals 1', async () => {
    const screen = await render(<ShieldByRank rank={1} />)
    const shield = screen.getByRole('img')
    expect(shield).toBeInTheDocument()
    expect(shield.element().classList).toContain('gold')
    expect(shield.getByText('1')).toBeInTheDocument()
  })

  it('should color silver when rank equals 2', async () => {
    const screen = await render(<ShieldByRank rank={2} />)
    const shield = screen.getByRole('img')
    expect(shield).toBeInTheDocument()
    expect(shield.element().classList).toContain('silver')
    expect(shield.getByText('2')).toBeInTheDocument()
  })

  it('should color bronze when rank equals 3', async () => {
    const screen = await render(<ShieldByRank rank={3} />)
    const shield = screen.getByRole('img')
    expect(shield).toBeInTheDocument()
    expect(shield.element().classList).toContain('bronze')
    expect(shield.getByText('3')).toBeInTheDocument()
  })

  it('should color blue when rank is greater than 3', async () => {
    const screen = await render(<ShieldByRank rank={44} />)
    const shield = screen.getByRole('img')
    expect(shield).toBeInTheDocument()
    expect(shield.element().classList).toContain('blue')
    expect(shield.getByText('44')).toBeInTheDocument()
  })

})

describe('Shields display a readable text', async () => {

  const Parent = () => {
    return <>
      <ShieldByRank rank={1} />
      <ShieldByRank rank={22} />
      <ShieldByRank rank={333} />
      <ShieldByRank rank={4444} />
    </>
  }

  it('should scale the text according to it\'s length', async () => {
    const screen = await render(<Parent />)
    const single = screen.getByText('1').element()
    const double = screen.getByText('22').element()
    const triple = screen.getByText('333').element()
    const quadruple = screen.getByText('4444').element()

    expect(single.clientHeight).toBeGreaterThan(double.clientHeight)
    expect(double.clientHeight).toBeGreaterThan(triple.clientHeight)
    expect(triple.clientHeight).toBeGreaterThan(quadruple.clientHeight)
  })

})
