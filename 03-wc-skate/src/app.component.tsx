import { h, Component, define } from 'skatejs'

import User from './user.component'
import './user.component'

type Props = {}
class App extends Component<Props> {
  static readonly is = 'sk-app'
  renderCallback() {
    return (
      <div>
        Hello world
        <div>
          <User.is />
        </div>
      </div>
    )
  }
}

export default define(App)
