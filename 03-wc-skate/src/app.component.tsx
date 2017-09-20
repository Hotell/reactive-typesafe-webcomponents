import { h, Component, define, props } from 'skatejs'
import { PreactHTMLAttributes } from 'preact'

import User, { UserCustomEvent } from './user.component'
import { Trick } from './types'
import { TrickLog } from './sfc/trick-log'

type Props = {
  tricks: Array<Trick>
}

class App extends Component<Props> {
  static readonly is = 'sk-app'

  static readonly props = {
    tricks: { ...props.array, default: [{ name: 'Ollie', difficulty: 'easy' }] },
  }

  get styles() {
    return `
    * {
      // --main-color: #7cb342;
     }
     .log > li { 
       font-size: 1.2rem;
     }
     .log > li.added {
       text-shadow: 1px 1px 1px #ef6c00;
     }
     .log > li.removed {
       text-shadow: 1px 1px 1px #9ccc65;
     }
     small {
       color: grey;
       font-size: .7em;
       font-style: italic;
     }`
  }

  private log: Array<{ trick: Trick; isRemoved: boolean; timestamp: number }> = []

  private handleLearnTrick = ({ detail }: UserCustomEvent) => {
    const newTricks = [...this.props.tricks!, detail]
    // update props
    this.props = { tricks: newTricks }
    this.logTrick(detail, false)
  }
  private handleRemoveTrick = ({ detail }: UserCustomEvent) => {
    const newTricks = this.props.tricks!.filter(trick => trick !== detail)
    // update props
    this.props = { tricks: newTricks }
    this.logTrick(detail, true)
  }

  connectedCallback() {
    super.connectedCallback()
    console.log('connected')
  }
  renderCallback() {
    console.log('render')

    const { tricks } = this.props

    return (
      <div>
        <style>{this.styles}</style>
        <h1>
          Sk8 tricks learning App <small>@skateJS WC</small>
        </h1>
        <div>
          <h4>Log of new tricks learned today:</h4>
          <ul class="log">{this.log.map(logItem => <TrickLog {...logItem} />)}</ul>
        </div>
        <hr />
        <User.is
          name="Martin"
          age={30}
          tricks={tricks!}
          onLearnTrick={this.handleLearnTrick}
          onRemoveTrick={this.handleRemoveTrick}
        />
      </div>
    )
  }

  private logTrick(trick: Trick, isRemoved: boolean) {
    this.log = [...this.log, { trick, isRemoved, timestamp: Date.now() }]
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sk-app': Props & PreactHTMLAttributes
    }
  }
}

export default define(App)
