import withPreact, { PreactRenderedComponent } from '@skatejs/renderer-preact'
import { withComponent } from 'skatejs'

export const Component = withComponent(withPreact())

export class Shadowless<P = object> extends Component<P> {
  get renderRoot() {
    return this
  }
}
