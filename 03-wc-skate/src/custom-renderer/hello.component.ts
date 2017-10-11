import { props } from 'skatejs'
import { Component } from './base'

type Props = { yell: boolean }
class WcHello extends Component<Props> {
  static readonly props = {
    yell: props.boolean,
  }
  renderCallback({ yell }: Props) {
    const el = document.createElement('div')
    el.innerHTML = `Hello, ${yell ? `<strong><slot></slot></strong>` : `<slot />`} !`
    return el
  }
}

customElements.define('cr-hello', WcHello)

export default WcHello
