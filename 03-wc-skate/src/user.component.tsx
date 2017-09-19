import { h, Component, define } from 'skatejs'

type Props = {}
class User extends Component<Props> {
  static readonly is = 'sk-user'
  renderCallback() {
    return <div>Hello User</div>
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sk-user': Props
    }
  }
}

export default define(User)
