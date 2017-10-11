// Type definitions for @skatejs/renderer-lit-html@0.0.0
// Project: https://github.com/skatejs/renderer-lit-html
// TypeScript Version: 2.5

import { Renderer } from 'skatejs'
import { TemplateResult } from 'lit-html'

type Maybe<T> = T | null | undefined
type Constructor<T> = new (...args: any[]) => T
type CElement = Constructor<HTMLElement>

declare class LitHtmlRenderedComponent<P> extends HTMLElement implements Renderer<P, Maybe<TemplateResult>> {
  props: P
  renderCallback(props?: P): Maybe<TemplateResult>
  rendererCallback(shadowRoot: Element, renderCallback: () => TemplateResult): void
}

type WithLitHtml = new <P>(...args: any[]) => LitHtmlRenderedComponent<P>

export default function withLitHtml<T extends CElement = CElement>(Base?: T): WithLitHtml
