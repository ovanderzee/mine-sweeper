import { ElementLike, EventHandler, ScreenfullApi } from './app.d'

const isFullscreen = (): boolean => {
  // @ts-ignore
  return document?.fullscreenElement || document?.webkitFullscreenElement
}

const isFullscreenAble = (): boolean => {
  // @ts-ignore
  return document?.fullscreenEnabled || document?.webkitFullscreenEnabled
}

const changeEventName = (): keyof DocumentEventMap => {
  // @ts-ignore
  const standardName = document.exitFullscreen && 'fullscreenchange'
  // @ts-ignore
  const webkitName = document.webkitExitFullscreen && 'webkitfullscreenchange'
  return standardName || webkitName
}

const addFullscreenChangeEvent = (handler: EventHandler): void => {
  const eventName = changeEventName()
  isFullscreenAble() && eventName
    && document.addEventListener(eventName, handler, false);
}

const removeFullscreenChangeEvent = (handler: EventHandler): void => {
  const eventName = changeEventName()
  isFullscreenAble() && eventName
    && document.removeEventListener(eventName, handler, false);
}

const enterFullscreen = async (elem: ElementLike): Promise<void> => {
  if (elem && isFullscreenAble()) {
    elem?.classList.add('entering-fullscreen')
    if (elem.requestFullscreen) {await elem.requestFullscreen()}
    // @ts-ignore
    else if (elem?.webkitRequestFullscreen) {await elem?.webkitRequestFullscreen()}
    else {console.error('Your browser does not support our fullscreen needs')}
  }
}

const exitFullscreen = async (elem: ElementLike): Promise<void> => {
  if (elem) {
    elem?.classList.add('exiting-fullscreen')
    if (document?.exitFullscreen) {await document?.exitFullscreen()}
    // @ts-ignore
    else if (document?.webkitExitFullscreen) {await document.webkitExitFullscreen()}
  }
}

const screenfullFn = function (
  elem: ElementLike,
  changeHandler: EventHandler
): ScreenfullApi {
  return {
    isFullscreen: isFullscreen,
    isFullscreenAble: isFullscreenAble,
    addFullscreenChangeEvent: () => addFullscreenChangeEvent(changeHandler),
    removeFullscreenChangeEvent: () => removeFullscreenChangeEvent(changeHandler),
    enterFullscreen: () => enterFullscreen(elem),
    exitFullscreen: () => exitFullscreen(elem),
  }
}

export default screenfullFn
