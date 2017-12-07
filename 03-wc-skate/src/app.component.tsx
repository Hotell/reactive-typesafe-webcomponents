import { h, PreactHTMLAttributes } from 'preact'
import { define, props } from 'skatejs'
import { Component } from './base'

import User, { UserCustomEvent } from './user.component'
import { Trick } from './types'
import { TrickLog } from './sfc/trick-log'

type Props = {}
type State = {
  tricks: ReadonlyArray<Trick>
}

const initialState: ReadonlyArray<Trick> = [{ name: 'Ollie', difficulty: 'easy' }]

class App extends Component<Props, State> {
  static readonly is = 'sk-app'

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
     .log > li > span {
       padding-right: 1em;
     }
     small {
       color: grey;
       font-size: .7em;
       font-style: italic;
     }`
  }

  state = {
    tricks: initialState,
  }

  private log: Array<{ trick: Trick; isRemoved: boolean; timestamp: number }> = []

  private handleLearnTrick = ({ detail }: UserCustomEvent) => {
    const newTricks = [...this.state.tricks!, detail]
    this.state = { tricks: newTricks }
    this.logTrick(detail, false)
  }
  private handleRemoveTrick = ({ detail }: UserCustomEvent) => {
    const newTricks = this.state.tricks.filter(trick => trick !== detail)
    this.state = { tricks: newTricks }
    this.logTrick(detail, true)
  }

  render() {
    const { tricks } = this.state

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
