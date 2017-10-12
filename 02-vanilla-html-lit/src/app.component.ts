import './user.component'
import { render, html } from 'lit-html/lib/lit-extended'

import { CreateLogEvent } from './sfc/create-log-event'
import { Trick, LogItem } from './types'
import { User } from './user.component'

const css = html`
  <style>
   * {
      /* --main-color: #7cb342; */
     }
     .log > li {
       font-size: 1.2rem;
     }
     .log > li.added {
       text-shadow: 1px 1px 1px #9ccc65;
      }
      .log > li.removed {
        text-shadow: 1px 1px 1px #ef6c00;
      }
     .log > li > span {
       padding-right: 1em;
     }
     small {
       color: grey;
       font-size: .7em;
       font-style: italic;
     }
  </style>
`

class App extends HTMLElement {
  static readonly is = 'sk-app'

  private _tricks: Array<Trick> = [{ name: 'Ollie', difficulty: 'easy' }]
  get tricks() {
    return this._tricks
  }
  set tricks(value: Array<Trick>) {
    this._tricks = value
  }

  private _logs: Array<LogItem> = []
  private set logs(value: Array<LogItem>) {
    this._logs = value
    this.render()
  }
  private get logs() {
    return this._logs
  }

  private handleNewTrick = (event: CustomEvent) => {
    const payload = event.detail as Trick
    const newTricks = [...this.tricks, payload]

    this.tricks = newTricks
    this.logTrick(payload)
  }
  private handleRemoveTrick = (event: CustomEvent) => {
    const payload = event.detail as Trick
    const newTricks = this.tricks.filter(trick => trick !== payload)

    this.tricks = newTricks
    this.logTrick(payload, true)
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    console.log('App mounted')
    this.render()
  }

  render() {
    const { tricks, logs } = this

    const template = html`
      ${css}
      <h1>Sk8 tricks learning App <small>vanilla WC</small></h1>
      <div>
        <h4>Log of new tricks learned today:</h4>
        <ul class="log">
          ${logs.map(item => CreateLogEvent(item))}
        </ul>
      </div>
      <hr>
      <sk-user
        name="Martin"
        age="30"
        tricks="${tricks}"
        on-learnTrick="${this.handleNewTrick}"
        on-removeTrick="${this.handleRemoveTrick}"
      ><sk-user>
    `

    render(template, this.shadowRoot!)
  }

  private logTrick(trick: Trick, isRemoved = false) {
    const newLogs = [...this.logs, { trick, isRemoved, time: new Date() }]
    this.logs = newLogs
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sk-app': App
  }
}

export default window.customElements.define(App.is, App)
