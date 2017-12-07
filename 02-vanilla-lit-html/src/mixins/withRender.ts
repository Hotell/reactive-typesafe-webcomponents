import { TemplateResult } from 'lit-html'
import { render } from 'lit-html/lib/lit-extended'

import { Constructor, CustomElement } from '../types'

interface LitElement extends CustomElement {
  render(): TemplateResult
}

export const withRender = <TBase extends Constructor<HTMLElement>>(Base: TBase) => {
  abstract class WithRender extends Base {
    private get renderRoot() {
      return this.shadowRoot ? this.shadowRoot : this
    }
    abstract render(): TemplateResult

    scheduleRender() {
      this.renderer()
    }
    private renderer() {
      render(this.render && this.render(), this.renderRoot)
    }
  }

  return WithRender
}
