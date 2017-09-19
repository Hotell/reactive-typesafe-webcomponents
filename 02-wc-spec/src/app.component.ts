import { trickItemTemplate } from './trick-item.template.js'
import { Trick, User, Events as UserCustomEvents } from './user.component'
import './user.component.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    * {
     // --main-color: #7cb342;
    }
    #newTricksList > li { 
      font-size: 1.2rem;
    }
    #newTricksList > li.added {
      text-shadow: 1px 1px 1px #ef6c00;
    }
    #newTricksList > li.removed {
      text-shadow: 1px 1px 1px #9ccc65;
    }
    small {
      color: grey;
      font-size: .7em;
      font-style: italic;
    }
  </style>
  <h1>Sk8 tricks learning App <small>vanilla WC</small></h1>
  <div>
    <h4>Log of new tricks learned today:</h4>
    <ul id="newTricksList">
    </ul>
  </div>
  <hr>
  <sk-user name="Martin" age="30"><sk-user>
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

  private view: {
    newTricksList: HTMLUListElement
    user: User
  }

  private handleNewTrick = (event: CustomEvent) => {
    const payload = event.detail as Trick
    const newTricks = [...this.tricks, payload]

    this.tricks = newTricks

    this.logTrick(payload)
    this.render()
  }
  private handleRemoveTrick = (event: CustomEvent) => {
    const payload = event.detail as Trick
    const newTricks = this.tricks.filter(trick => trick !== payload)

    this.tricks = newTricks

    this.logTrick(payload, true)
    this.render()
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.view = {
      newTricksList: shadowRoot.querySelector('#newTricksList') as HTMLUListElement,
      user: shadowRoot.querySelector('sk-user') as User,
    }

    this.view.user.addEventListener('learnTrick', this.handleNewTrick)
    this.view.user.addEventListener('removeTrick', this.handleRemoveTrick)
  }

  connectedCallback() {
    console.log('App mounted')
    this.render()
  }

  render() {
    this.view.user.tricks = this.tricks
  }

  private logTrick({ name, difficulty }: Trick, isRemoved = false) {
    const logTime = new Date()
    const dateOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    const listItemTemplate = document.createElement('template')
    const logTypeMessage = isRemoved ? 'forgot' : 'learned'
    const className = isRemoved ? 'added' : 'removed'

    listItemTemplate.innerHTML = `
      <li class="${className}">${logTime.toLocaleDateString('en-US', dateOptions)} - ${logTypeMessage} trick -> 
        <span>name: ${name}</span> 
        <span>difficulty: ${difficulty}</span>
      </li>`

    const liItem = listItemTemplate.content.cloneNode(true)

    this.view.newTricksList.appendChild(liItem)
  }
}

export default window.customElements.define(App.is, App)
