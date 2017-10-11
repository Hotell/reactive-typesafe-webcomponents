import { props } from 'skatejs'
import { html } from 'lit-html'

import { Component, when } from './base'

type Props = { yell: boolean }
class WcHello extends Component<Props> {
  static readonly props = {
    yell: props.boolean,
  }
  renderCallback({ yell }: Props) {
    return html`
        Hello, ${when(yell, html`<strong><slot></slot></strong>`, html`<slot />`)}!
      `
  }
}

customElements.define('lit-hello', WcHello)

export default WcHello
