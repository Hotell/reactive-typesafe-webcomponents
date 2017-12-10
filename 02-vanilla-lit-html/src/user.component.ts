import { html } from 'lit-html/lib/lit-extended'

import { withComponent } from './mixins/withComponent'
import { Event as EmitterEvent } from './mixins/withEmitter'
import { emit } from './utils/emit'

import { CreateTrickItem } from './sfc/create-trick-item'
import { Trick } from './types'

type Props = {
  name: string
  age: number
  tricks: Array<Trick>
}

type State = {
  trickName: string
  trickDifficulty: string
}
type Events = {
  learnTrick: EmitterEvent<Trick>
  removeTrick: EmitterEvent<Trick>
}

const css = html`
  <style>
  * {
    font-size: 1.5rem;
  }
  :host, sk-user {
    --default-main-color: #1976d2;
    --content-padding: .5rem;

    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: var(--content-padding);
    box-shadow: 0px 4px 20px 0px #9E9E9E;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5em;
    transition: background-color ease-out 250ms;
  }
  ul > li:nth-child(2n){
    background-color: #e1bee7;
  }
  ul > li:hover {
    background-color: #eceff1;
  }
  ul > li > button {
    background-color: #ff5722;
    padding: .5em;
  }
  .form-controll {
    padding: .5rem .75rem;
    font-size: 1rem;
    line-height: 1.25;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  .form-controll:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
  }
  button {
    color: #fff;
    background-color: var(--main-color, var(--default-main-color));
    border: 1px solid var(--main-color, var(--default-main-color));
    padding: .5rem .75rem;
    font-size: 1rem;
    line-height: 1.25;
    border-radius: .25rem;
    transition: all .15s ease-in-out;
  }
  select {
    height: calc(2.25rem + 2px);
    background-color: white;
  }
  header {
    padding: .5em;
    margin: calc(var(--content-padding) * -1);
    margin-bottom: .5em;
    color: white;
    background-color: var(--main-color, var(--default-main-color));
  }
  form {
    padding: .5em
  }
  </style>
`

class Component<P = {}, S = {}, E = {}> extends withComponent() {
  props: P
  state: S
  events: E
}

export class User extends Component<Props, State, Events> {
  static readonly is = 'sk-user'
  static properties = {
    name: {
      type: String,
      reflectToAttribute: true,
      value: 'Unknown',
    },
    age: {
      type: Number,
      reflectToAttribute: true,
      value: 0,
    },
    tricks: {
      type: Array,
      value: [],
    },
  }
  static events = {
    learnTrick: {},
    removeTrick: {},
  }

  state = {
    trickName: '',
    trickDifficulty: '',
  }

  private handleNewTrickAddition = (event: Event) => {
    event.preventDefault()
    const target = event.target as EventTarget & { elements: [HTMLInputElement, HTMLSelectElement] }
    const [input, select] = target.elements

    const { trickDifficulty, trickName } = this.state

    const newTrick: Trick = {
      name: trickName,
      difficulty: trickDifficulty,
    }

    this.events.learnTrick(newTrick)

    this.setState({
      trickDifficulty: '',
      trickName: '',
    })

    input.focus()
  }

  connectedCallback() {
    console.log('User mounted!')
  }

  disconnectedCallback() {
    console.log('User unmounted!')
  }

  render() {
    const { name, age, tricks } = this.props
    const { trickName, trickDifficulty } = this.state

    return html`
      ${css}
      <header>
        Hello <b id="name">${name}</b>! Let's skate!
      </header>
      <div>
        Only <b id="age">${age}</b> years old? Time to learn new tricks!
      </div>
      <form autocomplete="off" on-submit="${this.handleNewTrickAddition}">
        <input
          class="form-controll"
          name="trickName"
          value=${trickName}
          on-input=${this.changeValue}
        />
        <select
          class="form-controll"
          name="trickDifficulty"
          value=${trickDifficulty}
          on-input=${this.changeValue}
        >
          <option value="">--chose difficulty--</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button>Learn Trick</button>
      </form>
      <div>
        <h4>User knows following tricks:</h4>
        <ul>
          ${tricks.map(trick => CreateTrickItem({ trick, onRemove: this.events.removeTrick }))}
        </ul>
      </div>
    `
  }

  private changeValue = (event: Event) => {
    type EventTargets = HTMLInputElement | HTMLSelectElement
    type KnownProps = 'trickName' | 'trickDifficulty'
    const target = event.target as EventTargets
    const name = target.name as KnownProps
    const value = target.value
    this.setState({ [name]: value })
  }
}

declare global {
  type GlobalElementName = typeof User.is
  interface HTMLElementTagNameMap {
    'sk-user': User
  }

  interface HTMLElementEventMap {
    learnTrick: CustomEvent & { detail: Trick }
    removeTrick: CustomEvent & { detail: Trick }
  }
}
export default window.customElements.define(User.is, User)
