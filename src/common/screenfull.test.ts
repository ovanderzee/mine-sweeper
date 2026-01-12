import screenfullFn from './screenfull'
import { ScreenfullApi } from './app.d'

describe('Screenfull API', () => {
  let
    api: ScreenfullApi

  beforeEach(() => {
    api = screenfullFn(document.body, ()=>{})
  })

  it('should expose some methods', () => {
    expect(typeof api.isFullscreen).toBe('function')
    expect(typeof api.isFullscreenAble).toBe('function')
    expect(typeof api.addFullscreenChangeEvent).toBe('function')
    expect(typeof api.removeFullscreenChangeEvent).toBe('function')
    expect(typeof api.enterFullscreen).toBe('function')
    expect(typeof api.exitFullscreen).toBe('function')
  })

  it('should call native requestFullscreen', async () => {
    api.enterFullscreen()

    expect(document.body.requestFullscreen).toHaveBeenCalled()
  })

  it('should call native exitFullscreen', () => {
    api.exitFullscreen()

    expect(document.exitFullscreen).toHaveBeenCalled()
  })
})
