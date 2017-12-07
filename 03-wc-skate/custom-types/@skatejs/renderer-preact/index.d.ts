// Type definitions for @skatejs/renderer-preact@0.0.1
// Project: https://github.com/skatejs/renderer-preact
// TypeScript Version: 2.5

import { ComponentProps, VNode } from 'preact'
import { Renderer } from 'skatejs'

type Maybe<T> = T | null | undefined
type Constructor<T> = new (...args: any[]) => T
type ElementClass = typeof HTMLElement

// just preact aliases, they should be rmeoved probably, we don't wanna maintain any preact specifics
export interface StatelessComponent<Props> {
  (props: Props, children?: VNode[]): VNode
}
export type SFC<P> = StatelessComponent<P>

declare class PreactRenderedComponent<P> extends HTMLElement implements Renderer<P, Maybe<VNode>> {
  props: P & ComponentProps<any>
  renderCallback(props?: P): Maybe<VNode>
  rendererCallback(shadowRoot: Element, renderCallback: () => VNode): void
}

type WithPreact = new <P>(...args: any[]) => PreactRenderedComponent<P>

export default function witPreact<T extends ElementClass = ElementClass>(Base?: T): WithPreact
