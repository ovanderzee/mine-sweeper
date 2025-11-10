import { ElementLike, EventHandler, ScreenfullApi } from './app.d'

export const isFullscreen = (): boolean => {
  // @ts-expect-error //  error TS2551: Property 'webkitFullscreenElement' does not exist on type 'Document'.
  return document?.fullscreenElement || document?.webkitFullscreenElement
}

export const isFullscreenAble = (): boolean => {
  // @ts-expect-error // error TS2551: Property 'webkitFullscreenEnabled' does not exist on type 'Document'
  return document?.fullscreenEnabled || document?.webkitFullscreenEnabled
}

const changeEventName = (): keyof DocumentEventMap => {
  // @ts-expect-error // error TS2774: This condition will always return true since this function is always defined.
  const standardName = document.exitFullscreen && 'fullscreenchange'
  // @ts-expect-error // error TS2551: Property 'webkitfullscreenchange' does not exist on type 'Document'
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
    if (elem.requestFullscreen) {await elem.requestFullscreen({navigationUI: "hide"})}
    // @ts-expect-error // error TS2551: Property 'webkitRequestFullscreen' does not exist on type 'Element | HTMLElement'.
    else if (elem?.webkitRequestFullscreen) {await elem?.webkitRequestFullscreen()}
    else {console.error('Your browser does not support our fullscreen needs')}
  }
}

const exitFullscreen = async (elem: ElementLike): Promise<void> => {
  if (elem) {
    elem?.classList.add('exiting-fullscreen')
    if (document?.exitFullscreen) {await document?.exitFullscreen()}
    // @ts-expect-error // error TS2551: Property 'webkitExitFullscreen' does not exist on type 'Element | HTMLElement'.
    else if (document?.webkitExitFullscreen) {await document.webkitExitFullscreen()}
  }
}

const screenfullFn = function (
  elem: ElementLike,
  toFullscreen: ()=>void = ()=>{},
  toWindowed: ()=>void = ()=>{}
): ScreenfullApi {

  const afterChangeHandler = () => {
    if (isFullscreen()) {
      toFullscreen()
      elem?.classList.remove('entering-fullscreen')
    } else {
      toWindowed()
      elem?.classList.remove('exiting-fullscreen')
    }
  }

  return {
    isFullscreen: isFullscreen,
    isFullscreenAble: isFullscreenAble,
    addFullscreenChangeEvent: () => addFullscreenChangeEvent(afterChangeHandler),
    removeFullscreenChangeEvent: () => removeFullscreenChangeEvent(afterChangeHandler),
    enterFullscreen: () => enterFullscreen(elem),
    exitFullscreen: () => exitFullscreen(elem),
  }
}

export default screenfullFn
