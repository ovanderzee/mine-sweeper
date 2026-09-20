import NavOptionsBar from './NavOptionsBar'
import { DEFAULTS, configFactory } from  '../../common/defaults'
import { renderWithContext } from './../../__mocks__/aat-helpers'

describe('NavOptionsBar Component', () => {

  it('should enable title descriptions', async () => {
    const screen = await renderWithContext(<NavOptionsBar><br /></NavOptionsBar>, { config: DEFAULTS })
    await expect.element(screen.getByRole('navigation')).toHaveClass('verbose')
  })

  it('should disable title descriptions', async () => {
    const noVerboseConfig = configFactory({ VERBOSE_BTN: false })
    const screen = await renderWithContext(<NavOptionsBar><br /></NavOptionsBar>, { config: noVerboseConfig })
    await expect.element(screen.getByRole('navigation')).not.toHaveClass('verbose')
  })

})
