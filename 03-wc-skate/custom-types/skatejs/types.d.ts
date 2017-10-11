export type Mixed = {}
export type Maybe<T> = T | null | undefined
export type Constructor<T> = new (...args: any[]) => T
export type CElement = Constructor<HTMLElement>

export type ComponentProps<El, T> = { [P in keyof T]: PropOptions }

// NOTE:
// - all classes are just ambient definitions (opaque types like), so consumer cannot use them directly
// - inferring generics work only on instances, not on implementation type. So this will not give you type safety, you still have to manually annotate those props in your code

// Custom Elements v1
export declare class CustomElement extends HTMLElement {
  static readonly observedAttributes: string[]
  connectedCallback(): void
  disconnectedCallback(): void
  attributeChangedCallback(name: string, oldValue: null | string, newValue: null | string): void
  adoptedCallback(): void
}
export declare class Component<P = Mixed> extends CustomElement {}

export declare class Children<P = Mixed> extends CustomElement {
  childrenChangedCallback(): void
}

/**
 * Implement this interface for any @skatejs/renderer-*
 */
export interface Renderer<P, O> {
  renderCallback?(props?: P): O

  // called after render
  renderedCallback?(): void

  rendererCallback(shadowRoot: Element, renderCallback: () => O): void
}

export declare class Render<P = Mixed, O = Mixed> extends CustomElement implements Renderer<P, O> {
  // getter for turning of ShadowDOM
  readonly renderRoot?: this | Mixed

  renderCallback(props?: P): O

  // called after render
  renderedCallback?(): void

  rendererCallback(shadowRoot: Element, renderCallback: () => O): void
}

export declare class Props<P = Mixed> extends CustomElement {
  // Special hack for own components type checking.
  // It works in combination with ElementAttributesProperty. It placed in jsx.d.ts.
  // more detail, see: https://www.typescriptlang.org/docs/handbook/jsx.html
  //               and https://github.com/skatejs/skatejs/pull/952#issuecomment-264500153
  props: P
  // Called whenever props are set, even if they don't change.
  propsSetCallback(next: P, prev: P): void

  // Called when props actually change.
  propsChangedCallback(next: P, prev: P): void

  // Called to see if the props changed.
  propsUpdatedCallback(next: P, prev: P): boolean | void
}

export declare class Unique extends CustomElement {
  static is: string
}

export type WithUnique = Constructor<Unique>
export type WithRender = new <P>(...args: any[]) => Render<P>
export type WithChildren = new <P>(...args: any[]) => Children<P>
export type WithProps = new <P>(...args: any[]) => Props<P>
// R -> Renderer
export type WithComponent<R> = new <P = Mixed>(...args: any[]) => R &
  Component<P> &
  Children<P> &
  Props<P> &
  Render<P> &
  Unique

export interface PropOptions {
  attribute?: PropOptionsAttribute
  coerce?: <T>(value: any) => Maybe<T>
  default?: any | ((elem: HTMLElement, data: { name: string }) => any)
  deserialize?: <T>(value: string | null) => Maybe<T>
  initial?: any | ((elem: HTMLElement, data: { name: string }) => any)
  serialize?: <T>(value: Maybe<T>) => string | null
}

export type PropOptionsAttribute = PropOptionsAttributeIdentifier | PropOptionsAttributeIdentifierMap
export type PropOptionsAttributeIdentifier = boolean | string
export type PropOptionsAttributeIdentifierMap = {
  source?: PropOptionsAttributeIdentifier
  target?: PropOptionsAttributeIdentifier
}

export interface EventOptions extends CustomEventInit {
  composed?: boolean
}
export interface ComposedCustomEvent extends CustomEvent {
  composed?: boolean
  composedPath?: () => Array<Node>
}
