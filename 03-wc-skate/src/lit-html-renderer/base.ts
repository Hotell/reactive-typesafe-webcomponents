import { html, directive, TemplateResult } from 'lit-html'
import { withComponent } from 'skatejs'
import withLitHtml from '@skatejs/renderer-lit-html'

export const Component = withComponent(withLitHtml())

export const when = (cond: boolean, truthy: TemplateResult, falsy: TemplateResult) =>
  directive(part => {
    try {
      return cond ? truthy : falsy
    } catch (e) {
      console.error(e)
    }
  })
