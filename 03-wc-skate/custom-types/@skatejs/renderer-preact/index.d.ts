import { VNode } from 'preact'
import { Component } from 'skatejs'

type Constructor<T> = new (...args: any[]) => T

type Key = string | number
interface ComponentDefaultProps {
  children?: JSX.Element[]
  key?: Key
}

// just preact aliases, they should be rmeoved probably, we don't wanna maintain any preact specifics
export interface StatelessComponent<Props> {
  (props: Props, children?: JSX.Element[]): JSX.Element
}
export type SFC<P> = StatelessComponent<P>

export declare class PreactRenderedComponent<P> extends Component<P> {
  props: P & ComponentDefaultProps
  rendererCallback(shadowRoot: Element, renderCallback: () => VNode): void
}

export default function witPreact<
  T extends Constructor<Component | HTMLElement> = Constructor<Component | HTMLElement>
>(Base?: T): typeof PreactRenderedComponent
