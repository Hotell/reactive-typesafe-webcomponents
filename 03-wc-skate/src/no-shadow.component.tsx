import { h } from 'preact'
import { props } from 'skatejs'
import { Shadowless } from './base'

type Props = { yell: boolean }
class NoShadow extends Shadowless<Props> {
  static readonly props = {
    yell: props.boolean,
  }
  renderCallback({ yell }: Props) {
    console.log(this.children)
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

customElements.define('no-shadow', NoShadow)

export default NoShadow
