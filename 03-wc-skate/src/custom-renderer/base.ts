import { withComponent, Renderer, define, props } from 'skatejs'

const withCustomRenderer = () =>
  class<P> extends HTMLElement implements Renderer<P, Element> {
    rendererCallback(shadowRoot: HTMLElement, renderCallback: () => Element): void {
      // erease content
      shadowRoot.innerHTML = ''
      // re-render content
      shadowRoot.appendChild(renderCallback())
    }
  }

const withCustomRendererAsString = () =>
  class<P> extends HTMLElement implements Renderer<P, string> {
    rendererCallback(shadowRoot: HTMLElement, renderCallback: () => string): void {
      // erease content && re-render
      shadowRoot.innerHTML = renderCallback()
    }
  }

export const Component = withComponent(withCustomRenderer())
