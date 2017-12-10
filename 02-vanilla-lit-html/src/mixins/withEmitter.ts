import { Constructor, CustomElement } from '../types'
import { emit } from '../utils/emit'

export type Event<T = {}> = (payload?: T) => boolean

export const withEmitter = <E = {}, T extends Constructor<CustomElement> = Constructor<CustomElement>>(Base: T) => {
  return class WithEmitter extends Base {
    private static _events: {}
    private static set events(events: {}) {
      this._events = events
    }

    private _events: E = {} as E
    get events(): E {
      return this._events
    }

    constructor(...args: any[]) {
      super(...args)
      const events = (this.constructor as typeof WithEmitter)._events
      this.setupEvents(events)
    }
    private setupEvents(events: { [key: string]: CustomEventInit }) {
      const bindEmit = emit.bind(this, this) as (name: string, options: CustomEventInit) => boolean
      const eventsNames = Object.keys(events)
      eventsNames.forEach(eventName => {
        const definition = events[eventName]
        Object.defineProperty(this._events, eventName, {
          value(payload?: any): boolean {
            return bindEmit(eventName, { ...definition, detail: payload })
          },
        })
      })
    }
  }
}
