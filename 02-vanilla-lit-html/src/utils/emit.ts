const defaultEventOptions: CustomEventInit = {
  bubbles: true,
  cancelable: true,
  composed: false,
}
export function emit(origin: HTMLElement, name: string, opts: CustomEventInit): boolean {
  const eventOptions = { ...defaultEventOptions, ...opts }
  const event = createEvent(name, eventOptions)
  return origin.dispatchEvent(event)
}

function createEvent(name: string, options: CustomEventInit) {
  return 'composed' in CustomEvent.prototype ? new CustomEvent(name, options) : createOldBrowserCustomEvent()

  function createOldBrowserCustomEvent() {
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent(name, options.bubbles!, options.cancelable!, options.detail)
    Object.defineProperty(event, 'composed', { value: options.composed })
    return event
  }
}
