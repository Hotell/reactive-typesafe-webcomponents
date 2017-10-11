import {
  PropOptions,
  CElement,
  ComposedCustomEvent,
  WithComponent,
  WithChildren,
  WithRender,
  WithProps,
  WithUnique,
  EventOptions,
  CustomElement,
} from './types'

/**
 * The define() function is syntactic sugar on top of customElements.define()
 * that allows you to specify a static is property on your constructor that is the name of the component,
 * or omit it altogether.
 */
export const define: <T extends typeof HTMLElement>(ctor: T) => T

/**
 * Emits an Event on elem that is composed, bubbles and is cancelable by default.
 * The return value of emit() is the same as dispatchEvent().
 */
export function emit(elem: EventTarget | typeof HTMLElement, eventName: string, eventOptions?: EventOptions): boolean

export function link(elem: CustomElement, target: string): (e: ComposedCustomEvent) => void

export const props: {
  readonly any: PropOptions & PropertyDecorator
  readonly array: PropOptions & PropertyDecorator
  readonly boolean: PropOptions & PropertyDecorator
  readonly number: PropOptions & PropertyDecorator
  readonly object: PropOptions & PropertyDecorator
  readonly string: PropOptions & PropertyDecorator
}

export const prop: (ops?: PropOptions) => PropertyDecorator & PropOptions

// Mixins
export function withComponent<T extends CElement = typeof CustomElement>(Base?: T): WithComponent<T>
export function withChildren<T extends CElement = typeof CustomElement>(Base?: T): WithChildren
export function withRender<T extends CElement = typeof CustomElement>(Base?: T): WithRender
export function withProps<T extends CElement = typeof CustomElement>(Base?: T): WithProps
export function withUnique<T extends CElement = typeof CustomElement>(Base?: T): WithUnique
