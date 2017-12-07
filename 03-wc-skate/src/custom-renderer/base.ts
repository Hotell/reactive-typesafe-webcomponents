import { withComponent, Renderer, define, props } from 'skatejs'

const withCustomRenderer = () =>
  class<P> extends HTMLElement implements Renderer<Element> {
    renderer(root: HTMLElement, html: () => Element): void {
      // erease content
      root.innerHTML = ''
      // re-render content
      root.appendChild(html())
    }
  }

// this is default skate renderer
// const withCustomRendererAsString = () =>
//   class<P> extends HTMLElement implements Renderer<string> {
//     renderer(root: HTMLElement, html: () => string): void {
//       // erease content && re-render
//       root.innerHTML = html()
//     }
//   }

export const Component = withComponent(withCustomRenderer())
