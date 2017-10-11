// Type definitions for @skatejs/renderer-react@0.0.0
// Project: https://github.com/skatejs/renderer-preact
// TypeScript Version: 2.5

import { ReactNode, ReactElement } from 'react'
import { Renderer } from 'skatejs'

type Maybe<T> = T | null | undefined
type Constructor<T> = new (...args: any[]) => T
type CElement = Constructor<HTMLElement>

declare class ReactRenderedComponent<P> extends HTMLElement implements Renderer<P, Maybe<ReactElement<any>>> {
  props: P & { children?: ReactNode }
  renderCallback(props?: P): Maybe<ReactElement<any>>
  rendererCallback(shadowRoot: Element, renderCallback: () => ReactElement<any>): void
}

type WithReact = new <P>(...args: any[]) => ReactRenderedComponent<P>

export default function withReact<T extends CElement = CElement>(Base?: T): WithReact
