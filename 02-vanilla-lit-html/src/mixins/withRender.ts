import { TemplateResult } from 'lit-html'
import { render } from 'lit-html/lib/lit-extended'

import { Constructor, CustomElement } from '../types'

interface LitElement extends CustomElement {
  render?(): TemplateResult
}

export const withRender = <TBase extends Constructor<LitElement>>(Base: TBase) =>
  class WithRender extends Base {
    connectedCallback() {
      super.connectedCallback && super.connectedCallback()
      const root = this.shadowRoot ? this.shadowRoot : this
      if (this.render) {
        const originalRender = this.render.bind(this)
        this.render = function() {
          render(originalRender(), root)
        } as any

        this.render!()
      }
    }
  }
