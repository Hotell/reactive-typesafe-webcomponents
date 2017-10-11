import { createElement as h } from 'react'
import { props } from 'skatejs'
import { Component } from './base'

// type Props = { yell: boolean; children?: Array<JSX.Element>; name?: string }
type Props = { yell: boolean }
class WcHello extends Component<Props> {
  static readonly props = {
    yell: props.boolean,
  }
  // ISSUE: https://github.com/skatejs/renderer-preact/issues/4
  // renderCallback({ name, yell, children }: Props) {
  //   return <div>Hello, {yell ? <strong>{this.props.children}</strong> : children}!</div>
  // }
  renderCallback({ yell }: Props) {
    return (
      <div>
        Hello,{' '}
        {yell ? (
          <strong>
            <slot />
          </strong>
        ) : (
          <slot />
        )}!
      </div>
    )
  }
}

customElements.define('r-hello', WcHello)

export default WcHello
